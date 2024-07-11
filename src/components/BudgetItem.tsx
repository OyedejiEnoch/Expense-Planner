import Link from 'next/link'
import React from 'react'

type Prop ={
    budgetItem:{
    id:string,
    icon:string,
    name:string,
    amount:number,
    totalItem:number,
    totalSpend:number
    }

}

const BudgetItem = ({budgetItem}:Prop) => {

    const calculateProgressPercent=()=>{
        const percent =(budgetItem.totalSpend / budgetItem.amount) * 100
        return percent.toFixed(2)
    }

  return (
    <Link href={`/expenses/${budgetItem.id}`} className=' border rounded-lg h-[170px]  gap-6 flex flex-col hover:shadow-md cursor-pointer transition duration-150'>
        <div className='flex justify-between items-center p-2'>
            <div className='flex items-center gap-4'>
                <h2 className='text-2xl p-3 bg-slate-100 rounded-full'>{budgetItem.icon}</h2>
            <div className='flex flex-col items-center'>
                <h2 className='font-bold text-sm text-gray-500'>{budgetItem.name}</h2>
                <span className='text-[14px]'>{budgetItem.totalItem} items</span>
            </div>
        
            </div>

            <h2 className='font-bold text-primary text-lg'>${budgetItem.amount}</h2>
        </div>

        <div >
            <div className='flex justify-between items-center mb-3 px-4 py-2'>
                <h2 className='text-sm text-slate-400'>{budgetItem.totalItem?budgetItem.totalItem  : 0} {budgetItem.totalItem === 1 ? "item" :"items"}</h2>
                <h2 className='text-sm text-slate-400'>${budgetItem.amount-budgetItem.totalSpend} remaining</h2>
            </div>

            <div className='w-full bg-slate-300 h-4 rounded-full mb-5'>
                <div className='bg-primary h-4  rounded-full'
                style={{width:`${calculateProgressPercent()}%`}}
                >

                </div>
            </div>
        </div>
    </Link>
  )
}

export default BudgetItem