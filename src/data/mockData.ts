import { Shop, Product, User } from '@/lib/api';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    phone: '1234567890',
    name: 'John Customer',
    email: 'john@example.com',
    role: 'customer',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    phone: '9876543210',
    name: 'Sarah Seller',
    email: 'sarah@example.com',
    role: 'seller',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    phone: '5555555555',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Mock Shops
export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'TechWorld Electronics',
    description: 'Your one-stop shop for all electronic gadgets and accessories',
    address: '123 Main Street, Downtown, City 12345',
    latitude: 40.7128,
    longitude: -74.0060,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    rating: 4.5,
    reviewCount: 128,
    isOpen: true,
    openingTime: '09:00',
    closingTime: '21:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'active',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '0.5 km'
  },
  {
    id: '2',
    name: 'Fresh Mart Grocery',
    description: 'Fresh groceries, fruits, and vegetables delivered daily',
    address: '456 Oak Avenue, Suburb, City 12346',
    latitude: 40.7589,
    longitude: -73.9851,
    category: 'Grocery',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop',
    rating: 4.2,
    reviewCount: 89,
    isOpen: true,
    openingTime: '07:00',
    closingTime: '22:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'active',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '1.2 km'
  },
  {
    id: '3',
    name: 'Fashion Hub',
    description: 'Trendy clothing and accessories for all ages',
    address: '789 Fashion Street, Mall Area, City 12347',
    latitude: 40.7505,
    longitude: -73.9934,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=100&h=100&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    isOpen: false,
    openingTime: '10:00',
    closingTime: '20:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'pending',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '2.1 km'
  },
  {
    id: '4',
    name: 'Daily Dairy',
    description: 'Fresh milk, cheese, and dairy products',
    address: '321 Dairy Lane, Residential, City 12348',
    latitude: 40.7282,
    longitude: -74.0776,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop',
    rating: 4.3,
    reviewCount: 67,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '20:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'active',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '0.8 km'
  },
  {
    id: '5',
    name: 'Sweet Bakery',
    description: 'Freshly baked bread, cakes, and pastries',
    address: '654 Baker Street, Old Town, City 12349',
    latitude: 40.7614,
    longitude: -73.9776,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
    rating: 4.8,
    reviewCount: 203,
    isOpen: true,
    openingTime: '05:00',
    closingTime: '19:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'pending',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '1.5 km'
  },
  {
    id: '6',
    name: 'Green Vegetables',
    description: 'Organic and fresh vegetables from local farms',
    address: '987 Green Street, Farm Area, City 12350',
    latitude: 40.7831,
    longitude: -73.9712,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
    logo: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop',
    rating: 4.4,
    reviewCount: 91,
    isOpen: true,
    openingTime: '06:00',
    closingTime: '18:00',
    ownerId: '2',
    owner: 'Sarah Seller',
    phone: '9876543210',
    status: 'active',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    distanceFormatted: '3.2 km'
  }
];

// Mock Categories
export const mockCategories = [
  'Electronics',
  'Grocery', 
  'Fashion',
  'Dairy',
  'Bakery',
  'Fruits',
  'Vegetables',
  'Home & Garden',
  'Sports',
  'Books'
];

