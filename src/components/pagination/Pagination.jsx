import React from 'react'

const Pagination = () => {
  return (
    <div className='flex justify-between'>
     <button className='w-[100px] border-none p-[12px] bg-red-600 text-white'>Previous</button>
     <button className='w-[100px] border-none p-[12px] bg-red-600 text-white'>Next</button>
    </div>
  )
}

export default Pagination
