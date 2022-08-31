import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'

interface Transfers {
  top_wallet: string,
  max_transfer: number,
  count_transfer: number,
  avg_transfer: number,
  amount: number,
  token: string,
  day: Date
}

interface TransfersState {
  data: Transfers[],
  loading: boolean;
}

const initialState: TransfersState = {
  data: [],
  loading: true
}

export const fetchTranfers = createAsyncThunk('transfers/fetch', async (network: 'mainnet' | 'testnet') => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/getDailyTransferData',
    {
      only_daily: false,
      network
    }, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
    })
  return data.result as Transfers[]
})

const transfersSlice = createSlice({
  name: 'transfers',
  initialState,
  reducers: {
    fetchTransfersSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTranfers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTranfers.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload]
      })
      .addCase(fetchTranfers.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchTransfersSuccess } = transfersSlice.actions

export default transfersSlice.reducer

export const getTranfers = (state: RootState) => state.transfers
