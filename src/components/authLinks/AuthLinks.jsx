import Link from 'next/link'
import React from 'react'

const AuthLinks = () => {
    const status = "notAuthenticated"
  return (
    <>
    {status ==="Authenticated"? (
        <>
        <Link href="/login" >login</Link>

        </>

    ):(
        <>
        <Link href="/write" >write</Link>
        
        <span className='cursor-pointer'>Logout</span>


        </>
    )}
    
    </>
    
  )
}

export default AuthLinks