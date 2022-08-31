import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'

export interface MetricsUnit {
  wallets: number;
  day: Date;
}

interface MetricsState {
  data: MetricsUnit[];
  loading: boolean;
}

const initialState: MetricsState = {
  data: [],
  loading: true
}

export const fetchMetrics = createAsyncThunk(
  'metrics/fetch',
  async () => {
    const fields = ['count_new_wallets']
    const requests = [] as Promise<AxiosResponse>[]
    fields.forEach(field => {
      requests.push(axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API + '/getCumulativeMetricEvolution',
        {
          field
        },
        {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
        }
      ))
    })
    const responses = (await Promise.all(requests)).map(response => response.data.result) as { aggregated_amount: string, day: Date }[][]
    const formattedResponses = [] as MetricsUnit[]
    responses[0].forEach((response) => {
      formattedResponses.push({
        wallets: parseInt(response.aggregated_amount),
        day: new Date(response.day)
      })
    })
    return formattedResponses as MetricsUnit[]
  }
)

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    fetchMetricsSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, ...action.payload]
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchMetricsSuccess } = metricsSlice.actions

export default metricsSlice.reducer

export const getMetrics = (state: RootState) => state.metrics
