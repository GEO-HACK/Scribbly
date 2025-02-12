import React from 'react'
import CardList from '@/components/cardList/CardList'
const page = () => {
  return (
    <div className='flex flex-row items-center justify-center'>
    
        <CardList all={true} />
        

    </div>
  )
}

export default page