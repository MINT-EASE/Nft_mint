import React from 'react'
import { IoCloseSharp } from "react-icons/io5";

const Head = () => {
  return (
    <div
    className='flex flex-row justify-between items-center p-8'
   >
    <img 
      src='/assets/logo.png'
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