// Mock Products
export const mockProducts: Product[] = [
  // Electronics
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 99999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 5,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Samsung 55" 4K TV',
    description: 'Ultra HD Smart TV with HDR and built-in streaming apps',
    price: 45999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 3,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    description: 'Lightweight laptop with M2 chip and all-day battery life',
    price: 119900,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 2,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Wireless Headphones',
    description: 'Noise-cancelling wireless headphones with premium sound',
    price: 8999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 10,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // Grocery
  {
    id: '5',
    name: 'Organic Basmati Rice',
    description: 'Premium quality organic basmati rice, 5kg pack',
    price: 450,
    category: 'Grocery',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 50,
    unit: 'kg',
    shopId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Fresh Bananas',
    description: 'Sweet and ripe bananas, perfect for breakfast',
    price: 60,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 100,
    unit: 'kg',
    shopId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread, healthy and nutritious',
    price: 45,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 20,
    unit: 'loaf',
    shopId: '5',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // Fashion
  {
    id: '8',
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt available in multiple colors',
    price: 599,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 25,
    unit: 'piece',
    shopId: '3',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '9',
    name: 'Denim Jeans',
    description: 'Classic blue denim jeans with perfect fit',
    price: 1299,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 15,
    unit: 'piece',
    shopId: '3',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // Dairy
  {
    id: '10',
    name: 'Fresh Milk',
    description: 'Pure and fresh cow milk, 1 liter pack',
    price: 55,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 100,
    unit: 'liter',
    shopId: '4',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '11',
    name: 'Cheddar Cheese',
    description: 'Aged cheddar cheese, perfect for sandwiches',
    price: 350,
    category: 'Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 30,
    unit: 'pack',
    shopId: '4',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // Vegetables
  {
    id: '12',
    name: 'Fresh Tomatoes',
    description: 'Red ripe tomatoes, perfect for cooking',
    price: 40,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 80,
    unit: 'kg',
    shopId: '6',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '13',
    name: 'Green Spinach',
    description: 'Fresh organic spinach leaves, rich in iron',
    price: 30,
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 50,
    unit: 'kg',
    shopId: '6',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // More Electronics
  {
    id: '14',
    name: 'Gaming Console',
    description: 'Latest gaming console with 4K gaming support',
    price: 49999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
    inStock: false,
    quantity: 0,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '15',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with deep bass',
    price: 2999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 8,
    unit: 'piece',
    shopId: '1',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // More Bakery
  {
    id: '16',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake perfect for celebrations',
    price: 899,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 5,
    unit: 'piece',
    shopId: '5',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '17',
    name: 'Croissants',
    description: 'Buttery and flaky French croissants',
    price: 120,
    category: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab794f4afe5e?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 12,
    unit: 'piece',
    shopId: '5',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // More Fruits
  {
    id: '18',
    name: 'Fresh Apples',
    description: 'Crisp and sweet red apples',
    price: 180,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 60,
    unit: 'kg',
    shopId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '19',
    name: 'Orange Juice',
    description: 'Fresh squeezed orange juice, 1 liter',
    price: 120,
    category: 'Fruits',
    imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 25,
    unit: 'liter',
    shopId: '2',
    createdAt: '2024-01-01T00:00:00Z'
  },

  // More Fashion
  {
    id: '20',
    name: 'Summer Dress',
    description: 'Light and comfortable summer dress',
    price: 1899,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    inStock: true,
    quantity: 10,
    unit: 'piece',
    shopId: '3',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Helper functions to simulate API responses
export const getMockShops = (lat?: number, lng?: number): Shop[] => {
  // If location provided, calculate distances and sort by proximity
  if (lat && lng) {
    return mockShops.map(shop => ({
      ...shop,
      distanceFormatted: `${(Math.random() * 5).toFixed(1)} km`
    })).sort(() => Math.random() - 0.5);
  }
  return mockShops;
};

export const getMockProducts = (): Product[] => {
  return mockProducts;
};

export const getMockProductsByShop = (shopId: string): Product[] => {
  return mockProducts.filter(product => product.shopId === shopId);
};

export const getMockProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const searchMockData = (params: {
  query?: string;
  category?: string;
  type?: 'all' | 'products' | 'shops';
}) => {
  const { query, category, type = 'all' } = params;
  
  let filteredShops = mockShops;
  let filteredProducts = mockProducts;

  // Filter by query
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredShops = filteredShops.filter(shop => 
      shop.name.toLowerCase().includes(searchTerm) ||
      shop.description.toLowerCase().includes(searchTerm) ||
      shop.category.toLowerCase().includes(searchTerm)
    );
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by category
  if (category) {
    filteredShops = filteredShops.filter(shop => shop.category === category);
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  // Filter by type
  if (type === 'shops') {
    filteredProducts = [];
  } else if (type === 'products') {
    filteredShops = [];
  }

  return {
    shops: filteredShops,
    products: filteredProducts
  };
};