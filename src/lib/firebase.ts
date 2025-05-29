import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Mock Firebase functions for development
export const mockSignInWithGoogle = async () => {
  return {
    user: {
      uid: 'mock_uid_' + Date.now(),
      email: 'user@example.com',
      displayName: 'Mock User',
      phoneNumber: '+1234567890',
    },
    credential: null,
  };
};

export const mockSignInWithPhone = async (phoneNumber: string) => {
  return {
    user: {
      uid: 'mock_uid_' + Date.now(),
      phoneNumber: phoneNumber,
      email: null,
      displayName: 'Phone User',
    },
    credential: null,
  };
};

export const mockGetIdToken = async () => {
  return 'mock_firebase_token_' + Date.now();
};

// For production, use real Firebase functions
export const signInWithGoogle = async () => {
  if (process.env.NODE_ENV === 'development') {
    return mockSignInWithGoogle();
  }
  return signInWithPopup(auth, googleProvider);
};

export const signInWithPhone = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  if (process.env.NODE_ENV === 'development') {
    return mockSignInWithPhone(phoneNumber);
  }
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

export const getCurrentUserToken = async () => {
  if (process.env.NODE_ENV === 'development') {
    return mockGetIdToken();
  }
  
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  const user = auth.currentUser;
  if (user) {
    return user.getIdToken();
  }
  return null;
};