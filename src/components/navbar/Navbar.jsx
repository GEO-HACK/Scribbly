import React from 'react'
import Image from 'next/image'
import  Link  from 'next/link'
import ThemeToggle from '../themeToggle/ThemeToggle'
import AuthLinks from '../authLinks/AuthLinks'

const Navbar = () => {
  return (
    <div className='flex-1 flex justify-between h-[100px] items-center'>
        <div className=' flex gap-2 flex-1'>
            <Image src="/facebook.png" alt='images of socials' width={24} height={24}/>
            <Image src="/instagram.png" alt='images of socials' width={24} height={24}/>
            <Image src="/tiktok.png" alt='images of socials' width={24} height={24}/>
            <Image src="/youtube.png" alt='images of socials' width={24} height={24}/>
            
        </div>
        <div className='flex-1 font-bold text-[36px] text-center'>Scribbly</div>
        <div className='flex-1 flex gap-3 px-2  text-sm font-semibold '>
            <ThemeToggle/>
            <Link href="/">HomePage</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/about">About</Link>
            <AuthLinks/>
        </div>
           
    </div>
  )
}

export default Navbar