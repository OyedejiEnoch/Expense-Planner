"use client"
import React from 'react'
import { PenBox, PlusCircle } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { Input } from './ui/input'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'

// type Prop={
//     budgetInfo:{
//     name:string,
//     amount:string,
//     }
    
// }

const EditBudget = ({budgetInfo, refreshData}:any) => {

    const {user}=useUser()
    const [emojiIcon, setEmojiIcon] =useState(budgetInfo?.icon)
    const [openEmojiPicker, setOpenEmojiPicker] =useState(false)

    const [name, setName] =useState(budgetInfo?.name)
    const [amount, setAmount] =useState(budgetInfo?.amount)

    const onUpdateBudget =async()=>{
        const result = await db.update(BudgetsSchema).set({
            name,
            amount,
            icon:emojiIcon
        })
        .where(eq(BudgetsSchema.id, budgetInfo.id))
        .returning()

        if(result){
            refreshData()
            toast("Budget Updated")
        }
    }

    console.log(budgetInfo?.name)

  return (
    <div>
    <Dialog>
  <DialogTrigger asChild>
    <Button className='flex gap-2'> <PenBox /> Edit</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Budget</DialogTitle>
      <DialogDescription>
        <div className='mt-5'>
        <Button size="lg" variant={'outline'} onClick={()=>setOpenEmojiPicker((preValue)=> !preValue)}>
            {emojiIcon}
        </Button>
        </div>
        <div className='absolute z-20 '>
            <EmojiPicker open={openEmojiPicker} onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji)
                setOpenEmojiPicker(false)
            }} />
        </div>

        <div className='mt-4 flex flex-col gap-2'>
            <label className='text-black font-medium my-1 text-start'>Budget Name</label>
            <Input 
            defaultValue={budgetInfo?.name}
            onChange={(e)=>setName(e.target.value)}
            placeholder='e.g, Home, School, Transport' />
        </div>
        <div className='mt-4 flex flex-col gap-2'>
            <label className='text-black font-medium my-1 text-start'>Budget Amount</label>
            <Input 
            type='number'
            defaultValue={budgetInfo?.amount}
            onChange={(e)=>setAmount(e.target.value)}
            placeholder='10,000, 20,000' />
        </div>

      
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
        disabled={ !(name&&amount)}
        onClick={()=>onUpdateBudget()}
        className='mt-4 w-full'>Create</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
        </Dialog>
    </div>
  )
}

export default EditBudget