import React from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../utils/signUp'

export default function Hero() {
  return (
    <>
        <div >
            <h1 className='text-4xl font-bold'>Chat anywhere</h1>
            <p>Lorem ipsum dolor sit amet.</p>
            <div className='flex justify-center gap-3 mt-5'>
                <button onClick={() =>{signUp()}}className='bg-black text-white px-4 py-2 rounded-md font-semibold'>Sign Up</button>
                <Link to='/login' className='bg-gray-200 px-4 py-2 rounded-md opacity-75 font-semibold'>Login</Link>
            </div>
        </div>

    </>
  )
}
