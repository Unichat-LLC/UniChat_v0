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
import About from './pages/About'
import Resources from './pages/Resources'
import Pricing from './pages/Pricing'
import ContactUs from './pages/Contact'

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
          <Route path='/about' element={<About />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/contact' element={<ContactUs />} />
          
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
            
            <Route element={
              <ChatProvider>
                <DashboardLayout />
              </ChatProvider>
              }>
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
