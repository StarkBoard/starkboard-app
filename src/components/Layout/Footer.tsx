import { faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>STARKBOARD</h4>
            <p className="text-white text-small">Starkboard provides all the latest Starknet data
              that you are looking for!</p>
          </div>
          <div className="footer-col">
            <h4>COMMUNITY</h4>
            <div className="social-links">
              <a href="https://discord.gg/8KJKrpDUMZ" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
              <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://medium.com/@starkboard/5a1e37fb31df" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faMedium} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>ABOUT US</h4>
            <ul className="pl-0">
              <li><a href="https://github.com/StarkBoard" target="_blank" rel="noreferrer">Docs</a></li>
              <li><a href="https://joinoda.info/" target="_blank" rel="noreferrer">Team</a></li>
              <li><a href="https://etherscan.io/address/0x3e5abd4b3be54c62301ae83f7d360cfd215dafa2" target="_blank" rel="noreferrer">Donation</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>CONTACT US</h4>
            <ul className="pl-0">
              <li><a href="mailto:starkboard@proton.me">starkboard@proton.me</a></li>
              <li><a href="mailto:incasedao@gmail.com">incasedao@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
