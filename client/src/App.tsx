import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import Login from './pages/LoginPage'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Profile from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={ <LandingPage />} />
          </Route>
          
          <Route path='/login' element={ <Login />} />
          {/* profile is protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />

              <Route element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider> 
  )
}

export default App
