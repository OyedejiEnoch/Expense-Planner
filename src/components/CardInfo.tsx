import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { TbCurrencyNaira } from 'react-icons/tb'

const CardInfo = ({budgetList}:any) => {

    const [totalBudget, setTotalBudget]=useState(0)
    const [totalSpend, setTotalSpend]=useState(0)

    useEffect(()=>{
        budgetList &&  CalculateCardInfo()
    },[budgetList])

    const CalculateCardInfo =()=>{
        // console.log(budgetList)
        let theTotalBudget=0
        let theTotalSpend=0
        budgetList.forEach((element:any)=>{
          // i.e for each element in the budgetList array add the total amount together
            theTotalBudget =theTotalBudget + Number(element?.amount)
            theTotalSpend =theTotalSpend + element.totalSpend
        })

        setTotalBudget(theTotalBudget)
        setTotalSpend(theTotalSpend)
        // console.log(theTotalBudget, theTotalSpend)
    }


  return (
    <div>
      {budgetList?.length >0  ? 
      <>
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
      <div className='p-7 border flex rounded-lg items-center justify-between'>
            <div>
            <h2 className='text-sm'>Total Budget</h2>
            <h2 className='font-bold text-2xl flex items-center'><TbCurrencyNaira size={20}/> {(totalBudget).toLocaleString("en-us")}</h2>   
            </div>

        <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>

        </div>

        <div className='p-7 border flex rounded-lg items-center justify-between'>
            <div>
            <h2 className='text-sm'>Total Spend</h2>
            <h2 className='font-bold text-2xl flex items-center'><TbCurrencyNaira size={20}/> {(totalSpend).toLocaleString("en-us")}</h2>   
            </div>

        <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>

        </div>

        <div className='p-7 border flex rounded-lg items-center justify-between'>
            <div>
            <h2 className='text-sm'>Number of Budget</h2>
            <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>   
            </div>

        <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'/>

        </div>
        </div>
        </>
        :
        <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>

        {[1,2,3].map((_, index)=>(
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[120px] animate-pulse'> 
            </div>
          ))}

          </div>
        


        }
    
    </div>
  )
}

export default CardInfo