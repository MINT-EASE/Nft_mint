import React, { useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { LuAsterisk } from "react-icons/lu";

const Section1 = () => {
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [attri, setAttri] = useState("");

    const [imgUrl, setImgUrl] = useState("");

  return (
    <div
        className='w-5/12'
    >

        <p
            className='text-3xl text-white font-bold mb-8'
        >
            Mint Your NFT
        </p>

        <p
            className='text-2xl text-white font-bold mb-4'
        >
            NFT Details
        </p>

        <p className='mb-2'>
            Upload Media
        </p>

        <div
            className='mb-8 p-8 w-[354px] h-[188px] border-dotted border-2 border-white flex flex-col justify-center items-center' 
        >
            <p
                className='text-xs font-bold mb-4'
            >
              PNG, WEBP. Max 2mb 
            </p>

            <label
                htmlFor='imageUpload'
                className='cursor-pointer text-base font-bold bg-yellow1 rounded-3xl p-4 flex flex-row items-center'
            >
                <MdOutlineFileUpload className='mr-2' />

                Browse Files
            </label>

            <input 
                id='imageUpload'
                type='file'
                hidden={true}
                onChange={(e) => console.lop(e.target.files[0])}
            />
        </div>

        <form
            className='w-full'
        >

            <div
                className='flex flex-col mb-8'
            >
                <label
                    className="text-base font-medium mb-2 flex flex-row "
                    htmlFor='addrs'
                >
                    Address
                    <LuAsterisk className='text-red-500' />
                </label>

                <input 
                    id='addrs'
                    required={true}
                    type='text'
                    className=' w-full rounded-xl p-2 outline-none border-2 border-slate-500'
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            
            <div
                className='flex flex-col mb-8'
            >
                <label
                    className="text-base font-medium mb-2 flex flex-row"
                    htmlFor='nftName'
                >
                    Name of NFT
                    <LuAsterisk className='text-red-500' />
                </label>

                <input 
                    required={true}
                    type='text'
                    className=' w-full rounded-xl p-2 outline-none border-2 border-slate-500'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div
                className='flex flex-col mb-8'
            >
                <label
                    className="text-base font-medium mb-2 flex flex-row "
                    htmlFor='desk'
                >
                    Description
                    <LuAsterisk className='text-red-500' />
                </label>

                <input 
                    id='desk'
                    required={true}
                    type='text'
                    className=' w-full rounded-xl p-2 outline-none border-2 border-slate-500'
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>

            <div
                className='rounded-xl p-4 w-full border-2 border-slate-500'
            >
                 <div
                className='flex flex-col'
            >
                <label
                    className="text-base font-medium mb-2"
                    htmlFor='attri'
                >
                    Atrributes (optional)
                </label>

                <input 
                    id='attri'
                    required={false}
                    type='text'
                    className=' w-full rounded-xl p-2 outline-none border-2 border-slate-500'
                    onChange={(e) => setAttri(e.target.value)}
                />
            </div>
            </div>

            <button
              className='mt-8 w-[120px] rounded-3xl bg-yellow1 text-black font-bold p-4 text-base w-[120px]'
            >
              Mint
            </button>

        </form>

    </div>
  )
}

export default Section1