/* eslint-disable @next/next/no-img-element */
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Ecosystem = () => {
  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Ecosystem</h2>
      <div className="row justify-content-between">
        <div className="col-12 col-md-4 px-3">
          <div className="black-gradient rounded ecosystem-card">
            <div className="ecosystem-header">
              <img alt="Project Banner" src="/images/ecosystem/banner.png" className='ecosystem-image' />
              <img src="/images/logo-dark.png" alt="Project Logo" className='ecosystem-logo'/>
              <div className="flex flex-row justify-content-center">
                <h3 className="text-white text-center mt-5">Starkboard</h3>
              </div>
            </div>
            <div className="row mx-2 mt-4">
              <div className="col-6">
                <p className="ecosystem-data-title">Followers</p>
                <p className="ecosystem-data-value">2.6K</p>
                <p className="ecosystem-data-change">+2.4%</p>
              </div>
              <div className="col-6">
                <p className="ecosystem-data-title">On Chain Users</p>
                <p className="ecosystem-data-value">12.3K</p>
                <p className="ecosystem-data-change">+2.3%</p>
              </div>
            </div>
            <div className="row mx-2 mt-3">
              <div className="col">
                <p className="ecosystem-data-title">Tags</p>
              </div>
            </div>
            <div className="row mx-2 mt-2">
              <div className="col ecosystem-pills">
                <span className="amm-pill">AMM</span>
                <span className="kyc-pill">KYC</span>
              </div>
            </div>
            <div className="row mx-2 mt-3">
              <div className="col-8">
                <div className="ecosystem-splitter" />
              </div>
            </div>
            <div className="row mx-2 mt-3 mb-3">
              <div className="col flex flex-row ecosystem-icons">
                <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
                <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGlobe} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ecosystem
