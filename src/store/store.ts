import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import dailyTvlSlice from './reducers/daily-tvl.slice'
import dailyDataSlice from './reducers/daily-data.slice'
import transfersSlice from './reducers/transfers.slice'
import tvlEvolutionSlice from './reducers/tvl-evolution.slice'
import tokensPricesSlice from './reducers/tokens-prices.slice'
import metricsSlice from './reducers/metrics.slice'
import volumeSlice from './reducers/volume.slice'
import topUsersSlice from './reducers/top-users.slice'
import ecosystemSlice from './reducers/ecosystem.slice'

export interface AppState {
  dailyTvl: typeof dailyTvlSlice;
  transfers: typeof transfersSlice;
  dailyData: typeof dailyDataSlice;
  tvlEvolution: typeof tvlEvolutionSlice;
  tokensPrices: typeof tokensPricesSlice;
  metrics: typeof metricsSlice;
  volume: typeof volumeSlice;
  topUsers: typeof topUsersSlice;
  ecosystem: typeof ecosystemSlice;
}

const store = configureStore({
  reducer: {
    dailyTvl: dailyTvlSlice,
    transfers: transfersSlice,
    dailyData: dailyDataSlice,
    tvlEvolution: tvlEvolutionSlice,
    tokensPrices: tokensPricesSlice,
    metrics: metricsSlice,
    volume: volumeSlice,
    topUsers: topUsersSlice,
    ecosystem: ecosystemSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const wrapper = store
