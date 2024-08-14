import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { menuList } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UserButton } from '@clerk/nextjs'
  

const MobileNav = () => {

    const path =usePathname()

  return (
    <Sheet >
  <SheetTrigger>
    <Menu />
  </SheetTrigger>
  <SheetContent side={"left"}>
  <div className='h-screen w-full p-2 shadow-sm flex flex-col gap-6'>
        <Image src="/logo.svg" alt='logo' width={50} height={70}  />

        <SheetClose asChild>
        <div className='flex flex-col gap-4 mt-4'>
            {menuList.map((menu)=>(
                <SheetClose key={menu.id} asChild>
                <Link key={menu.id} href={menu.path} className={`flex gap-2 items-center text-gray-500 font-medium p-5 
                cursor-pointer rounded-md hover:text-primary hover:bg-blue-300 transition-all
                 duration-150 ${path === menu.path && "text-primary bg-[#C3C2FF] "}`}>
                    <menu.icon />
                    {menu.title}
                </Link>
                </SheetClose>
            ))}


            <div className='fixed bottom-0 flex items-center gap-2 p-4 font-semibold cursor-pointer'>
                <UserButton />
                Profile
            </div>
        </div>
        </SheetClose>
    </div>
  </SheetContent>
</Sheet>

  )
}

export default MobileNav