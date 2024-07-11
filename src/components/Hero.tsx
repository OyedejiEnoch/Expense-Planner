"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = () => {

  const {user}=useUser()

  return (
    <section className="bg-gray-50 flex items-center flex-col">
    <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex ">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-6xl">
            Manage Expense.
          <strong className="font-extrabold text-primary sm:block"> Control your Money. </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed">
          Start creating your budget and save tons of money
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#0e1377] transition duration-150 focus:outline-none focus:ring sm:w-auto"
            href={user ? "/dashboard" : "/sign-in"}
          >
           {user ? " View Dashboard" : "Get Started"}
          </Link>
  
        </div>
      </div>
    </div>

    <Image src="/dashboard.png" alt="img"  width={1000} height={700} className=' rounded-xl border-2'/>
  </section>
  )
}

export default Hero