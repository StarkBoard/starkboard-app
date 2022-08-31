import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { calculateTokensTotalValue } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { TokenPricesState } from './tokens-prices.slice'

export interface TvlBase {
  eth: number;
  dai: number;
  wbtc: number;
  usdt: number;
  usdc: number;
  stark: number;
}
export interface TvlUnit extends TvlBase {
  total: number;
  day: Date;
}

interface TvlEvolutionState {
  data: TvlUnit[];
  loading: boolean;
}

const initialState: TvlEvolutionState = {
  data: [],
  loading: true
}

export const fetchTvlEvolution = createAsyncThunk(
  'tvlEvolution/fetch',
  async (prices: TokenPricesState) => {
    const tokens = ['ETH', 'DAI', 'WBTC', 'USDT', 'USDC', 'STARK']
    const requests = [] as Promise<AxiosResponse>[]
    tokens.forEach(token => {
      requests.push(axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + '/getTokenTVLEvolution',
        {
          token
        },
        {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
        }
      ))
    })
    // Load and Store TVL Evolution instances
    const responses = (await Promise.all(requests)).map(response => response.data.result) as { aggregated_amount: number, token: string, day: Date }[][]
    const formattedResponses = [] as TvlUnit[]

    const values = new Map<number, TvlBase>()

    // Loop them in order to merge them. Instead of using an instance per token per day, we're merging them into a single instance for every tokens per day.
    responses.forEach((response, index) => {
      response.forEach(response => {
        const timeStamp = new Date(response.day).getTime()
        values.set(timeStamp, { ...values.get(timeStamp), [tokens[index].toLowerCase()]: response.aggregated_amount } as TvlBase)
      })
    })

    // Add the `total` field
    for (const key of values.keys()) {
      const tvlUnit = values.get(key) as TvlBase
      const total = calculateTokensTotalValue(tvlUnit, prices)
      formattedResponses.push({ ...tvlUnit, total, day: new Date(key) })
    }
    // Sort them by increasing timestamp + remove low values in order to have a clean chart
    const filteredData = formattedResponses.sort((a, b) => a.day.getTime() - b.day.getTime()).filter(value => value.total > 300000)

    // Map containing the token's last TVL
    const lastValues = new Map<string, number>()
    for (let index = 0; index < filteredData.length; index++) {
      const data = filteredData[index]
      for (const token of tokens) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempData = (data as any)[token.toLowerCase()] as number

        if (!tempData) {
          // The current day data does not include the current token, so add it using the last saved value or 0 if there is no saved values.

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (filteredData[index] as any)[token.toLowerCase()] = lastValues.get(token.toLowerCase()) || 0
        } else {
          lastValues.set(token.toLowerCase(), tempData)
        }
      }
    }
    return filteredData as TvlUnit[]
  }
)

const tvlEvolutionSlice = createSlice({
  name: 'tvlEvolution',
  initialState,
  reducers: {
    fetchTvlEvolutionSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTvlEvolution.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTvlEvolution.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload]
      })
      .addCase(fetchTvlEvolution.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchTvlEvolutionSuccess } = tvlEvolutionSlice.actions

export default tvlEvolutionSlice.reducer

export const getTvlEvolution = (state: RootState) => state.tvlEvolution
