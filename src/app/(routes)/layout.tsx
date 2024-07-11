"use client"

import DashNavbar from '@/components/DashNavbar'
import Sidebar from '@/components/Sidebar'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const DashboardLayout = ({children}:{children:ReactNode}) => {

  const {user} =useUser()
  const router =useRouter()

  useEffect(()=>{
    // this is to find budgets created by the currently logged in user
    // in mongo, this is saying find the budgets created by the user id
    const checkUserBudget=async ()=>{
      const result =await db.select().from(BudgetsSchema)
      .where(eq(BudgetsSchema.createdBy, user?.primaryEmailAddress?.emailAddress!))
      
      if(result.length === 0 ){
        router.replace("/budgets")
      }
    }

   user && checkUserBudget()
  }, [user])


  return (
    <div className=''>
        <div className='fixed md:w-64 hidden md:block '>
            <Sidebar />
        </div>
        <div className='flex-1 md:ml-64'>
            <DashNavbar />
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout