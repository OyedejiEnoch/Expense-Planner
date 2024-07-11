"use client"
import { db } from '@/utils/dbConfig';
import React, { Suspense, useEffect, useState } from 'react'
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs';
import BudgetItem from '@/components/BudgetItem';
import AddExpense from '@/components/AddExpense';
import ExpenseListTable from '@/components/ExpenseListTable';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DialogBox from '@/components/DialogBox';
import EditBudget from '@/components/EditBudget';

const Expenses = ({params}:{params:{id:string}}) => {
  

    const {user} =useUser()
    const [budgetInfo, setBudgetInfo]=useState({})
    const [expensesList, setExpensesList] =useState([])

    useEffect(()=>{
        getBudgetInfo()
        
     },[user])

    //  get budgetInfo
    const getBudgetInfo =async()=>{
        try {
        const result =await db.select({
            ...getTableColumns(BudgetsSchema),
            // this is to get the total amount of expenses and total number of items in the budget 
            totalSpend:sql `sum(${ExpensesSchema.amount})`.mapWith(Number),
            totalItem:sql `count(${ExpensesSchema.id})`.mapWith(Number)
          }).from(BudgetsSchema).leftJoin(ExpensesSchema, eq(BudgetsSchema.id, ExpensesSchema.budgetId))
          .where(
            and(
              eq(BudgetsSchema.createdBy, user?.primaryEmailAddress?.emailAddress!),
              eq(BudgetsSchema.id, parseInt(params.id, 10))
            )
          )
          .groupBy(
            BudgetsSchema.id,
          )
          setBudgetInfo(result[0])
          getExpensesList()
          
          // console.log(result)
        } catch (error) {
            console.error('Error fetching budgets:', error);    
        }
    }

    // get the expenses 
    const getExpensesList =async()=>{
      const result =await db.select().from(ExpensesSchema)
      .where(eq(ExpensesSchema.budgetId,parseInt(params.id,10)))
      .orderBy(desc(ExpensesSchema.id))

      setExpensesList((result as []))
    }

  return (
    <div className='text-2xl font-bold p-5'>
       <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses


        <div className='flex items-center gap-4'>
          
          <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />
         
          <DialogBox budgetId={params.id} />
        </div>
        </h2> 

       <div className='grid grid-cols-1 md:grid-cols-2 mt-2 gap-5 '>
          { budgetInfo ?
            <BudgetItem budgetItem={(budgetInfo as any)}/>
          : 
          [1].map((_, index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[140px] animate-pulse'> 
            </div>
          ))
          
          }

        {/* when we want to create a new expense, remember from the schema, we are adding the budgetId and
        also the user that is creating the expense. in mongoose, we may not necessary pass the user from 
        the frontend, we could have done it at the backend using req.user.id  */}
          <AddExpense budgetId={parseInt(params.id)} user={user} refreshData={()=>getBudgetInfo()}/>
            {/* when we click on the refresh, we recall the data from the budget which the new data 
            had being added, both for the budget and expenses */}
       </div>

       <div className='mt-6' >
          <h2 className='font-bold text-lg'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData={()=>getBudgetInfo()}/>
       </div>
    </div>
  )
}

export default Expenses