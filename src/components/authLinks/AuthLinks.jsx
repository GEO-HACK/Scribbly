import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const AuthLinks = () => {
  const {status} = useSession()
  return (
    <>
    {status ==="unauthenticated"? (
        <>
        <Link href="/login" >login</Link>

        </>

    ):(
        <>
        <Link href="/write" >write</Link>
        
        <span className='cursor-pointer' onClick={signOut}>Logout</span>


        </>
    )}
    
    </>
    
  )
}

export default AuthLinks