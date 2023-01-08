import { faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Button from '../Button'
import axios from 'axios'
import { NextImage } from 'components/utils/NextImage'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const submit = async () => {
    const validEmail = /\S+@\S+\.\S+/.test(email)
    setSuccess(false)
    if (!validEmail) {
      setError('Invalid email')
      return
    }
    setError('')
    try {
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/storeNewsletter',
        {
          email_address: email
        }, {
          headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
        })
      setSuccess(true)
    } catch (rawError) {
      const error = rawError as { message?: string, data?: { message?: string } }
      let errorMessage = 'An enexpected error has occurred while registering yourself to the newsletter. Please try again'
      errorMessage = error.message || error.data?.message || errorMessage
      setError(errorMessage)
    }
  }
  return (
    <div className='bg-gradient-to-b from-dark-200 to-dark-500 text-white px-6 md:px-12 lg:px-24 pt-10 pb-24 xl:flex'>
      <div className='xl:w-[450px] flex-shrink-0 xl:mr-24'>
        <div className='flex justify-start items-center'>
          <div className='w-6 h-6 mr-4'>
            <NextImage src="/images/logo.png" />
          </div>
          <h4 className='uppercase text-2xl'>Starkboard</h4>
        </div>

        <p className='my-8 text-sm'>Starkboard provides all the latest Starknet data that you are looking for!</p>
        {
          success && (
            <div className='z-10 relative inset-0 flex items-center justify-center rounded-md bg-green-500 mb-3 max-w-lg py-1'>
              Successfully registered to the newsletter!
            </div>
          )
        }

        {
          error && (
            <div className='z-10 relative inset-0 flex items-center justify-center rounded-md bg-red-500 mb-3 max-w-lg py-1'>
              {error}
            </div>
          )
        }

        {/* Newletter input */}
        <div className='relative w-full h-14 max-w-lg'>
          {/* Background newsletter */}
          <div className='absolute inset-0 z-0 rounded-md border-2 border-gray-500 bg-gradient-to-tr from-gray-600 to-gray-900'></div>

          {/* <div className='absolute inset-0 w-full h-full bg-red-600'>
            <NextImage src={'/images/newsletter-bg.png'} />
          </div> */}

          <div className='z-10 flex items-stretch absolute inset-0 text-sm'>
            <input type="text" placeholder="Your email" className='outline-none w-full bg-transparent pl-2' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button onClick={submit} className='px-4 py-3 whitespace-nowrap'>Join newsletter</Button>
          </div>
        </div>
      </div>

      <div className='lg:flex whitespace-nowrap w-full'>
        <div className='mt-14 xl:mt-0 lg:w-1/3'>
          <h5 className='text-base uppercase w-fit'>Community<div className='bg-gradient-to-l from-blue-100 to-blue-200 h-1 mt-1' /></h5>
          <div className='flex mt-6 space-x-4'>
            <a href="https://twitter.com/Starkboard" target="_blank" rel="noreferrer">
              <div className='bg-gradient-to-b from-blue-100 to-blue-200 rounded-md p-2 flex justify-center items-center cursor-pointer h-12 w-12 text-white'>
                <FontAwesomeIcon icon={faTwitter} style={{ height: '20px', width: '20px' }} />
              </div>
            </a>
            <a href="https://discord.gg/8KJKrpDUMZ" target="_blank" rel="noreferrer">
              <div className='bg-gradient-to-b from-blue-100 to-blue-200 rounded-md p-2 flex justify-center items-center cursor-pointer h-12 w-12 px-3 text-white'>
                <FontAwesomeIcon icon={faDiscord} style={{ height: '20px', width: '20px' }} />
              </div>
            </a>
            <a href="https://medium.com/@starkboard/5a1e37fb31df" target="_blank" rel="noreferrer">
              <div className='bg-gradient-to-b from-blue-100 to-blue-200 rounded-md p-2 flex justify-center items-center cursor-pointer h-12 w-12 px-3 text-white'>
                <FontAwesomeIcon icon={faMedium} style={{ height: '20px', width: '20px' }} />
              </div>
            </a>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row mt-14 xl:mt-0 lg:w-2/3 lg:justify-around'>
          <div>
            <h5 className='text-base uppercase w-fit'>About us<div className='bg-gradient-to-l from-blue-100 to-blue-200 h-1 mt-1' /></h5>
            <ul className='mt-8 space-y-3 text-sm'>
              <li className="transition hover:translate-x-2"><a href="https://medium.com/@starkboard/starkboard-keep-up-with-starknet-5a1e37fb31df" className="text-white" target="_blank" rel="noreferrer">Docs</a>
              </li>
              <li className="transition hover:translate-x-2"><a href="https://etherscan.io/address/0x1Bb7BE36833bE3ad4C359B2c94382B48d871Ce7C" className="text-white" target="_blank" rel="noreferrer">Donation</a></li>
              <li className="transition hover:translate-x-2"><a href="https://app.starkboard.io/" target="_blank" rel="noreferrer" className="text-white">Dashboard</a></li>
            </ul>
          </div>
          <div className='lg:ml-0 sm:ml-28 mt-14 sm:mt-0'>
            <h5 className='text-base uppercase w-fit'>Contact us<div className='bg-gradient-to-l from-blue-100 to-blue-200 h-1 mt-1' /></h5>
            <ul className='mt-8 space-y-3 text-sm'>
              <li className="transition hover:translate-x-2"><a href='mailto:starkboard@gmail.com' target='_blank' className="text-white" rel='noreferrer'>starkboard@gmail.com</a></li>
              <li className="transition hover:translate-x-2"><a href='mailto:incasedao@gmail.com' target='_blank' className="text-white" rel='noreferrer'>incasedao@gmail.com</a></li>
              <li className="transition hover:translate-x-2"><a href="https://calendly.com/starkboard/30min" target="_blank" className="text-white" rel="noreferrer">Book a call</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
