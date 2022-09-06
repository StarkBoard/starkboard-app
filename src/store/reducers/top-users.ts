import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Abi, CallContractResponse, Contract } from 'starknet'
import { setAll } from 'utils/helpers'
import { tokensAddresses } from 'utils/helpers/tokens'
import { RootState } from '../store'
import { ERC20 } from 'abis'
import getProvider from 'utils/provider'
import { Uint256, uint256ToBN } from 'starknet/dist/utils/uint256'
import { toHex } from 'starknet/dist/utils/number'

interface User {
  balance: number;
  nonce: number;
}

interface TopUsersState {
  users: [string, User][],
  loading: boolean;
}

const initialState: TopUsersState = {
  users: [],
  loading: false
}

interface Parameters {
  addresses: string[],
  network: 'mainnet' | 'testnet'
}
const compare = (a: [string, User], b: [string, User]) => a[1].balance > b[1].balance ? -1 : a[1].balance < b[1].balance ? 1 : 0

export const fetchTopUsers = createAsyncThunk('topUsers/fetch', async ({ addresses, network }: Parameters) => {
  const erc20 = new Contract(ERC20.abi as Abi, tokensAddresses.ETH, getProvider(network))
  const balancesReq = [] as Promise<Uint256[]>[]
  const noncesReq = [] as Promise<CallContractResponse>[]
  addresses.forEach(address => {
    balancesReq.push(erc20.balanceOf(address))
    noncesReq.push(getProvider(network).callContract(({ contractAddress: address, entrypoint: 'get_nonce' })))
  })
  const balancesResponses = await Promise.all(balancesReq)
  const noncesResponses = await Promise.all(noncesReq)
  const users = {} as {
    [key: string]: {
      balance: number;
      nonce: number;
    }
  }
  const balancesRaw = balancesResponses.map((response: Uint256[]) => parseInt(toHex(uint256ToBN(response[0])), 16))
  const noncesRaw = noncesResponses.map((response: CallContractResponse) => parseInt(response.result[0], 16))
  balancesRaw.forEach((balance, index) => {
    users[addresses[index]] = { balance, nonce: noncesRaw[index] }
  })

  const allUsers = [] as [string, User][]
  for (const user in users) {
    allUsers.push([user, users[user]])
  }

  return allUsers.sort((a, b) => compare(a as [string, User], b as [string, User])).slice(0, 50)
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
