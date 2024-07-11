import { LayoutGrid, PiggyBank, ReceiptCent, ShieldCheck } from "lucide-react";

export const menuList =[
    {
        id:1,
        title:"Dashboard",
        icon:LayoutGrid,
        path:"/dashboard"
    },
    {
        id:2,
        title:"Budgets",
        icon:PiggyBank,
        path:"/budgets"
    },
    {
        id:3,
        title:"Expenses",
        icon:ReceiptCent,
        path:"/expenses"
    },
    {
        id:4,
        title:"Upgrade",
        icon:ShieldCheck,
        path:"/upgrade"
    },
]