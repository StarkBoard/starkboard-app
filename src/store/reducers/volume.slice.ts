import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { calculateTokensTotalValue } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { TokenPricesState } from './tokens-prices.slice'

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
    // Loop them in order to merge them. Instead of using an instance per token per day, we're merging them into a single instance for every tokens per day.
    responses[0].forEach((unit, index) => {
      const volumeUnit = {
        eth: unit.aggregated_amount,
        dai: responses[1][index].aggregated_amount,
        wbtc: responses[2][index]?.aggregated_amount || 0,
        usdt: responses[3][index]?.aggregated_amount || 0,
        usdc: responses[4][index]?.aggregated_amount || 0,
        stark: responses[5][index]?.aggregated_amount || 0,
        day: new Date(unit.day),
        total: 0
      } as VolumeUnit
      const total = calculateTokensTotalValue(volumeUnit, prices)
      const dailyVolume = formattedResponses.length === 0 ? total : total - formattedResponses[formattedResponses.length - 1].total
      formattedResponses.push({ ...volumeUnit, total, dailyVolume })
    })
    return formattedResponses as VolumeUnit[]
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
