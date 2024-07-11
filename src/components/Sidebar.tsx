"use client"
import { menuList } from '@/constants'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const path =usePathname()

  return (
    <div className='h-screen w-full p-5 border shadow-sm flex flex-col gap-6'>
        <Image src="/logo.svg" alt='logo' width={160} height={100}  />

        <div className='flex flex-col gap-4 mt-4'>
            {menuList.map((menu)=>(
                <Link key={menu.id} href={menu.path} className={`flex gap-2 items-center text-gray-500 font-medium p-5 
                cursor-pointer rounded-md hover:text-primary hover:bg-blue-300 transition-all
                 duration-150 ${path === menu.path && "text-primary bg-[#C3C2FF] "}`}>
                    <menu.icon />
                    {menu.title}
                </Link>
            ))}


            <div className='fixed bottom-0 flex items-center gap-2 p-4 font-semibold cursor-pointer'>
                <UserButton />
                Profile
            </div>
        </div>
    </div>
  )
}

export default Sidebar