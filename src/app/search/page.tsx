'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, MapPin, Package, Store } from 'lucide-react';
import ShopCard from '@/components/ShopCard';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { searchAPI, Shop, Product } from '@/lib/api';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchType, setSearchType] = useState<'all' | 'products' | 'shops'>('all');
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    'Electronics',
    'Grocery',
    'Fashion',
    'Dairy',
    'Bakery',
    'Fruits',
    'Vegetables',
    'Clothing',
    'Books',
    'Sports'
  ];

  useEffect(() => {
    if (initialQuery || initialCategory) {
      performSearch();
    }
  }, []);

  const performSearch = async () => {
    if (!query.trim() && !selectedCategory) {
      setError('Please enter a search term or select a category');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setHasSearched(true);

      const searchParams = {
        query: query.trim(),
        category: selectedCategory,
        type: searchType
      };

      const response = await searchAPI.search(searchParams);
      
      if (response.status) {
        setShops(response.data.shops || []);
        setProducts(response.data.products || []);
      } else {
        setError('Search failed. Please try again.');
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSearchType('all');
    setShops([]);
    setProducts([]);
    setHasSearched(false);
  };

  const filteredShops = searchType === 'products' ? [] : shops;
  const filteredProducts = searchType === 'shops' ? [] : products;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products, shops..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Search Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>

            {/* Search Type Filter */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Show:</span>
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'All Results' },
                  { value: 'products', label: 'Products Only' },
                  { value: 'shops', label: 'Shops Only' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSearchType(option.value as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      searchType === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {(query || selectedCategory) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loader size="lg" text="Searching..." />
        ) : hasSearched ? (
          <div className="space-y-8">
            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {filteredShops.length} shops and {filteredProducts.length} products
                  {query && ` for "${query}"`}
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
              </div>
            </div>

            {/* Shops Results */}
            {filteredShops.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Store className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
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

            {/* Products Results */}
            {filteredProducts.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Products ({filteredProducts.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showShopInfo={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredShops.length === 0 && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any {searchType === 'all' ? 'shops or products' : searchType} matching your search.
                  Try adjusting your search terms or filters.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Suggestions:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Check your spelling</li>
                    <li>• Try more general keywords</li>
                    <li>• Remove some filters</li>
                    <li>• Browse by category instead</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 mb-6">
              Enter a search term or select a category to find products and shops near you.
            </p>
            
            {/* Popular Categories */}
            <div className="max-w-md mx-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">Popular categories:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      performSearch();
                    }}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
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

export default SearchPage;