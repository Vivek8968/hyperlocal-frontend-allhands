'use client';

import { useState, useEffect } from 'react';
import { Users, Store, Package, Activity, Eye, CheckCircle, XCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { mockShops, mockProducts, mockUsers, mockCategories } from '@/data/mockData';

interface AdminStats {
  totalShops: number;
  totalProducts: number;
  totalUsers: number;
  pendingApprovals: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    totalShops: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingApprovals: 0,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Calculate stats from mock data
    const totalShops = mockShops.length;
    const totalProducts = mockProducts.length;
    const totalUsers = mockUsers.length;
    const pendingApprovals = mockShops.filter(shop => shop.status === 'pending').length;

    setStats({
      totalShops,
      totalProducts,
      totalUsers,
      pendingApprovals,
    });
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: {
    title: string;
    value: number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  const ShopManagement = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Shop Management</h3>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockShops.map((shop) => (
                <tr key={shop.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={shop.logo} alt={shop.name} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{shop.name}</div>
                        <div className="text-sm text-gray-500">{shop.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{shop.owner}</div>
                    <div className="text-sm text-gray-500">{shop.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      shop.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : shop.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {shop.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {mockProducts.filter(p => p.shopId === shop.id).length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    {shop.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CategoryManagement = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Category Management</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCategories.map((category) => (
            <div key={category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{category}</span>
                <span className="text-xs text-gray-500">
                  {mockProducts.filter(p => p.category === category).length} products
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SystemLogs = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent System Activity</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[
            { action: 'New shop registration', shop: 'TechWorld Electronics', time: '2 hours ago', type: 'info' },
            { action: 'Product added', shop: 'Fresh Mart', time: '4 hours ago', type: 'success' },
            { action: 'Shop approved', shop: 'Fashion Hub', time: '6 hours ago', type: 'success' },
            { action: 'User reported issue', shop: 'Book Corner', time: '8 hours ago', type: 'warning' },
            { action: 'Shop suspended', shop: 'Quick Electronics', time: '1 day ago', type: 'error' },
          ].map((log, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                log.type === 'success' ? 'bg-green-400' :
                log.type === 'warning' ? 'bg-yellow-400' :
                log.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{log.action}</p>
                <p className="text-xs text-gray-500">{log.shop} • {log.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage shops, categories, and monitor system activity</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Shops"
              value={stats.totalShops}
              icon={Store}
              color="bg-blue-500"
            />
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={Package}
              color="bg-green-500"
            />
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="bg-purple-500"
            />
            <StatCard
              title="Pending Approvals"
              value={stats.pendingApprovals}
              icon={Activity}
              color="bg-orange-500"
            />
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'shops', name: 'Shops' },
                { id: 'categories', name: 'Categories' },
                { id: 'logs', name: 'System Logs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">3 new shops registered today</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">15 products added this week</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">2 shops pending approval</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                      Review Pending Shops
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                      Add New Category
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                      View System Reports
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'shops' && <ShopManagement />}
            {activeTab === 'categories' && <CategoryManagement />}
            {activeTab === 'logs' && <SystemLogs />}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}