import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function Loader () {
  return (
    <div className="loader-wrap">
      <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
    </div>
  )
}

export default Loader
