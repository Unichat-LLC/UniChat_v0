import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import Login from './pages/LoginPage'
import MainLayout from './components/MainLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={ <LandingPage />} />
        </Route>
        <Route path='/login' element={ <Login />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
