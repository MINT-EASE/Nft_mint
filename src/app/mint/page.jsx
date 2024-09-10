import dynamic from 'next/dynamic'
import React from 'react'


const Mint = dynamic(() => import ("../../components/mint"), {
  ssr: false,
})

const Page = () => {
  return (
    <div>
       <Mint/>
    </div>
  )
}

export default Page
