import { db } from '@/utils/dbConfig'
import { ExpensesSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { TbCurrencyNaira } from "react-icons/tb";

type Expense=[{
    id:string,
    name:string,
    amount:number,
    createdBy:string
}]




const ExpenseListTable = ({expensesList, refreshData}:{expensesList:any, refreshData:()=>void}) => {

    const deleteExpense =async(expense:any)=>{
        const result = await db.delete(ExpensesSchema)
        .where(eq(ExpensesSchema.id, expense.id))
        .returning()
    
        if(result){
            toast("Expense Deleted")
            refreshData()
        }
    }

  return (
    <div className='mt-3'>
        <h2 className='font-bold text-lg mb-4'>All Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-200'>
            <h2 className='font-bold text-[18px]'>Name</h2>
            <h2 className='font-bold text-[18px]'>Amount</h2>
            <h2 className='font-bold text-[18px]'>Date</h2>
            <h2 className='font-bold text-[18px]'>Action</h2>
        </div>

        {expensesList.map((expense:any, index:any)=>(
                <div key={index} className='grid grid-cols-4 bg-slate-100 mt-4'>
                <p className='text-gray-500 text-[16px]'>{expense.name}</p>
                <p className='text-gray-500 text-[16px] flex items-center' ><TbCurrencyNaira size={20}/>{expense.amount}</p>
                <p className='text-gray-500 text-[16px]'>{expense.createdBy}</p>
                <p className='text-gray-500 text-[16px]'>
                    <Trash className='text-red-500 text-[16px] cursor-pointer'size={20}
                    onClick={()=>deleteExpense(expense)}
                    />
                </p>
            </div>
        ))}
    </div>
  )
}

export default ExpenseListTable