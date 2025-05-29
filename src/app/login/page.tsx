'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithGoogle } from '@/lib/firebase';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'seller':
          router.push('/seller');
          break;
        default:
          router.push('/');
      }
    }
  }, [user, router]);

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(phoneNumber);
      setSuccess('Login successful! Redirecting...');
    } catch (error) {
      console.error('Phone login failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithGoogle();
      if (result.user) {
        // Extract phone number or use email as fallback
        const phone = result.user.phoneNumber || result.user.email || 'google_user';
        await login(phone);
        setSuccess('Google login successful! Redirecting...');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Loader fullScreen text="Redirecting..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Sign in to LocalMarket
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connect with local businesses in your area
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Phone Login Form */}
          <form onSubmit={handlePhoneLogin} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                We'll send you an OTP to verify your number
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in with Phone'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Google Login */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              Sign in with Google
            </button>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts</h3>
            <div className="space-y-2">
              <button
                onClick={() => setPhoneNumber('1234567890')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Customer:</span> 1234567890
              </button>
              <button
                onClick={() => setPhoneNumber('9876543210')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Seller:</span> 9876543210
              </button>
              <button
                onClick={() => setPhoneNumber('5555555555')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">Admin:</span> 5555555555
              </button>
            </div>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:text-blue-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <ErrorPopup
        message={error}
        type="error"
        isVisible={!!error}
        onClose={() => setError('')}
      />

      <ErrorPopup
        message={success}
        type="success"
        isVisible={!!success}
        onClose={() => setSuccess('')}
      />
    </div>
  );
};

export default LoginPage;