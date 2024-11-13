import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import AuthCallback from './pages/AuthCallback';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProfileProvider, useProfile } from './contexts/ProfileContext';
import { Toaster } from 'react-hot-toast';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { profile, isLoading } = useProfile();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Show loading state while checking profile
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to onboarding if profile is not complete
  if (!profile && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" />;
  }

  // Redirect to dashboard if profile is complete and trying to access onboarding
  if (profile && location.pathname === '/onboarding') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/onboarding" element={
              <PrivateRoute>
                <OnboardingPage />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
          </Routes>
          <Toaster position="top-right" />
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;