import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { toast } from 'sonner'
import moment from 'moment'
import { Loader } from 'lucide-react'


const AddExpense = ({budgetId, user, refreshData}:{budgetId:number, user:any, refreshData:()=>void}) => {
    const [name, setName] =useState("")
    const [amount, setAmount] =useState('0')
    const [loading, setLoading]=useState(false)

    const addNewExpense =async()=>{
        setLoading(true)
        const result = await db.insert(ExpensesSchema)
        .values({
            name,
            amount,
            budgetId:budgetId,
            createdBy:moment().format('DD/MM/YYYY')
        }).returning({insertedId:BudgetsSchema.id})

        setAmount("")
        setName("")

        if(result){
            refreshData()
            toast("New expense added.")
           
          }
          setLoading(false)

    }

  return (
    <div className='p-5 rounded border'>
        <h2 className='font-bold text-lg'>Add Expense</h2>
        <div className='mt-4 flex flex-col gap-2'>
            <label className='text-black font-medium my-1 text-start text-sm'>Expense Name</label>
            <Input 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='e.g, House utensils, Car wipper' />
        </div>
        <div className='mt-4 flex flex-col gap-2'>
            <label className='text-black font-medium my-1 text-start text-sm'>Expense Amount</label>
            <Input 
            value={amount}
            type='number'
            onChange={(e)=>setAmount((e.target.value as any))}
            placeholder='1000, 4000' />
        </div>

        <Button className='mt-3 w-full' disabled={!(name && amount)}
        onClick={()=>addNewExpense()}
        >
            {loading ? <Loader className='animate-spin' /> :  " Add new expense"}
        </Button>
    </div>
  )
}

export default AddExpense