import axios from 'axios';

// Backend service URLs

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ||
'http://localhost:12000';

const USER_SERVICE_URL = process.env.NEXT_PUBLIC_USER_SERVICE_URL ||
'http://localhost:8001';

const CUSTOMER_SERVICE_URL =
process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_URL ||
'http://localhost:8003';

const SELLER_SERVICE_URL = process.env.NEXT_PUBLIC_SELLER_SERVICE_URL
|| 'http://localhost:8002';

const CATALOG_SERVICE_URL = process.env.NEXT_PUBLIC_CATALOG_SERVICE_URL
|| 'http://localhost:8004';

const ADMIN_SERVICE_URL = process.env.NEXT_PUBLIC_ADMIN_SERVICE_URL ||
'http://localhost:8005';

// Shop type definition

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
  imageUrl: string;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
  phone: string;
  whatsapp: string;
}

// Product type definition (ADDED THIS)

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  shopId: string;
  shopName: string;
  inStock: boolean;
  quantity: number;
  unit: string;
  rating: number;
  reviews: number;
}

// Search API types (ADDED THESE)

export interface SearchResponse {
  status: boolean;
  data: {
    shops: Shop[];
    products: Product[];
  };
  message?: string;
}

export interface SearchParams {
  query: string;
  category?: string;
  type?: 'all' | 'products' | 'shops';
}

