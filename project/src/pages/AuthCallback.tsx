import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // If user is authenticated, redirect to dashboard or onboarding
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600">Verification Failed</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 text-blue-600 hover:text-blue-500"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">
            Verifying your email...
          </h2>
          <p className="mt-2 text-gray-600">
            Please wait while we complete the verification process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;