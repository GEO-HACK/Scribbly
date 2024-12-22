
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Comments = () => {
  const status = "authenticated";
  return (
    <div className=''>
      <h1 className='text-2xl text-gray-400 font-bold'>Comments</h1>
      {status === "authenticated" ? (
        <div className='flex  gap-3'>
          <textarea
            placeholder='Write a comment ...'
            className='mt-2 w-[600px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none'
          ></textarea>
          <button className='px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500'>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login" className='text-sm text-violet-500 hover:underline'>
          Login to write a comment
        </Link>
      )}

      <div className='mt-4 flex flex-col gap-5'>
      <div className='flex flex-col gap-1'>
          <div className='flex gap-3 items-center '>
            <Image src="/p1.jpeg" alt="profile image" width={30} height={30} className='w-12 h-12  rounded-full object-cover'/>
            
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Geo-Hack</span>
              <span className='text-[12px] text-gray-400 font-bold'>12.12.2024</span>
            </div>
          </div>
          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolor commod</p>
        </div><div className='flex flex-col gap-1'>
          <div className='flex gap-3 items-center '>
            <Image src="/p1.jpeg" alt="profile image" width={30} height={30} className='w-12 h-12  rounded-full object-cover'/>
            
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Geo-Hack</span>
              <span className='text-[12px] text-gray-400 font-bold'>12.12.2024</span>
            </div>
          </div>
          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolor commod</p>
        </div><div className='flex flex-col gap-1'>
          <div className='flex gap-3 items-center '>
            <Image src="/p1.jpeg" alt="profile image" width={30} height={30} className='w-12 h-12  rounded-full object-cover'/>
            
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Geo-Hack</span>
              <span className='text-[12px] text-gray-400 font-bold'>12.12.2024</span>
            </div>
          </div>
          <p  className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolor commod</p>
        </div><div className='flex flex-col gap-1'>
          <div className='flex gap-3 items-center '>
            <Image src="/p1.jpeg" alt="profile image" width={30} height={30} className='w-12 h-12  rounded-full object-cover'/>
            
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Geo-Hack</span>
              <span className='text-[12px] text-gray-400 font-bold'>12.12.2024</span>
            </div>
          </div>
          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque dolor commod</p>
        </div><div className='flex flex-col gap-1'>
          <div className='flex gap-3 items-center '>
            <Image src="/p1.jpeg" alt="profile image" width={30} height={30} className='w-12 h-12  rounded-full object-cover'/>
            
            <div className='flex flex-col'>
              <span className='font-semibold text-sm'>Geo-Hack</span>
              <span className='text-[12px] text-gray-400 font-bold'>12.12.2024</span>
            </div>
          </div>
          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eaque quibusdam doloremque, quas voluptas </p>
        </div>
        

      </div>
    </div>
  );
};

export default Comments;
