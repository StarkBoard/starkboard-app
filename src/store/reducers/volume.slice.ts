import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { calculateTokensTotalValue } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { TokenPricesState } from './tokens-prices.slice'
import { TvlUnit } from './tvl-evolution.slice'

export interface VolumeUnit {
  eth: number;
  dai: number;
  wbtc: number;
  usdt: number;
  usdc: number;
  dailyVolume: number;
  stark: number;
  total: number;
  day: Date;
}

interface VolumeEvolutionState {
  data: VolumeUnit[];
  loading: boolean;
}

const initialState: VolumeEvolutionState = {
  data: [],
  loading: true
}

export const fetchVolumeEvolution = createAsyncThunk(
  'volumeEvolution/fetch',
  async (prices: TokenPricesState) => {
    const tokens = ['ETH', 'DAI', 'WBTC', 'USDT', 'USDC', 'STARK']
    const requests = [] as Promise<AxiosResponse>[]
    tokens.forEach(token => {
      requests.push(axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + '/getCummulativeTransferVolumeEvolution',
        {
          token
        },
        {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
        }
      ))
    })
    // Load Store Volume Evolution instances
    const responses = (await Promise.all(requests)).map(response => response.data.result) as { aggregated_amount: number, token: string, day: Date }[][]
    const formattedResponses = [] as VolumeUnit[]

    const values = new Map<number, TvlUnit>()

    // Loop them in order to merge them. Instead of using an instance per token per day, we're merging them into a single instance for every tokens per day.
    responses.forEach((response, index) => {
      response.forEach(response => {
        const timeStamp = new Date(response.day).getTime()
        values.set(timeStamp, { ...values.get(timeStamp), [tokens[index].toLowerCase()]: response.aggregated_amount } as TvlUnit)
      })
    })

    // Add the `total` field
    for (const key of values.keys()) {
      const volumeUnit = values.get(key) as VolumeUnit
      const total = calculateTokensTotalValue(volumeUnit, prices)
      const dailyVolume = formattedResponses.length === 0 ? total : total - formattedResponses[formattedResponses.length - 1].total
      formattedResponses.push({ ...volumeUnit, total, dailyVolume, day: new Date(key) })
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

    return filteredData as VolumeUnit[]
  }
)

const volumeEvolutionSlice = createSlice({
  name: 'volumeEvolution',
  initialState,
  reducers: {
    fetchVolumeEvolutionSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchVolumeEvolution.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchVolumeEvolution.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload]
      })
      .addCase(fetchVolumeEvolution.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchVolumeEvolutionSuccess } = volumeEvolutionSlice.actions

export default volumeEvolutionSlice.reducer

export const getVolumeEvolution = (state: RootState) => state.volume
