import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'
import axios from 'axios'

export interface User {
  count_txs: number;
  eth: number;
  wallet_address: number;
  weekly_tx: number
}

interface TopUsersState {
  users: User[],
  loading: boolean;
}

const initialState: TopUsersState = {
  users: [],
  loading: false
}

export const fetchTopUsers = createAsyncThunk('topUsers/fetch', async (network: 'mainnet' | 'testnet') => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/getWalletRanking',
    {
      only_daily: false,
      network
    }, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
    })

  return data.result as User[]
})

const topUsersSlice = createSlice({
  name: 'topUsers',
  initialState,
  reducers: {
    fetchTopUsersSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTopUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTopUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchTopUsers.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchTopUsersSuccess } = topUsersSlice.actions

export default topUsersSlice.reducer

export const getTopUsers = (state: RootState) => state.topUsers
