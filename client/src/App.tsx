import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import Login from './pages/LoginPage'
import Signup from './pages/ProfilePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <HomePage />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
