import { faChevronDown, faGear, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import Navigation from 'components/Navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
  mode: 'light' | 'dark',
  switchMode: () => void,
  network?: 'mainnet' | 'testnet'
  switchNetwork: () => void,
}
const Header: React.FC<Props> = ({ network, switchNetwork }: Props) => {
  const [showNavBar, toggleNavBar] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    if (showNavBar) {
      toggleNavBar(false)
    }
  }, [pathname])
  return (
    <header id="header">
      <div className='text-center text-white bg-grad-blue-light-l-r py-2'>Starkboard V2 is live! Enjoy our new features and give us some feedback!</div>

      <div className='py-3 bg-grad-blue-dark-t-b'>
        <div className="container">
          <nav className="d-flex flex-row justify-content-between align-items-center">
            <div className="d-block d-md-flex flex-row  justify-content-start align-items-center">
              <img src={'images/logo-dark-no-margin.png'} className="w-100" style={{ height: '22px' }} alt='Logo' role="button" />
              <h1 className="text-white h3 text-uppercase mb-0 d-none d-md-inline-block fw-semibold ms-3" id="logo-title">Starkboard</h1>
            </div>

            <div className="space-x-14 d-flex flex-row mb-0 align-items-center">
              <form id='header-search-form' className='border rounded' onSubmit={(e) => e.preventDefault()}>
                <input type="text" className='bg-transparent border-0' placeholder="Search" />
                <FontAwesomeIcon className='ms-2' icon={faSearch} />
              </form>
              <Button className='purple-gradient-bg'>Connect Wallet</Button>
              <Button className="purple-gradient-bg">$USD <FontAwesomeIcon icon={faChevronDown} /></Button>
              <Button className="purple-gradient-bg"><FontAwesomeIcon icon={faGear} /></Button>
            </div>
          </nav>
          <div className={`d-${showNavBar ? 'block' : 'none'} d-lg-none mb-0`} style={{ marginTop: '-20px' }}>
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
