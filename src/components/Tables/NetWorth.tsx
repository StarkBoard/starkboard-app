import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatCurrency } from 'utils/helpers/format'

const NetworthTable = () => {
  const balances = useSelector<RootState, { [key: string]: number }>(state => state.balances.balances)

  const compare = (a: number[], b: number[]) => a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0

  const sortedBalances = useMemo(() => {
    const allBalances = []
    for (const variable in balances) {
      allBalances.push([variable, balances[variable]])
    }
    return allBalances.sort((a, b) => compare(a as number[], b as number[]))
  }, [balances])

  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center table-striped text-white">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th className="d-none d-md-table-cell">Net Worth</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedBalances.map((balance, index) => (
                <tr className="text-white" key={balance[0]}>
                  <td className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                      <div className="mx-3">{index + 1}</div>
                    </div>
                    <div></div>
                  </td>
                  <td style={{ fontWeight: '400' }}>{ balance[0] }</td>
                  <td style={{ fontWeight: '400' }}>{ formatCurrency(balance[1] as number / 1e18) }</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NetworthTable
