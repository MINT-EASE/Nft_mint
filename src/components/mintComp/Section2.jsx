import Image from 'next/image';
import React, { useState } from 'react'

const Section2 = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [img, setImg] = useState("");
  return (
    <div
        className='w-5/12'
    >

        <p
            className='text-2xl text-white font-bold mb-8'
        >
            NFT Details
        </p>


        {
            img.length === 0 ? (
                <div
                    className='w-full'
                >
        
                    <p
                        className='text-center text-white text-base font-medium mb-2'
                    >
                        No NFT Minted Yet
                    </p>
        
                    <p
                        className='text-center text-sm font-normal text-[#697586]'
                    >
                        Fill in valid details and mint.
                    </p>
                </div>
            ) : (
                <div
                    className='p-4 rounded-xl border-2 border-slate-500'
                >
                    <Image 
                        src='/assets/image.png'
                        width={50}
                        height={50}
                        alt=''
                    />

                    <p
                        className='mt-4 text-lg font-medium text-center mb-2'
                    >
                        Spider Man
                    </p>

                    <p
                        className='text-base text-center'
                    >
                    Just because with great power, comes great responsibility! Just because with great power, comes great responsibility!
                    </p>
                </div>
            )
        }

    </div>
  )
}

export default Section2