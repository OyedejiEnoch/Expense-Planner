import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React from 'react'
import MobileNav from './MobileNav'

const DashNavbar = () => {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
        
          <MobileNav />
        

        <div>
            <UserButton />
        </div>
    </div>
  )
}

export default DashNavbar