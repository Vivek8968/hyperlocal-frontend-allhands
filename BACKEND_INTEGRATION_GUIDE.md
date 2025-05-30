# Backend Integration Guide

This guide will help you completely connect the frontend with the existing FastAPI backend.

## 🏗️ Backend Architecture Overview

The backend uses a **microservices architecture** with the following services:

- **API Gateway**: `api_gateway.py` (Port 12000) - Currently has mock data
- **User Service**: Port 8001 - Authentication, user management
- **Seller Service**: Port 8002 - Shop management, inventory
- **Customer Service**: Port 8003 - Shop discovery, search
- **Catalog Service**: Port 8004 - Product catalog
- **Admin Service**: Port 8005 - Admin operations

## 📋 Step-by-Step Integration

### Step 1: Set Up Backend Environment

1. **Clone and set up the backend**:
```bash
git clone https://github.com/Vivek8968/hyperlocalbymanus.git
cd hyperlocalbymanus
pip install -r requirements.txt
```

2. **Create `.env` file in backend root**:
```env
# Database
DB_TYPE=sqlite
DB_PATH=/workspace/localmarket/hyperlocal.db

# JWT
JWT_SECRET_KEY=your-super-secret-jwt-key-here

# Firebase (get from Firebase Console)
FIREBASE_CREDENTIALS=path/to/firebase-credentials.json

# AWS S3 (optional for image uploads)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
S3_BUCKET_NAME=your-bucket-name

# Service Ports
USER_SERVICE_PORT=8001
SELLER_SERVICE_PORT=8002
CUSTOMER_SERVICE_PORT=8003
CATALOG_SERVICE_PORT=8004
ADMIN_SERVICE_PORT=8005
```

3. **Start the services**:
```bash
# Terminal 1 - API Gateway (with mock data for testing)
python api_gateway.py

# Terminal 2 - User Service
python run_service.py user

# Terminal 3 - Customer Service
python run_service.py customer

# Terminal 4 - Seller Service
python run_service.py seller

# Terminal 5 - Catalog Service
python run_service.py catalog

# Terminal 6 - Admin Service
python run_service.py admin
```

### Step 2: Configure Firebase Authentication

1. **Set up Firebase project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing
   - Enable Authentication
   - Enable Google and Phone authentication providers
   - Get your Firebase config

2. **Update frontend `.env.local`**:
```env
# Backend URLs
NEXT_PUBLIC_BACKEND_URL=http://localhost:12000
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8001
NEXT_PUBLIC_CUSTOMER_SERVICE_URL=http://localhost:8003
NEXT_PUBLIC_SELLER_SERVICE_URL=http://localhost:8002
NEXT_PUBLIC_CATALOG_SERVICE_URL=http://localhost:8004
NEXT_PUBLIC_ADMIN_SERVICE_URL=http://localhost:8005

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Step 3: Update API Client

Replace the current mock API client with real backend integration:

```typescript
// src/lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:12000';
const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:8001';
const CUSTOMER_SERVICE_URL = process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL || 'http://localhost:8003';
const SELLER_SERVICE_URL = process.env.NEXT_PUBLIC_SELLER_SERVICE_URL || 'http://localhost:8002';
const CATALOG_SERVICE_URL = process.env.NEXT_PUBLIC_CATALOG_SERVICE_URL || 'http://localhost:8004';

// Create axios instances for each service
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const userServiceClient = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000,
});

const customerServiceClient = axios.create({
  baseURL: CUSTOMER_SERVICE_URL,
  timeout: 10000,
});

const sellerServiceClient = axios.create({
  baseURL: SELLER_SERVICE_URL,
  timeout: 10000,
});

const catalogServiceClient = axios.create({
  baseURL: CATALOG_SERVICE_URL,
  timeout: 10000,
});