// Create axios instances for each service

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userServiceClient = axios.create({
  baseURL: USER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const customerServiceClient = axios.create({
  baseURL: CUSTOMER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const sellerServiceClient = axios.create({
  baseURL: SELLER_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const catalogServiceClient = axios.create({
  baseURL: CATALOG_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth interceptor to all clients

const addAuthInterceptor = (client: any) => {
  client.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

// Apply auth interceptor to all clients

[apiClient, userServiceClient, customerServiceClient, sellerServiceClient, catalogServiceClient]
  .forEach(addAuthInterceptor);

// Mock data for fallback (when backend is not available)

const mockShops = [
  {
    id: 'shop1',
    name: 'Fresh Grocery Store',
    description: 'Your neighborhood grocery store with fresh produce and daily essentials',
    address: '123 Main Street, Downtown',
    latitude: 40.7128,
    longitude: -74.0060,
    distance: 0.5,
    distanceFormatted: '0.5 km',
    category: 'Grocery',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    openingTime: '08:00',
    closingTime: '22:00',
    phone: '+1234567890',
    whatsapp: '+1234567890'
  },
  {
    id: 'shop2',
    name: 'Tech Electronics Hub',
    description: 'Latest electronics, gadgets, and tech accessories',
    address: '456 Tech Avenue, Silicon Valley',
    latitude: 40.7589,
    longitude: -73.9851,
    distance: 1.2,
    distanceFormatted: '1.2 km',
    category: 'Electronics',
    rating: 4.3,
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1000&auto=format&fit=crop',
    isOpen: true,
    openingTime: '09:00',
    closingTime: '21:00',
    phone: '+1234567891',
    whatsapp: '+1234567891'
  },
  {
    id: 'shop3',
    name: 'Fashion Boutique',
    description: 'Trendy clothing and fashion accessories for all ages',
    address: '789 Fashion Street, Style District',
    latitude: 40.7505,
    longitude: -73.9934,
    distance: 2.1,
    distanceFormatted: '2.1 km',
    category: 'Fashion',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop',
    isOpen: false,
    openingTime: '10:00',
    closingTime: '20:00',
    phone: '+1234567892',
    whatsapp: '+1234567892'
  }
];

const mockProducts = [
  {
    id: 'product1',
    name: 'Fresh Organic Apples',
    description: 'Crisp and sweet organic apples, perfect for snacking or baking',
    price: 4.99,
    originalPrice: 5.99,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?q=80&w=1000&auto=format&fit=crop',
    shopId: 'shop1',
    shopName: 'Fresh Grocery Store',
    inStock: true,
    quantity: 50,
    unit: 'kg',
    rating: 4.6,
    reviews: 23
  },
  {
    id: 'product2',
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread, soft and nutritious',
    price: 2.99,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop',
    shopId: 'shop1',
    shopName: 'Fresh Grocery Store',
    inStock: true,
    quantity: 20,
    unit: 'loaf',
    rating: 4.4,
    reviews: 15
  },
  {
    id: 'product3',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 999.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop',
    shopId: 'shop2',
    shopName: 'Tech Electronics Hub',
    inStock: true,
    quantity: 5,
    unit: 'piece',
    rating: 4.8,
    reviews: 42
  },
  {
    id: 'product4',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1000&auto=format&fit=crop',
    shopId: 'shop2',
    shopName: 'Tech Electronics Hub',
    inStock: true,
    quantity: 12,
    unit: 'piece',
    rating: 4.5,
    reviews: 28
  },
  {
    id: 'product5',
    name: 'Designer T-Shirt',
    description: 'Premium cotton t-shirt with unique design',
    price: 29.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
    shopId: 'shop3',
    shopName: 'Fashion Boutique',
    inStock: true,
    quantity: 25,
    unit: 'piece',
    rating: 4.3,
    reviews: 18
  }
];

export function getMockProducts() {
  return mockProducts;
}

// Helper function to handle API calls with fallback to mock data

const apiCallWithFallback = async (apiCall: () => Promise<any>, fallbackData: any) => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.warn('API call failed, using mock data:', error);
    return { data: fallbackData };
  }
};

// ADDED SEARCH API - This is what your SearchPageContent needs

export const searchAPI = {
  search: async (params: SearchParams): Promise<SearchResponse> => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (params.query) queryParams.append('q', params.query);
      if (params.category) queryParams.append('category', params.category);
      if (params.type) queryParams.append('type', params.type);

      // Try to make API call first
      try {
        const response = await apiClient.get(`/search?${queryParams.toString()}`);
        return response.data;
      } catch (error) {
        console.warn('Search API call failed, using mock data:', error);
       
        // Fallback to mock data with filtering
        let filteredShops = mockShops;
        let filteredProducts = mockProducts;

        // Filter by query
        if (params.query) {
          const query = params.query.toLowerCase();
          filteredShops = mockShops.filter(shop =>
            shop.name.toLowerCase().includes(query) ||
            shop.description.toLowerCase().includes(query) ||
            shop.category.toLowerCase().includes(query)
          );
          filteredProducts = mockProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
          );
        }

        // Filter by category
        if (params.category && params.category !== 'All Categories') {
          filteredShops = filteredShops.filter(shop =>
            shop.category === params.category
          );
          filteredProducts = filteredProducts.filter(product =>
            product.category === params.category
          );
        }

        // Filter by type
        if (params.type === 'shops') {
          filteredProducts = [];
        } else if (params.type === 'products') {
          filteredShops = [];
        }

        return {
          status: true,
          data: {
            shops: filteredShops,
            products: filteredProducts
          }
        };
      }
    } catch (error) {
      console.error('Search error:', error);
      return {
        status: false,
        data: {
          shops: [],
          products: []
        },
        message: 'Search failed. Please try again.'
      };
    }
  }
};

// API functions

export const api = {
  // Authentication
  auth: {
    login: async (firebaseToken: string) => {
      return apiCallWithFallback(
        () => userServiceClient.post('/auth/login', { firebase_token: firebaseToken }),
        {
          access_token: 'mock_token_' + Date.now(),
          token_type: 'bearer',
          user_id: 'user1',
          role: 'customer'
        }
      );
    },
    register: async (userData: any) => {
      return apiCallWithFallback(
        () => userServiceClient.post('/auth/register', userData),
        {
          id: 'user_' + Date.now(),
          ...userData
        }
      );
    },
    verifyToken: async () => {
      return apiCallWithFallback(
        () => userServiceClient.get('/auth/verify-token'),
        {
          user_id: 'user1',
          role: 'customer',
          name: 'John Doe',
          email: 'john@example.com'
        }
      );
    },
    refreshToken: async () => {
      return apiCallWithFallback(
        () => userServiceClient.post('/auth/refresh-token'),
        {
          access_token: 'mock_token_' + Date.now(),
          token_type: 'bearer'
        }
      );
    }
  },

  // Shops
  shops: {
    getNearby: async (latitude: number, longitude: number, radius = 10) => {
      return apiCallWithFallback(
        () => customerServiceClient.get(`/shops/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`),
        {
          shops: mockShops,
          total: mockShops.length,
          page: 1,
          page_size: 10,
          location: { latitude, longitude }
        }
      );
    },
    search: async (query: string, latitude?: number, longitude?: number) => {
      let url = `/shops/search?query=${encodeURIComponent(query)}`;
      if (latitude && longitude) {
        url += `&latitude=${latitude}&longitude=${longitude}`;
      }
     
      return apiCallWithFallback(
        () => customerServiceClient.get(url),
        {
          shops: mockShops.filter(shop =>
            shop.name.toLowerCase().includes(query.toLowerCase()) ||
            shop.description.toLowerCase().includes(query.toLowerCase())
          ),
          total: mockShops.length,
          page: 1,
          page_size: 10
        }
      );
    },
    getById: async (shopId: string) => {
      return apiCallWithFallback(
        () => customerServiceClient.get(`/shops/${shopId}`),
        mockShops.find(s => s.id === shopId) || mockShops[0]
      );
    },
    getProducts: async (shopId: string) => {
      return apiCallWithFallback(
        () => customerServiceClient.get(`/shops/${shopId}/products`),
        {
          products: mockProducts.filter(p => p.shopId === shopId),
          total: mockProducts.filter(p => p.shopId === shopId).length
        }
      );
    }
  },

  // Products
  products: {
    getById: async (productId: string) => {
      return apiCallWithFallback(
        () => apiClient.get(`/products/${productId}`),
        mockProducts.find(p => p.id === productId) || mockProducts[0]
      );
    },
    search: async (query: string, category?: string) => {
      let url = `/products/search?query=${encodeURIComponent(query)}`;
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
     
      return apiCallWithFallback(
        () => apiClient.get(url),
        {
          products: mockProducts.filter(product => {
            const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) ||
                                product.description.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = !category || product.category === category;
            return matchesQuery && matchesCategory;
          }),
          total: mockProducts.length
        }
      );
    }
  },

  // Seller/Vendor
  seller: {
    getShop: async () => {
      return apiCallWithFallback(
        () => sellerServiceClient.get('/shops/my-shop'),
        mockShops[0]
      );
    },
    updateShop: async (shopData: any) => {
      return apiCallWithFallback(
        () => sellerServiceClient.put('/shops/my-shop', shopData),
        { ...mockShops[0], ...shopData }
      );
    },
    createShop: async (shopData: any) => {
      return apiCallWithFallback(
        () => sellerServiceClient.post('/shops', shopData),
        { id: 'shop_' + Date.now(), ...shopData }
      );
    },
    getProducts: async () => {
      return apiCallWithFallback(
        () => sellerServiceClient.get('/inventory/products'),
        {
          products: mockProducts.slice(0, 3),
          total: 3
        }
      );
    },
    addProduct: async (productData: any) => {
      return apiCallWithFallback(
        () => sellerServiceClient.post('/inventory/products', productData),
        {
          id: 'product_' + Date.now(),
          ...productData,
          shopId: 'shop1',
          shopName: 'My Shop'
        }
      );
    },
    updateProduct: async (productId: string, productData: any) => {
      return apiCallWithFallback(
        () => sellerServiceClient.put(`/inventory/products/${productId}`, productData),
        { id: productId, ...productData }
      );
    },
    deleteProduct: async (productId: string) => {
      return apiCallWithFallback(
        () => sellerServiceClient.delete(`/inventory/products/${productId}`),
        { message: 'Product deleted successfully' }
      );
    }
  },

  // Catalog
  catalog: {
    getItems: async (search?: string, category?: string) => {
      let url = '/items';
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (params.toString()) url += `?${params.toString()}`;
     
      return apiCallWithFallback(
        () => catalogServiceClient.get(url),
        mockProducts
      );
    },
    getCategories: async () => {
      return apiCallWithFallback(
        () => catalogServiceClient.get('/categories'),
        [
          'Electronics',
          'Grocery',
          'Fashion',
          'Dairy',
          'Bakery',
          'Fruits',
          'Vegetables',
          'Clothing'
        ]
      );
    }
  },

  // Categories (fallback to API Gateway)
  categories: {
    getAll: async () => {
      return apiCallWithFallback(
        () => apiClient.get('/catalog/categories'),
        [
          'Electronics',
          'Grocery',
          'Fashion',
          'Dairy',
          'Bakery',
          'Fruits',
          'Vegetables',
          'Clothing'
        ]
      );
    }
  }
};

// productAPI - Fixed version with all required functions
export const productAPI = {
  getById: async (productId: string) => {
    return api.products.getById(productId);
  },
  
  search: async (query: string, category?: string) => {
    return api.products.search(query, category);
  },
  
  // This is what your shop page is looking for
  getShopProducts: async (shopId: string) => {
    return api.shops.getProducts(shopId);
  }
};

// shopAPI - Fixed version with all required functions
export const shopAPI = {
  getAllShops: async (lat?: number, lng?: number) => {
    try {
      let response;
      if (lat && lng) {
        response = await api.shops.getNearby(lat, lng);
      } else {
        // Return all mock shops if no location provided
        response = { data: { shops: mockShops }, status: true };
      }
     
      return {
        status: true,
        data: response.data.shops || response.data || mockShops
      };
    } catch (error) {
      console.error('Error in getAllShops:', error);
      return {
        status: true,
        data: mockShops // Return mock data as fallback
      };
    }
  },

  // This is what your shop page is looking for
  getShopById: async (shopId: string) => {
    return api.shops.getById(shopId);
  }
};

export default api;