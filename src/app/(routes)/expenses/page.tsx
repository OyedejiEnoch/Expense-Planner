"use client"
import BudgetItem from '@/components/BudgetItem'
import CardInfo from '@/components/CardInfo'
import ExpenseListTable from '@/components/ExpenseListTable'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

const Expenses = () => {

    const [budgetList, setBudgetList]=useState([])
  const [expensesList, setExpensesList]=useState([])
  const {user} =useUser()

  useEffect(()=>{
    getAllExpenses()
 },[user])


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
    <div className='w-full p-5'>
        <ExpenseListTable expensesList={expensesList} refreshData={()=>getAllExpenses()} />
    </div>
  )
}

export default Expenses