// Add auth interceptor
const addAuthInterceptor = (client: any) => {
  client.interceptors.request.use((config: any) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Apply auth interceptor to all clients
[apiClient, userServiceClient, customerServiceClient, sellerServiceClient, catalogServiceClient]
  .forEach(addAuthInterceptor);

// API Functions
export const api = {
  // Authentication
  auth: {
    register: (userData: any) => userServiceClient.post('/auth/register', userData),
    login: (firebaseToken: string) => userServiceClient.post('/auth/login', { firebase_token: firebaseToken }),
    verifyToken: () => userServiceClient.get('/auth/verify-token'),
    refreshToken: () => userServiceClient.post('/auth/refresh-token'),
  },

  // Shops
  shops: {
    getNearby: (latitude: number, longitude: number, radius = 10) => 
      customerServiceClient.get(`/shops/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`),
    search: (query: string, latitude?: number, longitude?: number) => {
      let url = `/shops/search?query=${encodeURIComponent(query)}`;
      if (latitude && longitude) {
        url += `&latitude=${latitude}&longitude=${longitude}`;
      }
      return customerServiceClient.get(url);
    },
    getById: (shopId: string) => customerServiceClient.get(`/shops/${shopId}`),
    getProducts: (shopId: string) => customerServiceClient.get(`/shops/${shopId}/products`),
  },

  // Seller/Vendor
  seller: {
    getShop: () => sellerServiceClient.get('/shops/my-shop'),
    updateShop: (shopData: any) => sellerServiceClient.put('/shops/my-shop', shopData),
    createShop: (shopData: any) => sellerServiceClient.post('/shops', shopData),
    getProducts: () => sellerServiceClient.get('/inventory/products'),
    addProduct: (productData: any) => sellerServiceClient.post('/inventory/products', productData),
    updateProduct: (productId: string, productData: any) => 
      sellerServiceClient.put(`/inventory/products/${productId}`, productData),
    deleteProduct: (productId: string) => sellerServiceClient.delete(`/inventory/products/${productId}`),
  },

  // Catalog
  catalog: {
    getItems: (search?: string, category?: string) => {
      let url = '/items';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (params.toString()) url += `?${params.toString()}`;
      return catalogServiceClient.get(url);
    },
    getCategories: () => catalogServiceClient.get('/categories'),
  },

  // Products
  products: {
    getById: (productId: string) => apiClient.get(`/products/${productId}`),
    search: (query: string, category?: string) => {
      let url = `/products/search?query=${encodeURIComponent(query)}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      return apiClient.get(url);
    },
  },
};

export default api;
```

### Step 4: Update Firebase Configuration

Replace mock Firebase with real Firebase:

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from 'firebase/auth';

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

// Phone authentication
export const setupRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
  });
};

export const sendOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Google authentication
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export default app;
```

### Step 5: Update Authentication Context

```typescript
// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { api } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  login: (firebaseUser: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          
          // Send to backend for verification and get user role
          const response = await api.auth.login(idToken);
          const { access_token, role } = response.data.data;
          
          // Store token and role
          localStorage.setItem('authToken', access_token);
          setUser(firebaseUser);
          setUserRole(role);
        } catch (error) {
          console.error('Error verifying user with backend:', error);
          setUser(null);
          setUserRole(null);
        }
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('authToken');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (firebaseUser: User) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      const response = await api.auth.login(idToken);
      const { access_token, role } = response.data.data;
      
      localStorage.setItem('authToken', access_token);
      setUser(firebaseUser);
      setUserRole(role);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('authToken');
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Step 6: Update Page Components

Update your page components to use the real API:

```typescript
// Example: src/app/page.tsx (Homepage)
'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function HomePage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyShops();
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    }
  };

  const fetchNearbyShops = async () => {
    if (!location) return;
    
    try {
      const response = await api.shops.getNearby(location.latitude, location.longitude);
      setShops(response.data.data.shops || []);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component...
}
```

### Step 7: Error Handling

Add proper error handling for API responses:

```typescript
// src/lib/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // Unauthorized - redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        break;
      case 403:
        // Forbidden
        throw new Error('Access denied');
      case 404:
        // Not found
        throw new Error('Resource not found');
      case 500:
        // Server error
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(data?.message || 'An error occurred');
    }
  } else if (error.request) {
    // Network error
    throw new Error('Network error. Please check your connection.');
  } else {
    // Other error
    throw new Error(error.message || 'An unexpected error occurred');
  }
};
```

### Step 8: Testing the Integration

1. **Start the backend services**
2. **Start the frontend**: `npm run dev`
3. **Test the following flows**:
   - User registration/login with Firebase
   - Location-based shop discovery
   - Shop and product browsing
   - Seller dashboard functionality
   - Search functionality

### Step 9: Production Deployment

For production deployment:

1. **Update environment variables** for production URLs
2. **Set up proper CORS** in backend services
3. **Configure Firebase** for production domain
4. **Set up SSL certificates**
5. **Configure load balancers** if needed

## 🔧 API Endpoint Mapping

| Frontend Function | Backend Service | Endpoint |
|------------------|----------------|----------|
| User Login | User Service | `POST /auth/login` |
| Get Nearby Shops | Customer Service | `GET /shops/nearby` |
| Search Shops | Customer Service | `GET /shops/search` |
| Get Shop Details | Customer Service | `GET /shops/{id}` |
| Seller Dashboard | Seller Service | `GET /shops/my-shop` |
| Add Product | Seller Service | `POST /inventory/products` |
| Get Categories | Catalog Service | `GET /categories` |

## 🚨 Common Issues & Solutions

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domain
2. **Authentication Failures**: Check Firebase configuration and JWT secret
3. **Service Connection**: Verify all microservices are running on correct ports
4. **Database Issues**: Ensure database is set up and migrations are run

## 📝 Next Steps

1. Replace mock data with real backend calls
2. Implement proper error handling
3. Add loading states
4. Test all user flows
5. Set up monitoring and logging
6. Optimize API calls and caching

This guide provides a complete roadmap for integrating your frontend with the existing backend. Follow each step carefully and test thoroughly at each stage.