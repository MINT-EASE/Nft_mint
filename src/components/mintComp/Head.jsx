import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import Image from 'next/image';

const Head = () => {
  return (
    <div
    className='flex flex-row justify-between items-center p-8'
   >
    <Image 
      src='/assets/logo.png'
      width={50}
      height={30}
      alt='Logo'
    />

    <buton
      className="outline-none border-none bg-transparent font-bold text-white text-xl"
    >
      <IoCloseSharp />
    </buton>
   </div>
  )
}

export default Head