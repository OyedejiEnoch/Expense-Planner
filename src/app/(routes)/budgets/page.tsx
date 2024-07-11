import BudgetList from '@/components/BudgetList'
import React from 'react'

const Budgets = () => {

  
  return (
    <div className='p-5 size-full'>
      <h2 className='text-3xl font-bold '>My Budgets</h2>
      <BudgetList />
    </div>
  )
}

export default Budgets