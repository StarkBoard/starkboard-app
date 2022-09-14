/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRightArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navigation from 'components/Navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface Props {
  mode: 'light' | 'dark',
  switchMode: () => void,
  network?: 'mainnet' | 'testnet'
  switchNetwork: () => void,
}
const Header: React.FC<Props> = ({ mode, network, switchNetwork }: Props) => {
  const [showNavBar, toggleNavBar] = useState(false)
  const { pathname } = useRouter()

  useEffect(() => {
    if (showNavBar) {
      toggleNavBar(false)
    }
  }, [pathname])
  return (
    <header id="header">
      <div className="container">
        <nav className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-block d-md-flex flex-row  justify-content-start align-items-center">
            <img src={`images/logo-${mode}.png`} id="logo" className="logo p-md-4" />
            <h1 className="text-white h3 text-uppercase mb-0 d-none d-md-inline-block" id="logo-title">Starkboard</h1>
          </div>
          <ul className="icones d-flex flex-row mb-0 align-items-center">
            <li className="d-none d-lg-flex">
              <a href="https://medium.com/@starkboard/5a1e37fb31df" target="_blank" rel="noreferrer" className="text-white">
                <FontAwesomeIcon icon={faMedium} />
              </a>
            </li>
            <li className="d-none d-lg-flex">
              <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer" className="text-white">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="d-none d-lg-flex">
              <a href="https://discord.gg/8KJKrpDUMZ" target="_blank" rel="noreferrer" className="text-white">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
            </li>
            {/*             <li id="darkmode" onClick={switchMode}>
              <FontAwesomeIcon icon={faCircleHalfStroke} />
            </li> */}
            <li>
              <div className="d-flex flex-row">
                {network && (
                  <p id="chain-name" onClick={switchNetwork}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="d-none d-lg-inline-block" />
                    {network.charAt(0).toUpperCase() + network.slice(1).toLowerCase()}
                  </p>
                )}
              </div>
            </li>
            <li onClick={() => toggleNavBar(!showNavBar)} className="d-lg-none text-white">
              <FontAwesomeIcon icon={faBars} />
            </li>
          </ul>
        </nav>
        <div className={`d-${showNavBar ? 'block' : 'none'} d-lg-none mb-0`} style={{ marginTop: '-20px' }}>
          <Navigation />
        </div>
      </div>
    </header>
  )
}

export default Header
