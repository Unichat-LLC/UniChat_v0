import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import Login from './pages/LoginPage'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={ <LandingPage />} />
        </Route>
        
        <Route path='/login' element={ <Login />} />

        {/* Dashboard elements layout */}
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
