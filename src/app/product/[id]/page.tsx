'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Package, MapPin, Star, Clock } from 'lucide-react';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { productAPI, shopAPI, Product, Shop } from '@/lib/api';

const ProductPage = () => {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getProductById(productId);
      if (response.status) {
        const productData = response.data;
        setProduct(productData);
        
        // Fetch shop details
        if (productData.shopId) {
          const shopResponse = await shopAPI.getShopById(productData.shopId);
          if (shopResponse.status) {
            setShop(shopResponse.data);
          }
        }

        // Fetch related products (same category)
        const relatedResponse = await productAPI.getProductsByCategory(productData.category);
        if (relatedResponse.status) {
          const filtered = relatedResponse.data
            .filter(p => p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      } else {
        setError('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    if (!product || !shop) return;
    const message = `Hi! I'm interested in "${product.name}" (₹${product.price}) from your shop "${shop.name}". Is it available?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <Loader fullScreen text="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            {shop && (
              <>
                <Link href={`/shop/${shop.id}`} className="text-blue-600 hover:text-blue-700">
                  {shop.name}
                </Link>
                <span className="text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-600">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="relative h-96 lg:h-[500px] bg-white rounded-lg overflow-hidden shadow-sm">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Stock Status */}
            <div className="absolute top-4 right-4">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-baseline space-x-2 mb-4">
                <span className="text-4xl font-bold text-blue-600">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500">
                  per {product.unit}
                </span>
              </div>

              {product.inStock && (
                <div className="flex items-center space-x-2 mb-6">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">
                    {product.quantity} {product.unit}s available
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Shop Information */}
            {shop && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Available at</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={shop.imageUrl}
                        alt={shop.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/shop/${shop.id}`}
                        className="text-lg font-medium text-blue-600 hover:text-blue-700"
                      >
                        {shop.name}
                      </Link>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">
                            {shop.rating.toFixed(1)}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            shop.isOpen
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {shop.isOpen ? 'Open' : 'Closed'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{shop.address}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {shop.openingTime} - {shop.closingTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={handleWhatsAppContact}
                disabled={!product.inStock}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 ${
                  product.inStock
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <MessageCircle className="h-6 w-6" />
                <span>
                  {product.inStock ? 'Contact Shop on WhatsApp' : 'Out of Stock'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
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

export default ProductPage;