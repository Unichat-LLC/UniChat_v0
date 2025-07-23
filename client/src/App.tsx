import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import Login from './pages/LoginPage'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout'
import Profile from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import FAQ from './pages/faq'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes - no ChatProvider needed */}
          <Route element={<MainLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/faq' element={<FAQ />} />

          {/* Protected routes - wrap with ChatProvider */}
          <Route element={<ProtectedRoute />}>
            <Route 
              path="profile" 
              element={
                <ChatProvider>
                  <Profile />
                </ChatProvider>
              } 
            />
            <Route element={<DashboardLayout />}>
              <Route 
                path="dashboard" 
                element={
                  <ChatProvider>
                    <Dashboard />
                  </ChatProvider>
                } 
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider> 
  )
}

export default App
