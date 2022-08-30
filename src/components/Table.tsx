import React from 'react'

const Table = () => {
  return (
    <div className="card table-container">
      <div className="table-responsive">
        <table className="table table-bordered data-table text-center table-striped text-white">
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Category</th>
              <th className="d-none d-md-table-cell">24h Change</th>
              <th>TVL</th>
              <th className="d-none d-md-table-cell">MCap/TVL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-white">
              <td>X-Name</td>
              <td className="d-none d-md-table-cell">X-Category</td>
              <td className="d-none d-md-table-cell">+2.2%</td>
              <td>$2.2M</td>
              <td className="d-none d-md-table-cell">X</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
