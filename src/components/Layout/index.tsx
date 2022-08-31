import Sidebar from 'components/Sidebar'
import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchDailyData } from 'store/reducers/daily-data.slice'
import { fetchDailyTvl } from 'store/reducers/daily-tvl.slice'
import { fetchMetrics } from 'store/reducers/metrics.slice'
import { fetchTokensPrices, TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { fetchTranfers } from 'store/reducers/transfers.slice'
import { fetchTvlEvolution } from 'store/reducers/tvl-evolution.slice'
import { fetchVolumeEvolution } from 'store/reducers/volume.slice'
import { RootState, useAppDispatch } from 'store/store'
import Footer from './Footer'
import Header from './Header'

interface Props {
  children: ReactElement;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const dispatch = useAppDispatch()
  const tokensPrices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)

  useEffect(() => {
    if (!tokensPrices.loading) {
      dispatch(fetchTvlEvolution(tokensPrices))
      dispatch(fetchVolumeEvolution(tokensPrices))
    }
  }, [tokensPrices])

  useEffect(() => {
    dispatch(fetchTokensPrices())
    dispatch(fetchMetrics())
    dispatch(fetchDailyTvl())
    dispatch(fetchDailyData())
    dispatch(fetchTranfers())
  }, [])

  return (
    <div className="body">
      <Header mode={mode} switchMode={() => setMode(mode === 'dark' ? 'light' : 'dark')} />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2 mt-4">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 mx-2 mx-md-5">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
