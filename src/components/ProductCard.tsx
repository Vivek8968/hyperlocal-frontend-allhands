import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Package } from 'lucide-react';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  shopName?: string;
  showShopInfo?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  shopName, 
  showShopInfo = false 
}) => {
  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in "${product.name}" (₹${product.price}) from your shop. Is it available?`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Stock Status */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              product.inStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-blue-600">
              ₹{product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-1">
              per {product.unit}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        {/* Stock Quantity */}
        {product.inStock && (
          <div className="flex items-center space-x-1 mb-3">
            <Package className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {product.quantity} {product.unit}s available
            </span>
          </div>
        )}

        {/* Shop Info (if enabled) */}
        {showShopInfo && shopName && (
          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Available at:</span>
            <Link
              href={`/shop/${product.shopId}`}
              className="block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              {shopName}
            </Link>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 bg-gray-100 text-gray-800 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
          <button
            onClick={handleWhatsAppContact}
            disabled={!product.inStock}
            className={`flex items-center justify-center py-2 px-3 rounded-lg transition-colors ${
              product.inStock
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title={product.inStock ? 'Contact on WhatsApp' : 'Out of Stock'}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;