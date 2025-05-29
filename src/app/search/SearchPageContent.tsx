'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, Store } from 'lucide-react';
import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { searchAPI, Shop, Product } from '@/lib/api';

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchType, setSearchType] = useState<'all' | 'products' | 'shops'>('all');
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'All Categories',
    'Electronics',
    'Clothing',
    'Food & Beverages',
    'Home & Garden',
    'Health & Beauty',
    'Sports & Outdoors',
    'Books & Media',
    'Automotive',
    'Toys & Games'
  ];

  const performSearch = async (searchQuery: string, category: string, type: string) => {
    if (!searchQuery.trim() && !category) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchAPI.search({
        query: searchQuery,
        category: category === 'All Categories' ? '' : category,
        type: type as any
      });

      if (response.status) {
        setShops(response.data.shops || []);
        setProducts(response.data.products || []);
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch(initialQuery, initialCategory, 'all');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedCategory, searchType);
  };

  const filteredShops = searchType === 'products' ? [] : shops;
  const filteredProducts = searchType === 'shops' ? [] : products;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Results</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products or shops..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Search Type Filter */}
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'all' | 'products' | 'shops')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Results</option>
                <option value="products">Products Only</option>
                <option value="shops">Shops Only</option>
              </select>

              {/* Search Button */}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader text="Searching..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorPopup
            message={error}
            isVisible={!!error}
            onClose={() => setError(null)}
          />
        )}

        {/* Results */}
        {!loading && !error && (
          <div className="space-y-8">
            {/* Results Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Search Results
                    {query && (
                      <span className="text-gray-600 font-normal"> for "{query}"</span>
                    )}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Found {filteredShops.length} shops and {filteredProducts.length} products
                  </p>
                </div>
              </div>
            </div>

            {/* Shops Section */}
            {filteredShops.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <Store className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Shops ({filteredShops.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} />
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-6">
                  <Package className="h-6 w-6 text-primary-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Products ({filteredProducts.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredShops.length === 0 && filteredProducts.length === 0 && (query || selectedCategory) && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any shops or products matching your search criteria.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Try:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Using different keywords</li>
                    <li>Checking your spelling</li>
                    <li>Using more general terms</li>
                    <li>Browsing different categories</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPageContent;