import Loader from 'components/Loader'
import Sidebar from 'components/Sidebar'
import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchDailyData } from 'store/reducers/daily-data.slice'
import { fetchDailyTvl } from 'store/reducers/daily-tvl.slice'
import { fetchTranfers } from 'store/reducers/transfers.slice'
import { fetchTvlEvolution } from 'store/reducers/tvl-evolution.slice'
import { RootState, useAppDispatch } from 'store/store'
import Footer from './Footer'
import Header from './Header'

interface Props {
  children: ReactElement;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const dispatch = useAppDispatch()
  const loadingDailyTvl = useSelector<RootState, boolean>(state => state.dailyTvl.loading)
  const loadingDailyData = useSelector<RootState, boolean>(state => state.dailyData.loading)
  const loadingTransfersData = useSelector<RootState, boolean>(state => state.transfers.loading)

  const isAppLoading = loadingDailyTvl || loadingDailyData || loadingTransfersData

  useEffect(() => {
    dispatch(fetchDailyTvl())
    dispatch(fetchDailyData())
    dispatch(fetchTvlEvolution())
    dispatch(fetchTranfers())
  }, [])

  return (
    <div>
      <Header mode={mode} switchMode={() => setMode(mode === 'dark' ? 'light' : 'dark')} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2 mt-4">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 mx-2 mx-md-5">
            {isAppLoading ? (<Loader />) : children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
