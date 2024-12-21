import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'
import React from 'react'

const page = () => {
  return (
    <div>
        <h1 className='w-full bg-orange-400  py-[5px] px-[10px] flex justify-center text-lg font-semibold'>Style Blog</h1>
        <div className='flex gap-[50px] mt-6'>
            <CardList/>
            <Menu/>
        </div>
    </div>
  )
}

export default page