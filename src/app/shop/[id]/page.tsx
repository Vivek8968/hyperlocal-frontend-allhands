'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Clock, Star, Phone, MessageCircle, Package } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { shopAPI, productAPI, Shop, Product } from '@/lib/api';

const ShopPage = () => {
  const params = useParams();
  const shopId = params.id as string;
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (shopId) {
      fetchShopDetails();
      fetchShopProducts();
    }
  }, [shopId]);

  const fetchShopDetails = async () => {
    try {
      setLoading(true);
      const response = await shopAPI.getShopById(shopId);
      if (response.status) {
        setShop(response.data);
      } else {
        setError('Shop not found');
      }
    } catch (error) {
      console.error('Error fetching shop details:', error);
      setError('Failed to load shop details');
    } finally {
      setLoading(false);
    }
  };

  const fetchShopProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await productAPI.getShopProducts(shopId);
      if (response.status) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching shop products:', error);
      setError('Failed to load products');
    } finally {
      setProductsLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    if (!shop) return;
    const message = `Hi! I found your shop "${shop.name}" on LocalMarket. I'd like to know more about your products.`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return <Loader fullScreen text="Loading shop details..." />;
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop Not Found</h2>
          <p className="text-gray-600 mb-6">The shop you're looking for doesn't exist or has been removed.</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Shop Logo */}
            <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0">
              <Image
                src={shop.imageUrl}
                alt={shop.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>

            {/* Shop Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {shop.name}
                  </h1>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-medium text-gray-900">
                        {shop.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-500">({shop.reviewCount || 0} reviews)</span>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        shop.isOpen
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {shop.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{shop.description}</p>

              {/* Location and Hours */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{shop.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {shop.openingTime} - {shop.closingTime}
                  </span>
                </div>
              </div>

              {/* Contact Button */}
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Contact on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Products ({filteredProducts.length})
          </h2>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {productsLoading ? (
          <Loader size="lg" text="Loading products..." />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                shopName={shop.name}
                showShopInfo={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'This shop hasn\'t listed any products yet.'
                : `No products found in the "${selectedCategory}" category.`}
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View all products
              </button>
            )}
          </div>
        )}
      </div>

      <ErrorPopup
        message={error}
        type="error"
        isVisible={!!error}
        onClose={() => setError('')}
      />
    </div>
  );
};

export default ShopPage;