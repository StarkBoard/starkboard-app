/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { formatValue } from 'utils/helpers/format'

interface User {
  balance: number;
  nonce: number;
}

const NetworthTable = () => {
  const users = useSelector<RootState, [string, User][]>(state => state.topUsers.users)

  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center table-striped text-white">
          <thead>
            <tr>
              <th></th>
              <th>Address</th>
              <th className="d-none d-md-table-cell">Net Worth</th>
              <th className="d-none d-md-table-cell">Nonce</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr className="text-white" key={user[0]}>
                  <td className="d-flex flex-row align-items-center justify-content-between">
                    <div className="d-flex flex-row">
                      <div className="mx-3">{index + 1}</div>
                      <a href={`https://voyager.online/contract/${user[0]}`} target="_blank" rel="noreferrer" style={{ marginTop: '0px' }}>
                        <img src="/images/voyager.png" height={20} width={20} alt="Voyager Logo" />
                      </a>
                    </div>
                    <div></div>
                  </td>
                  <td style={{ fontWeight: '400' }}>{user[0]}</td>
                  <td style={{ fontWeight: '400' }}>{formatValue(user[1].balance as number / 1e18)} ETH</td>
                  <td style={{ fontWeight: '400' }}>{formatValue(user[1].nonce as number)}</td>
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
