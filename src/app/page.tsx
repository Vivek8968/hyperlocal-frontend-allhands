'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Store, Users, TrendingUp } from 'lucide-react';
import ShopCard from '@/components/ShopCard';
import Loader from '@/components/Loader';
import ErrorPopup from '@/components/ErrorPopup';
import { shopAPI, Shop } from '@/lib/api';

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    // Check if geolocation is supported
    if ('geolocation' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
        if (result.state === 'granted') {
          getCurrentLocation();
        }
      });
    }
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchNearbyShops(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Unable to get your location. Showing all shops.');
        fetchNearbyShops();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const fetchNearbyShops = async (lat?: number, lng?: number) => {
    try {
      setLoading(true);
      const response = await shopAPI.getAllShops(lat, lng);
      if (response.status) {
        setShops(response.data);
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setError('Failed to load shops. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationRequest = () => {
    if (locationPermission === 'denied') {
      setError('Location access denied. Please enable location in your browser settings.');
      return;
    }
    getCurrentLocation();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Local Shops
              <span className="block text-blue-200">Near You</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Find nearby shops, browse their products, and connect with local businesses in your community.
            </p>
            
            {!location && (
              <button
                onClick={handleLocationRequest}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Find Shops Near Me</span>
              </button>
            )}

            {location && (
              <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4 inline-block">
                <div className="flex items-center space-x-2 text-blue-100">
                  <MapPin className="h-5 w-5" />
                  <span>Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Local Shops</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50K+</h3>
              <p className="text-gray-600">Products Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shops Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {location ? 'Shops Near You' : 'Featured Shops'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse local shops and discover amazing products from businesses in your community.
            </p>
          </div>

          {loading ? (
            <Loader size="lg" text="Finding shops near you..." />
          ) : shops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No shops found</h3>
              <p className="text-gray-600 mb-6">
                {location 
                  ? "No shops found in your area. Try expanding your search radius."
                  : "Enable location access to find shops near you."
                }
              </p>
              {!location && (
                <button
                  onClick={handleLocationRequest}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Enable Location</span>
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Own a Local Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our platform and reach more customers in your local area. 
            List your products and grow your business with LocalMarket.
          </p>
          <a
            href="/seller/register"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Register Your Shop
          </a>
        </div>
      </section>

      <ErrorPopup
        message={error}
        type="error"
        isVisible={!!error}
        onClose={() => setError('')}
      />
    </div>
  );
}
