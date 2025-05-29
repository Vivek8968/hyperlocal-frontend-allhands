import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star, Clock, MessageCircle } from 'lucide-react';
import { Shop } from '@/lib/api';

interface ShopCardProps {
  shop: Shop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const handleWhatsAppContact = () => {
    const message = `Hi! I found your shop "${shop.name}" on LocalMarket. I'd like to know more about your products.`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Shop Image */}
      <div className="relative h-48 w-full">
        <Image
          src={shop.imageUrl}
          alt={shop.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
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
      </div>

      {/* Shop Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {shop.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{shop.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {shop.description}
        </p>

        {/* Location and Distance */}
        <div className="flex items-center space-x-1 mb-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600 line-clamp-1">{shop.address}</span>
        </div>

        {shop.distanceFormatted && (
          <div className="flex items-center space-x-1 mb-3">
            <span className="text-sm font-medium text-blue-600">
              {shop.distanceFormatted} away
            </span>
          </div>
        )}

        {/* Opening Hours */}
        <div className="flex items-center space-x-1 mb-4">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {shop.openingTime} - {shop.closingTime}
          </span>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {shop.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/shop/${shop.id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View Shop
          </Link>
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center justify-center bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors"
            title="Contact on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;