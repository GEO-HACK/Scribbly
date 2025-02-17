import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'
import React from 'react'
import { Suspense } from 'react'

const BlogPage = () => {


  return (
    <div>
      <h1 className='w-full bg-orange-400 py-[5px] px-[10px] flex justify-center text-lg font-semibold'>
         Blogs
      </h1>

      <div className='flex gap-[50px] mt-6'>
        
        {/* Pass page and category as props to CardList */}
        <Suspense fallback={<div>Loading...</div>}>
          <CardList/>
        </Suspense>
        
        <Menu />
      </div>
    </div>
  );
}

export default BlogPage;
