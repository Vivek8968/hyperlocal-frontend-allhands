import axios from 'axios';
import { getCurrentUserToken } from './firebase';
import { 
  mockUsers, 
  mockShops, 
  mockProducts, 
  getMockShops, 
  getMockProducts, 
  getMockProductsByShop, 
  getMockProductsByCategory,
  searchMockData 
} from '@/data/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
const USE_MOCK_DATA = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_BACKEND_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await getCurrentUserToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Mock API helper
const createMockResponse = <T>(data: T, message = 'Success') => ({
  status: true,
  message,
  data
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin';
  isActive?: boolean;
  createdAt?: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  distanceFormatted?: string;
  category: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  logo?: string;
  ownerId: string;
  owner?: string;
  phone?: string;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  status?: 'active' | 'pending' | 'suspended';
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  shopId: string;
  inStock: boolean;
  quantity: number;
  unit: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  suggestedPrice: number;
  unit: string;
}

// Auth API
export const authAPI = {
  register: async (userData: Partial<User>) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      // Mock registration - create a new user
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email || '',
        phone: userData.phone || '',
        role: userData.role || 'customer'
      };
      const token = `mock_token_${newUser.id}`;
      return createMockResponse({ token, user: newUser });
    }
    return api.post('/auth/register', userData);
  },
  
  login: async (phone: string) => {
    if (USE_MOCK_DATA) {
      await delay(500);
      // Find user by phone in mock data
      const user = mockUsers.find(u => u.phone === phone);
      if (user) {
        const token = `mock_token_${user.id}`;
        return createMockResponse({ token, user });
      } else {
        throw new Error('User not found');
      }
    }
    return api.post('/auth/login', { phone });
  },
  
  verifyToken: async () => {
    if (USE_MOCK_DATA) {
      await delay(200);
      // Mock token verification - always return success for development
      return createMockResponse({ valid: true });
    }
    return api.post('/auth/verify-token');
  },
};

// User API
export const userAPI = {
  getCurrentUser: async () => {
    if (USE_MOCK_DATA) {
      await delay(300);
      // Get current user from localStorage token
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token && token.startsWith('mock_token_')) {
        const userId = token.replace('mock_token_', '');
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          return createMockResponse(user);
        }
      }
      throw new Error('User not found');
    }
    return api.get('/users/me');
  },
  
  updateProfile: async (userData: Partial<User>) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      // Mock profile update
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (token && token.startsWith('mock_token_')) {
        const userId = token.replace('mock_token_', '');
        const user = mockUsers.find(u => u.id === userId);
        if (user) {
          const updatedUser = { ...user, ...userData };
          return createMockResponse(updatedUser);
        }
      }
      throw new Error('User not found');
    }
    return api.put('/users/me', userData);
  },
};

// Shop API
export const shopAPI = {
  getAllShops: async (latitude?: number, longitude?: number) => {
    if (USE_MOCK_DATA) {
      await delay(500); // Simulate network delay
      const shops = getMockShops(latitude, longitude);
      return createMockResponse(shops);
    }
    return api.get('/shops', { params: { latitude, longitude } });
  },
  getShopById: async (shopId: string) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const shop = mockShops.find(s => s.id === shopId);
      if (shop) {
        return createMockResponse(shop);
      } else {
        throw new Error('Shop not found');
      }
    }
    return api.get(`/shops/${shopId}`);
  },
  createShop: (shopData: Partial<Shop>) => api.post('/shops', shopData),
  updateShop: (shopId: string, shopData: Partial<Shop>) => 
    api.put(`/shops/${shopId}`, shopData),
};

// Product API
export const productAPI = {
  getShopProducts: async (shopId: string, params?: { search?: string; category?: string; sort?: string }) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const products = getMockProductsByShop(shopId);
      return createMockResponse(products);
    }
    return api.get(`/shops/${shopId}/products`, { params });
  },
  getProductById: async (productId: string) => {
    if (USE_MOCK_DATA) {
      await delay(300);
      const product = mockProducts.find(p => p.id === productId);
      if (product) {
        return createMockResponse(product);
      } else {
        throw new Error('Product not found');
      }
    }
    return api.get(`/products/${productId}`);
  },
  getProductsByCategory: async (category: string) => {
    if (USE_MOCK_DATA) {
      await delay(400);
      const products = getMockProductsByCategory(category);
      return createMockResponse(products);
    }
    return api.get('/products', { params: { category } });
  },
  addProductToShop: (shopId: string, productData: Partial<Product>) =>
    api.post(`/shops/${shopId}/products`, productData),
  updateProduct: (shopId: string, productId: string, productData: Partial<Product>) =>
    api.put(`/shops/${shopId}/products/${productId}`, productData),
  deleteProduct: (shopId: string, productId: string) =>
    api.delete(`/shops/${shopId}/products/${productId}`),
};

// Catalog API
export const catalogAPI = {
  getCatalogItems: (params?: { search?: string; category?: string }) =>
    api.get('/catalog', { params }),
  getCategories: () => api.get('/catalog/categories'),
};

// Search API
export const searchAPI = {
  search: async (params: { query?: string; category?: string; type?: 'all' | 'products' | 'shops' }) => {
    if (USE_MOCK_DATA) {
      await delay(600);
      const results = searchMockData(params);
      return createMockResponse(results);
    }
    return api.get('/search', { params });
  }
};

// Seller API
export const sellerAPI = {
  getSellerShop: async () => {
    if (USE_MOCK_DATA) {
      await delay(400);
      // Return first shop as seller's shop
      const shop = mockShops[0];
      return createMockResponse(shop);
    }
    return api.get('/seller/shop');
  },
  getSellerProducts: async () => {
    if (USE_MOCK_DATA) {
      await delay(400);
      // Return products from first shop
      const products = getMockProductsByShop('1');
      return createMockResponse(products);
    }
    return api.get('/seller/products');
  },
  createShop: (shopData: Partial<Shop>) => api.post('/seller/shop', shopData),
  updateShop: (shopData: Partial<Shop>) => api.put('/seller/shop', shopData),
  addProduct: (productData: Partial<Product>) => api.post('/seller/products', productData),
  updateProduct: (productId: string, productData: Partial<Product>) => 
    api.put(`/seller/products/${productId}`, productData),
  deleteProduct: (productId: string) => api.delete(`/seller/products/${productId}`),
};

// Vendor API (legacy)
export const vendorAPI = {
  getVendorShop: () => api.get('/vendor/shop'),
  getVendorProducts: () => api.get('/vendor/products'),
  addProductFromCatalog: (data: { catalogId: string; shopId: string; quantity: number }) =>
    api.post('/vendor/products/add-from-catalog', data),
  updateVendorShop: (shopData: Partial<Shop>) => api.put('/vendor/shop', shopData),
};

export default api;