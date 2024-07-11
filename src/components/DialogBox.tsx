import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { db } from '@/utils/dbConfig'
import { BudgetsSchema, ExpensesSchema } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'



const DialogBox = ({budgetId}:any) => {
  const router =useRouter()
  
  const deleteBudget =async()=>{
    // we want to firstly delete the expenses that are attached to the budget
    const deleteExpenseResult = await db.delete(ExpensesSchema)
    .where(eq(ExpensesSchema.budgetId, budgetId))
    .returning()

    if(deleteExpenseResult){
      const result =await db.delete(BudgetsSchema)
      .where(eq(BudgetsSchema.id, budgetId))
      .returning()
      
    }
    toast("Budget deleted successfully")
    router.push("/budgets")

  
  }
    

  return (
<AlertDialog>
  <AlertDialogTrigger asChild>
  <div>
    <Button className="flex gap-2" variant={'destructive'} ><Trash /> Delete</Button>
    </div>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your budget 
        and your expenses.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>deleteBudget()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  
  )
}


export default DialogBox