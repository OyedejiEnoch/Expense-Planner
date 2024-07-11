"use client"
import BarchartDashboard from '@/components/BarchartDashboard'
import BudgetItem from '@/components/BudgetItem'
import CardInfo from '@/components/CardInfo'
import ExpenseListTable from '@/components/ExpenseListTable'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [budgetList, setBudgetList]=useState([])
  const [expensesList, setExpensesList]=useState([])
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
    getAllExpenses()
  } catch (error) {
    console.error('Error fetching budgets:', error);
  }
  }

// to get all expenses of the logged in user
  const getAllExpenses =async()=>{
    const result =await db.select({
      id:ExpensesSchema.id,
      name:ExpensesSchema.name,
      amount:ExpensesSchema.amount,
      createdAt:ExpensesSchema.createdBy
    }).from(BudgetsSchema)
    .rightJoin(ExpensesSchema, eq(BudgetsSchema.id, ExpensesSchema.budgetId))
    .where(eq(BudgetsSchema.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .orderBy(desc(BudgetsSchema.id))


    setExpensesList((result as []))
  }

  return (
    <div className='p-8 flex flex-col gap-2'>
      <h2 className='font-bold text-3xl'>Hi, {user?.fullName} 👋</h2>
      <p className='text-gray-500 mt-2'>Here's what happening with your money, let's manage your expenses</p>

      <CardInfo budgetList={budgetList} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-8 gap-5' >
        <div className='md:col-span-2 flex flex-col gap-4'>
          <BarchartDashboard budgetList={budgetList} /> 


          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgets()} />
        </div>

        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budget</h2>
          {budgetList.map((budget, index)=>(
            <BudgetItem key={index} budgetItem={budget} />
          ))}
        </div>
      </div>
    
    </div>
  )
}

export default Dashboard