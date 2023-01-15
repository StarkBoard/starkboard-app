import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Selector } from 'components/Selector/Selector'
import { sum } from 'lodash'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenPricesState } from 'store/reducers/tokens-prices.slice'
import { TvlUnit } from 'store/reducers/tvl-evolution.slice'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'
import { getTokensValue } from 'utils/helpers/tokens'

interface Token {
  name: string
  amount: number
  change: number
  currentTvl: number
  previousTvl: number
  tvlPercentage: number
}

const tokensTypes = new Map<string, string>()
tokensTypes.set('eth', 'Layer 1')
tokensTypes.set('dai', 'Stablecoin')
tokensTypes.set('wbtc', '1:1 Backed ERC20')
tokensTypes.set('usdc', 'Stablecoin')
tokensTypes.set('usdt', 'Stablecoin')
tokensTypes.set('strk', 'Layer 2')

enum AppType {
  ALL = 'ALL',
  DAPP = 'DAPP',
  LAYER2 = 'LAYER2'
}

enum Period {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  TRIMESTER = 'TRIMESTER',
  SEMESTER = 'SEMESTER',
  YEARLY = 'YEARLY'
}

const appTypeMappingToName: Record<AppType, string> = {
  [AppType.ALL]: 'All',
  [AppType.DAPP]: 'Dapps',
  [AppType.LAYER2]: 'Layer 2'
}

const periodMappingToDay: Record<Period, string> = {
  [Period.WEEKLY]: '7D',
  [Period.MONTHLY]: '30D',
  [Period.TRIMESTER]: '90D',
  [Period.SEMESTER]: '180D',
  [Period.YEARLY]: '365D'
}

const appTypeOptions = Object.keys(AppType).map(key => ({
  value: appTypeMappingToName[key as AppType],
  originalValue: key as AppType
}))

const periodOptions = Object.keys(Period).map(key => ({
  value: periodMappingToDay[key as Period],
  originalValue: key as Period
}))

const TvlTable = () => {
  const tvlUnits = useSelector<RootState, TvlUnit[]>(state => state.tvlEvolution.data)
  const prices = useSelector<RootState, TokenPricesState>(state => state.tokensPrices)
  const [orderedTokens, setOrderedTokens] = useState<Token[]>([])
  const totalTVL = useMemo(() => {
    return sum(tvlUnits.map(tvlUnit => tvlUnit.total))
  }, [tvlUnits])
  const [appType, setAppType] = useState<string>(AppType.ALL)
  const [period, setPeriod] = useState<string>(Period.SEMESTER)

  useEffect(() => {
    if (tvlUnits.length > 2) {
      const currentTokensTvl = getTokensValue(tvlUnits[tvlUnits.length - 1], prices)
      const previousTokensTvl = getTokensValue(tvlUnits[tvlUnits.length - 2], prices)
      const orderedTokens = []
      for (const [token, currentTvl] of Object.entries(currentTokensTvl)) {
        const previousTvl = previousTokensTvl[token as 'eth']
        orderedTokens.push({
          currentTvl,
          previousTvl,
          name: token,
          amount: tvlUnits[tvlUnits.length - 1][token as 'eth'],
          change: ((currentTvl - previousTvl) / previousTvl) * 100,
          tvlPercentage: ((currentTvl / totalTVL) * 100) * 100
        })
      }
      setOrderedTokens(orderedTokens.sort((a, b) => (b.currentTvl - a.currentTvl)))
    }
  }, [tvlUnits, prices])

  const handleAppTypeChange = (option: string) => {
    setAppType(option)
  }

  const handlePeriodChange = (option: string) => {
    setPeriod(option)
  }

  return (
    <div className="card table-container data-table py-4">
      <div className="flex flex-row justify-between px-4">
        <Selector currentOption={appType} options={appTypeOptions} onChange={handleAppTypeChange} />
        <Selector currentOption={period} options={periodOptions} onChange={handlePeriodChange} icon={<FontAwesomeIcon icon={faCalendarDays} style={{ width: '16.5px', height: '19px' }} className="text-white"/>} />
      </div>
      <div className="table-responsive mt-2">
        <table className="table  text-center tvl-table text-white">
          <thead>
            <tr className="text-uppercase">
              <th className="d-flex justify-start ml-5">Assets</th>
              <th className="d-none d-lg-table-cell">Percentage</th>
              <th className="d-none d-lg-table-cell">24h Change</th>
              <th className="d-flex">TVL</th>
            </tr>
          </thead>
          <tbody>
            {
              orderedTokens.map((token, index) => (
                <tr className="text-white" key={token.name}>
                  <td className="d-flex flex-row align-items-center justify-content-between ml-5">
                    <div className="d-flex flex-row">
                      <div className="mx-3">{index + 1}</div>
                      <div className="d-flex flex-row">
                        <Image src={`/images/tokens/${token.name}.png`} height={20} width={20} alt={`${token.name} Logo`} className="d-flex " />
                        <span className="ml-4">
                        {token.name.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div></div>
                  </td>
                  <td className="d-none d-lg-table-cell">{`${token.tvlPercentage.toFixed(0)} %`}</td>
                  <td className="d-none d-lg-table-cell">
                    <span style={{ color: isNaN(token.change) || token.change === 0 ? 'white' : token.change > 0 ? '#03D9A5' : '#DE365E' }}>
                      {isNaN(token.change) ? '0' : token.change.toFixed(1)}%
                    </span>
                  </td>
                  <td className="d-flex">{formatCurrency(token.currentTvl, 0)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TvlTable
