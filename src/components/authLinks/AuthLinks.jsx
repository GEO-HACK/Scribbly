import Link from 'next/link'
import React from 'react'

const AuthLinks = () => {
    const status = "Authenticated"
  return (
    <>
    {status ==="notAuthenticated"? (
        <>
        <Link href="/login" >login</Link>

        </>

    ):(
        <>
        <Link href="/Write" >write</Link>
        
        <span className='cursor-pointer'>Logout</span>


        </>
    )}
    
    </>
    
  )
}

export default AuthLinks