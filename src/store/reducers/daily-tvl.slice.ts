import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'

export interface DailyTvl {
  count_deposit: number,
  count_withdraw: number,
  avg_deposit: number,
  amount: number,
  token: string,
  day: Date
}

interface DailyTvlState {
  data: DailyTvl[],
  loading: boolean;
}

const initialState: DailyTvlState = {
  data: [],
  loading: true
}

export const fetchDailyTvl = createAsyncThunk('dailyTvl/fetch', async () => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/getDailyTVLData',
    {
      only_daily: false
    }, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
    })
  return data.result as DailyTvl[]
})

const dailyTvlSlice = createSlice({
  name: 'dailyTvl',
  initialState,
  reducers: {
    fetchDailyTvlSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchDailyTvl.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchDailyTvl.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload]
      })
      .addCase(fetchDailyTvl.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchDailyTvlSuccess } = dailyTvlSlice.actions

export default dailyTvlSlice.reducer

export const getDailyTvl = (state: RootState) => state.dailyTvl
