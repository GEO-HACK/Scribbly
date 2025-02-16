import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'
import React from 'react'

const BlogPage = ({ searchParams }) => {
  // Extract 'page' and 'cat' parameters from searchParams
  const page = parseInt(searchParams.page) || 1;  // Default to page 1 if not provided
  const cat = searchParams.cat || '';  // Default to empty string if no category is selected

  return (
    <div>
      <h1 className='w-full bg-orange-400 py-[5px] px-[10px] flex justify-center text-lg font-semibold'>
        {cat} Blogs
      </h1>

      <div className='flex gap-[50px] mt-6'>
        
        {/* Pass page and category as props to CardList */}
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </div>
  );
}

export default BlogPage;
