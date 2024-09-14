'use client';

import dynamic from 'next/dynamic'
import React from 'react'
import Head from '@/components/mintComp/Head';
import Section1 from '@/components/mintComp/Section1';
import Section2 from '@/components/mintComp/Section2';
import MintNFT from '@/components/mint';



const Mint = dynamic(() => import ("../../components/mint"), {
  ssr: false,
})

const Page = () => {
  return (
    <div className='bg-black'>
       {/* <Mint/> */}

      <Head />

       <div
        className='flex flex-row justify-center items-center p-8'
       >
        <MintNFT/>

        {/* <Section1 /> */}

          {/* <Section2 /> */}

       </div>
    </div>
  )
}

export default Page
