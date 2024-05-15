import React, { useEffect, useState } from 'react'
import { AlignJustify } from 'lucide-react';
import { X } from 'lucide-react';
import { cn } from '../utils/utils';
import { Link, Outlet } from 'react-router-dom';
import { checkToken } from '../utils/checkToken';
import { logout } from '../utils/logout';
import { useContextProvider } from '../contexts/ContextProvider';
import { checkUserCredentials } from '../utils/checkUserCredentials';

export default function Navigation() {
    const {loggedIn, setLoggedIn, drawer, setDrawer} = useContextProvider()
    console.log(loggedIn)

    useEffect(() => {
        checkUserCredentials(setLoggedIn)
    },[])



    return (
        <>
            <nav className='flex justify-between p-5'>
                <h2><Link to='/' className='font-bold text-2xl'>ChatAI</Link></h2>
                <ul className='hidden md:flex gap-3'>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                        {loggedIn ? <li><button onClick={() => {
                            logout(setLoggedIn)
                        }} >Logout</button></li> : <li><Link to='/login'>Login</Link></li>}
                </ul>
                <AlignJustify className='md:hidden' onClick={() => {setDrawer(!drawer)}}/>
            </nav>
            <ul className={cn('shadow-md absolute -left-80 transition-all h-full top-0 w-1/2 bg-white md:hidden pt-10 flex flex-col gap-5', {'left-0': drawer})}>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    {loggedIn ? <li><button onClick={() => {
                        logout(setLoggedIn)
                    }} >Logout</button></li> : <li><Link to='/login'>Login</Link></li>}
                    
                    <X className='absolute top-3 right-3' onClick={() => {setDrawer(!drawer)}}/>
                </ul>
            <Outlet/>
            
        </>
    )
}
