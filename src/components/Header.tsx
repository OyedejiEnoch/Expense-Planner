"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

const Header = () => {

  const {user, isSignedIn}=useUser()

  return (
    <nav className='p-5 max-w-[1300px] mx-auto flex items-center justify-between border-b shadow'>
         <Image src={"./logo.svg"} alt='logo' width={60} height={80} className='cursor-pointer' />

         {isSignedIn ? 
         <UserButton />

         :
         <Link href={"/sign-in"}>
         <Button>
            Get Started
         </Button>
         </Link>
         }
    </nav>
  )
}

export default Header