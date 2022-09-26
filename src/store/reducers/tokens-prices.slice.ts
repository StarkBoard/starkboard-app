import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'

export interface TokenPricesState {
  eth: number;
  dai: number;
  wbtc: number;
  usdt: number;
  usdc: number;
  strk: number;
  loading: boolean;
}

const initialState: TokenPricesState = {
  eth: 0,
  dai: 0,
  wbtc: 0,
  usdt: 0,
  usdc: 0,
  strk: 0,
  loading: true
}

export const fetchTokensPrices = createAsyncThunk(
  'tokensPrices/fetch',
  async () => {
    const tokens = ['ethereum', 'dai', 'wrapped-bitcoin', 'tether', 'usd-coin', 'starknet']
    const request = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${tokens.join(',')}`)
    const prices = new Map<string, number>()
    request.data.forEach((token: { current_price: number, id: string }) => {
      prices.set(token.id, token.current_price)
    })
    return { eth: prices.get('ethereum'), dai: prices.get('dai'), wbtc: prices.get('wrapped-bitcoin'), usdt: prices.get('tether'), usdc: prices.get('usd-coin'), strk: prices.get('starknet') }
  }
)

const tokensPricesSlice = createSlice({
  name: 'tokensPrices',
  initialState,
  reducers: {
    fetchTokensPricesSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTokensPrices.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTokensPrices.fulfilled, (state, action) => {
        state.loading = false
        setAll(state, action.payload)
      })
      .addCase(fetchTokensPrices.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchTokensPricesSuccess } = tokensPricesSlice.actions

export default tokensPricesSlice.reducer

export const getTokensPrices = (state: RootState) => state.tokensPrices
