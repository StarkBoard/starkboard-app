import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { calculateTvl } from 'utils/helpers/tvl';
import { RootState } from '../store'
import { TokenPricesState } from './tokens-prices.slice';

export interface TvlUnit {
  eth: number;
  dai: number;
  wbtc: number;
  usdt: number;
  usdc: number;
  stark: number;
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
    // Load Store TVL Evolution instances
    const responses = (await Promise.all(requests)).map(response => response.data.result) as { aggregated_amount: number, token: string, day: Date }[][]
    const formattedResponses = [] as TvlUnit[]
    // Loop them in order to merge them. Instead of using an instance per token per day, we're merging them into a single instance for every tokens per day.
    responses[0].forEach((unit, index) => {
      const tvlUnit = {
        eth: unit.aggregated_amount,
        dai: responses[1][index].aggregated_amount,
        wbtc: responses[2][index]?.aggregated_amount || 0,
        usdt: responses[3][index]?.aggregated_amount || 0,
        usdc: responses[4][index]?.aggregated_amount || 0,
        stark: responses[5][index]?.aggregated_amount || 0,
        day: new Date(unit.day),
        total: 0
      } as TvlUnit
      formattedResponses.push({ ...tvlUnit, total: calculateTvl(tvlUnit, prices) })
    })
    return formattedResponses as TvlUnit[]
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
