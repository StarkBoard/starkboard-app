/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSelector } from 'react-redux'
import { User } from 'store/reducers/top-users.slice'
import { RootState } from 'store/store'
import { formatValue } from 'utils/helpers/format'

const NetworthTable = () => {
  const users = useSelector<RootState, User[]>(state => state.topUsers.users)

  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center table-striped text-white">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th className="d-none d-lg-table-cell">Net Worth</th>
              <th className="d-none d-lg-table-cell">Monthly Transactions</th>
              <th className="d-none d-lg-table-cell">Total Transactions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr className="text-white" key={user.wallet_address}>
                  <td className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                      <div className="mx-3">{index + 1}</div>
                      <a href={`https://voyager.online/contract/${user.wallet_address}`} target="_blank" rel="noreferrer" style={{ marginTop: '0px' }}>
                        <img src="/images/voyager.png" height={20} width={20} alt="Voyager Logo" />
                      </a>
                    </div>
                    <div></div>
                  </td>
                  <td style={{ fontWeight: '400' }}>{user.wallet_address.slice(0, 10)}...{user.wallet_address.slice(-10)}</td>
                  <td style={{ fontWeight: '400' }}>{formatValue(user.eth as number)} ETH</td>
                  <td style={{ fontWeight: '400' }}>{user.monthly_txs}</td>
                  <td style={{ fontWeight: '400' }}>{formatValue(user.count_txs, 5)}</td>
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
