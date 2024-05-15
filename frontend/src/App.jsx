import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ContextProvider from './contexts/ContextProvider'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Navigation from './components/Navigation'

function App() {

  return (
    <>
      <BrowserRouter>
        <ContextProvider>
          <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Landing/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/login' element={<Login/>} />
            </Route>

          </Routes>
        </ContextProvider>
      </BrowserRouter>


    </>
  )
}

export default App
