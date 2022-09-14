import Image from 'next/image'
import React from 'react'

const Donate = () => {
  const blocks = [{
    title: 'Stark Whale',
    image: '/images/donate/Whale.png',
    button: 'Donate 0.1 ETH',
    description: '0.1 ETH is a monthly cost for our Database to be maintained at StarkBoard. Thank you for supporting us, Whale!'
  }, {
    title: 'Stark Shrimp',
    image: '/images/donate/Shrimp.png',
    button: 'Donate 0.01 ETH',
    marginTop: 4,
    description: '0.01 ETH is a weekly cost for our server to run StarkBoard Thank you for supporting us, Shrimp!'
  }, {
    title: 'Custom Amount',
    image: '/images/donate/Ethereum.png',
    button: 'Donate now',
    marginTop: 5,
    description: 'Thank you for your support! Any amount is much appreciated'
  }]
  return (
    <>
      <h2 className="ps-0 pb-4 page-title text-center"></h2>
      <div className="row justify-content-center">
        <h2 className="text-white text-center page-title mt-4 col-12">Donate to support us</h2>
      </div>
      <div className="row justify-content-center">
        <p className="text-white text-center col-6 ">You can chose the pack that click at the &quot;Donate&quot; button to select
          for a chain you liked to make a donation to Ape Board team!</p>
      </div>
      <div className="row justify-content-center mt-3 gx-5">
        {
          blocks.map(block => (
            <div className="col-lg-4 py-4 h-128" key={block.image}>
              <div className="black-gradient rounded donate-block px-4 py-4">
                <div className="d-flex flex-column justify-content-center">
                  <h3 className="text-white text-center">{block.title}</h3>
                  <p className="text-white text-center mb-6 mt-3">{block.description}</p>
                  <div className={`d-flex justify-content-center w-100 mt-${block.marginTop || 0} mb-4`}>
                    <Image src={block.image} width="80" height="80" alt="" />
                  </div>
                  <button className={'mt-4 blue-gradient rounded text-white py-2'}>{block.button}</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Donate
