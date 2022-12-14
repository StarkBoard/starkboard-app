import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'

interface DailyData {
  mean_fees: number,
  total_fees: number,
  count_new_contracts: number,
  count_new_wallets: number,
  count_wallets_active: number,
  top_wallets_active: string[],
  count_transfers: number,
  count_txs: number,
  day: Date
}

interface DailyDataState {
  data: DailyData[],
  loading: boolean;
}

const initialState: DailyDataState = {
  data: [],
  loading: true
}

export const fetchDailyData = createAsyncThunk('dailyData/fetch', async (network: 'mainnet' | 'testnet') => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/getDailyData',
    {
      only_daily: false,
      network
    }, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
    })
  const formattedData = (data.result as DailyData[]).map(unit => ({
    ...unit,
    day: new Date(unit.day),
    top_wallets_active: JSON.parse(unit.top_wallets_active as unknown as string)
  }))
  return formattedData.reverse()
})

const dailyDataSlice = createSlice({
  name: 'dailyData',
  initialState,
  reducers: {
    fetchDailyDataSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchDailyData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDailyData.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchDailyData.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchDailyDataSuccess } = dailyDataSlice.actions

export default dailyDataSlice.reducer

export const getDailyData = (state: RootState) => state.dailyData
