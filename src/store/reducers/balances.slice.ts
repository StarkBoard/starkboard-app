import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Abi, Contract } from 'starknet'
import { setAll } from 'utils/helpers'
import { tokensAddresses } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { ERC20 } from 'abis'
import getProvider from 'utils/provider'
import { Uint256, uint256ToBN } from 'starknet/dist/utils/uint256'
import { toHex } from 'starknet/dist/utils/number'

interface BalancesState {
  balances: {
    [key: string]: number
  },
  loading: boolean;
}

const initialState: BalancesState = {
  balances: {},
  loading: false
}

interface Parameters {
  addresses: string[],
  network: 'mainnet' | 'testnet'
}

export const fetchBalances = createAsyncThunk('balances/fetch', async ({ addresses, network }: Parameters) => {
  const erc20 = new Contract(ERC20.abi as Abi, tokensAddresses.ETH, getProvider(network))
  const balancesReq = [] as Promise<Uint256[]>[]
  addresses.forEach(address => {
    balancesReq.push(erc20.balanceOf(address))
  })
  const responses = await Promise.all(balancesReq)
  const balances = {} as {
    [key: string]: number
  }
  const balancesRaw = responses.map((response: Uint256[]) => parseInt(toHex(uint256ToBN(response[0])), 16))
  balancesRaw.forEach((balance, index) => {
    balances[addresses[index]] = balance
  })
  return balances
})

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    fetchBalancesSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchBalances.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchBalances.fulfilled, (state, action) => {
        state.loading = false
        state.balances = { ...state.balances, ...action.payload }
      })
      .addCase(fetchBalances.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchBalancesSuccess } = balancesSlice.actions

export default balancesSlice.reducer

export const getBalances = (state: RootState) => state.balances
