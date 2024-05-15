import React, { useEffect, useState } from 'react'
import { checkToken } from '../utils/checkToken'
import { useNavigate } from 'react-router-dom'
import { useContextProvider } from '../contexts/ContextProvider'

export default function Dashboard() {
  const [sessionID, setSessionID] = useState('')
  const {setLoggedIn} = useContextProvider()
  const navigate = useNavigate()
  useEffect(() => {
    async function checkUserCredentials() {
      const response = await checkToken()
      const res = await response.json()
      if (!response.ok){
        navigate('/login', {state: {message: 'Please login to access this page'}})
        
      }
      else {
        setLoggedIn(true)
      }
      setSessionID(res.user.session_id)


    }
    checkUserCredentials()
    
  },[]);

  const handleOnClick = async () => {
    const response = await fetch('http://localhost:5000/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify({
        session_id:sessionID
      })
    
    
  })
  const res = await response.json()
  window.location.href = res.url
  }
  

  return (
    <div>
      <button onClick={() => {handleOnClick()}} className='bg-black rounded-lg px-4 py-2 text-white '>Manage Subscription</button>
    </div>
  )
}
