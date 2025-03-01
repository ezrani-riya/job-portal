import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './styles/theme';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/adminDashboard';
import ApplicantDashboard from './pages/ApplicantDashboard';
import JobDetails from './pages/JobDetails';
import JobList from './pages/JobList';
import Profile from './pages/Profile';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <main style={{ flex: 1, paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<JobList />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/job/:id" element={<JobDetails />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute roles={['admin', 'super_admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/applicant/*" 
                    element={
                      <ProtectedRoute roles={['applicant']}>
                        <ApplicantDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;