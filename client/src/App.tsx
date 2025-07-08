import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import Login from './pages/LoginPage'
import Signup from './pages/ProfilePage'
import MainLayout from './components/MainLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={ <LandingPage />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
