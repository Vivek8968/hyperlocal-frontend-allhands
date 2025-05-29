import React, { Suspense } from 'react';
import SearchPageContent from './SearchPageContent';
import Loader from '@/components/Loader';

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader text="Loading search..." />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;