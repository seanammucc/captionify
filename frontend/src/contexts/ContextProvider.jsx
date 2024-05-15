import { createContext, useContext, useState } from 'react'


const Context = createContext(null)
export default function ContextProvider({children}) {
  const [drawer, setDrawer] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Context.Provider value={{drawer, setDrawer, loggedIn, setLoggedIn}}>
        {children}
    </Context.Provider>
  )
}
export function useContextProvider() {
  const res = useContext(Context)
    if (!res) {
        throw new Error('useContextProvider must be used within a ContextProvider')
    }
    return res
}