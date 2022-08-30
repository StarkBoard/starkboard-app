import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import dailyTvlSlice from './reducers/daily-tvl.slice'
import dailyDataSlice from './reducers/daily-data.slice'
import transfersSlice from './reducers/transfers.slice';
import tvlEvolutionSlice from './reducers/tvl-evolution.slice';

export interface AppState {
  dailyTvl: typeof dailyTvlSlice;
}

const store = configureStore({
  reducer: {
    dailyTvl: dailyTvlSlice,
    transfers: transfersSlice,
    dailyData: dailyDataSlice,
    tvlEvolution: tvlEvolutionSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const wrapper = store
