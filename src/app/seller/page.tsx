'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Store, Package, Plus, Edit, Eye, TrendingUp, Users, DollarSign } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { useAuth } from '@/contexts/AuthContext';
import { sellerAPI, Shop, Product } from '@/lib/api';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalViews: 0,
    totalInquiries: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchSellerData();
    }
  }, [user]);

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      
      // Fetch seller's shop
      const shopResponse = await sellerAPI.getSellerShop();
      if (shopResponse.status) {
        setShop(shopResponse.data);
        
        // Fetch shop products
        const productsResponse = await sellerAPI.getSellerProducts();
        if (productsResponse.status) {
          setProducts(productsResponse.data);
          
          // Calculate stats
          const activeProducts = productsResponse.data.filter((p: any) => p.inStock).length;
          setStats({
            totalProducts: productsResponse.data.length,
            activeProducts,
            totalViews: Math.floor(Math.random() * 1000) + 100, // Mock data
            totalInquiries: Math.floor(Math.random() * 50) + 10 // Mock data
          });
        }
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  return (
    <ProtectedRoute requiredRole="seller">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name || user?.phone}! Manage your shop and products.
            </p>
          </div>

          {/* Shop Status */}
          {!shop ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="text-center">
                <Store className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No Shop Registered
                </h2>
                <p className="text-gray-600 mb-6">
                  You need to register your shop before you can start selling products.
                </p>
                <Link
                  href="/seller/shop/create"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Register Your Shop</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Products</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Views</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Inquiries</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shop Information */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Shop Information</h2>
                  <Link
                    href="/seller/shop/edit"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Shop</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">{shop.name}</h3>
                    <p className="text-gray-600 mb-4">{shop.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Address:</span> {shop.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Category:</span> {shop.category}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Hours:</span> {shop.openingTime} - {shop.closingTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="bg-gray-100 w-24 h-24 rounded-lg flex items-center justify-center mb-2">
                        <Store className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600">Shop Logo</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Products</h2>
                  <Link
                    href="/seller/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </Link>
                </div>

                {products.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {products.slice(0, 10).map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">₹{product.price}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-600">
                                {product.quantity} {product.unit}s
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  product.inStock
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  View
                                </Link>
                                <Link
                                  href={`/seller/products/edit/${product.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Start by adding your first product to your shop.
                    </p>
                    <Link
                      href="/seller/products/add"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Add Your First Product</span>
                    </Link>
                  </div>
                )}

                {products.length > 10 && (
                  <div className="mt-6 text-center">
                    <Link
                      href="/seller/products"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all products ({products.length})
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <ErrorPopup
          message={error}
          type="error"
          isVisible={!!error}
          onClose={() => setError('')}
        />
      </div>
    </ProtectedRoute>
  );
};

export default SellerDashboard;