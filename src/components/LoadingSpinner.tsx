
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-neon-purple animate-spin-slow" />
      <p className="mt-4 text-gray-300 text-lg animate-pulse">Finding the perfect movies for you...</p>
    </div>
  );
};

export default LoadingSpinner;
