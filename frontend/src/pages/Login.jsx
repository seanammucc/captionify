import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../utils/login'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { checkToken } from '../utils/checkToken'
import { signUp } from '../utils/signUp'

export default function Login() {
    const location = useLocation()
    const navigate = useNavigate()
    
    useEffect(() => {
        async function checkUserCredentials() {
          const response = await checkToken()
          if (response.ok){
            navigate('/dashboard')
          }
    
        }
        checkUserCredentials()
        
      },[]);

    const onSubmit = async (data) => {
        const response = await login(data)
        const res = await response.json()
        if (!response.ok){
            switch (res.message){
                case 'User does not exist!':
                    setError('email', {
                        type: 'manual',
                        message: 'User does not exist!'
                    })
                    break
                case 'Incorrect Password':
                    setError('password', {
                        type: 'manual',
                        message: 'Incorrect password!'
                    })
                    break
                default:
                    setError('email', {
                        type: 'manual',
                        message: 'Something went wrong!'
                    })
            }
        }
        else {
            navigate('/dashboard')
        }

    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm()
  return (
    <form className='flex flex-col p-5 gap-3 shadow-md max-w-[300px] mx-auto mt-20 rounded-lg' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='font-semibold'>Login</h2>
        <input type="email"placeholder='Email' {
            ...register('email', {
                required: 'Username is required',
                minLength: {
                    value: 6,
                    message: 'Username must be at least 6 characters long'
                }
            })
        } 
        className='p-2 bg-gray-100 rounded'/>
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

        <input type="password" placeholder='Password'{
            ...register('password', {
                required: 'Password is required',
                minLength: {
                    value: 1,
                    message: 'Password must be at least 1 characters long'
                }
            })
        } 
        className='p-2 bg-gray-100 rounded'/>
        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        <p className='text-sm'>Not a User? <button  onClick={() => {signUp()}}className='underline font-bold'>Sign Up</button></p>
        <button type='submit' className='bg-black text-white rounded-md p-2 font-semibold'>Login</button>
        {location.state && <p>{location.state.message}</p>}
    </form>
    
  )
}
