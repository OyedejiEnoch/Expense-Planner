import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarchartDashboard = ({budgetList}:any) => {
  return (
    <div className='border rounded-lg p-5 '>
        <h2 className='font-bold text-lg mb-5 '>Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={budgetList} 
        margin={{
            top:5,
            right: 5,
            left: 20,
            bottom: 5,
        }}
        >
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Legend />
             <Bar dataKey="totalSpend" fill="#4845d2" stackId={"a"}  />
             <Bar dataKey="amount" fill="#C3C2FF" stackId={"a"}  />

        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarchartDashboard