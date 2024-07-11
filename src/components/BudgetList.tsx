"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

const BudgetList = () => {

  const [budgetList, setBudgetList]=useState([])
  const {user} =useUser()

  useEffect(()=>{
     getBudgets()
  },[user])

  // this is to get all the budget list
  const getBudgets =async()=>{
    try {
    const result =await db.select({
      ...getTableColumns(BudgetsSchema),
      // this is to get the total amount of expenses and total number of items in the budget 
      totalSpend:sql `sum(${ExpensesSchema.amount})`.mapWith(Number),
      totalItem:sql `count(${ExpensesSchema.id})`.mapWith(Number)
    }).from(BudgetsSchema).leftJoin(ExpensesSchema, eq(BudgetsSchema.id, ExpensesSchema.budgetId))
    .where(eq(BudgetsSchema.createdBy,user?.primaryEmailAddress?.emailAddress!))
    
    .groupBy(
      BudgetsSchema.id,
    )
    .orderBy(desc(BudgetsSchema.id))
    ;

    setBudgetList((result as []))
  } catch (error) {
    console.error('Error fetching budgets:', error);
  }
  }

  return (
    <div className='w-full '>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 '>
        <CreateBudget refreshData={()=>getBudgets()} />

        {budgetList?.length > 0 ? budgetList.map((budget,index )=>(
          <BudgetItem key={index} budgetItem={budget} />
        ))
      : 
      [1,2,3,4,5].map((_, index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg h-[140px] animate-pulse'> 
        </div>
      ))
      }
        </div>
    </div>
  )
}

export default BudgetList