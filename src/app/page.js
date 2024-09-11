import Connect from '@/components/connect'
import React from 'react';
import ConnectWallet from '@/components/connectWallet';

const Page = () => {
  return (
    <div>
      <Connect/>

      {/* <ConnectWallet/> */}

      <div 
        className='w-full h-screen flex justify-center items-center'
      >
        <div
          className='w-6/12 flex flex-col justify-center'
        >
          <p
            className='text-center text-white font-semibold text-9xl mb-4'
          >
            Mint NFTs,
            Gas Fees!
          </p>

          <p
            className='text-white font-normal text-xl text-center mb-4'
          >
            With MintEase, mint your NFTs effortlessly and gas-free. Just upload, set, and mint — we will handle the fees!
          </p>

          <div
            className='w-full flex justify-center'
          >
            <button
              className='rounded-2xl bg-yellow1 text-black font-bold p-4 text-base w-[120px]'
            >
              Mint Now
            </button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Page
