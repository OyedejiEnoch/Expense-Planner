"use client"
import { PlusCircle } from 'lucide-react'
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
import { toast } from "sonner"

  

const CreateBudget = ({refreshData}:any) => {

    const {user}=useUser()
    const [emojiIcon, setEmojiIcon] =useState("Select Icons")
    const [openEmojiPicker, setOpenEmojiPicker] =useState(false)

    const [name, setName] =useState("")
    const [amount, setAmount] =useState("")
    const [details, setDetails] =useState("")

    const createBudget =async()=>{
        const result =await db.insert(BudgetsSchema)
        // insert in also a way of sending to a database
        .values({
            name,
            amount,
            createdBy:(user?.primaryEmailAddress?.emailAddress as string),
            icon:emojiIcon
        }).returning({insertedId:BudgetsSchema.id})

        if(result){
          toast("New Budget Created.")
          refreshData()

        }
    }

  return (
    <div>
        <Dialog>
  <DialogTrigger asChild>
  <div className='bg-slate-100 p-10 rounded-md flex items-center flex-col border-2 border-dashed 
        cursor-pointer shadow-sm mt-7 '>
            <PlusCircle />
            <h2>Create New Budget</h2>
        </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Budget</DialogTitle>
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
            onChange={(e)=>setName(e.target.value)}
            placeholder='e.g, Home, School, Transport' />
        </div>
        <div className='mt-4 flex flex-col gap-2'>
            <label className='text-black font-medium my-1 text-start'>Budget Amount</label>
            <Input 
            type='number'
            onChange={(e)=>setAmount(e.target.value)}
            placeholder='10,000, 20,000' />
        </div>

      
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
        disabled={ !(name&&amount)}
        onClick={()=>createBudget()}
        className='mt-4 w-full'>Create</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
        </Dialog>

    </div>
  )
}

export default CreateBudget