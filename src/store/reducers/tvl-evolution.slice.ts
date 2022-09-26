import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { calculateTokensTotalValue, tokens } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { TokenPricesState } from './tokens-prices.slice'

export interface TvlBase {
  eth: number;
  dai: number;
  wbtc: number;
  usdt: number;
  usdc: number;
  strk: number;
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

interface Parameters {
  prices: TokenPricesState;
  network: 'mainnet' | 'testnet';
}
export const fetchTvlEvolution = createAsyncThunk(
  'tvlEvolution/fetch',
  async ({ prices, network }: Parameters) => {
    const requests = [] as Promise<AxiosResponse>[]
    tokens.forEach(token => {
      requests.push(axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + '/getTokenTVLEvolution',
        {
          token,
          network
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

    for (const key of values.keys()) {
      const tvlUnit = values.get(key) as TvlBase
      formattedResponses.push({ ...tvlUnit, total: 0, day: new Date(key) })
    }

    // Sort them by increasing timestamp + remove low values in order to have a clean chart
    const filteredData = formattedResponses.sort((a, b) => a.day.getTime() - b.day.getTime())

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
      filteredData[index].total = calculateTokensTotalValue(filteredData[index], prices)
    }

    const data = []

    // Add previous day's data for missing days
    for (let x = 0; x < filteredData.length; x++) {
      const currentDate = filteredData[x].day
      data.push(filteredData[x])
      if (x === filteredData.length - 1) break

      // Day missing
      if (filteredData[x + 1].day.getDate() !== currentDate.getDate() + 1) {
        data.push({
          ...filteredData[x],
          day: new Date(new Date(currentDate).setDate(currentDate.getDate() + 1))
        })
      }
    }
    return data.filter(value => value.total > 300000) as TvlUnit[]
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
