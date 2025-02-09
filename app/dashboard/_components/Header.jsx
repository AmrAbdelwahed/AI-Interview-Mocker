"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { SignOutButton, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'


function Header() {
    const path = usePathname()
    const { signOut } = useClerk()
    
    useEffect(() => {
        console.log(path)
    })
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-md'>
        <Image src={'/logo.svg'} width={160} height={100} alt="logo" />
        <ul className='hidden md:flex gap-6'>
            {/* <li className={`hover:text-primary hover:font-bold transition cursor-pointer 
                ${path == '/dashboard' && 'text-primary font-bold'} `}> Dashboard</li>
            <li className={`hover:text-primary hover:font-bold transition cursor-pointer 
                ${path == '/dashboard/questions' && 'text-primary font-bold'} `}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition cursor-pointer 
                ${path == '/dashboard/upgrade' && 'text-primary font-bold'} `}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition cursor-pointer 
                ${path == '/dashboard/how' && 'text-primary font-bold'} `}>How it Works?</li> */}
        </ul>
        <UserButton>
        <UserButton.MenuItems>
            <UserButton.Action label="signOut" />
        </UserButton.MenuItems>
        </UserButton>
        <button onClick={() => signOut({ redirectUrl: '/' })}>Sign out</button>
        <SignOutButton></SignOutButton>
    </div>
  )
}

export default Header