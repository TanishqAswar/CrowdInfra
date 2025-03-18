// app/components/404.jsx
import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-800">
      <div className="w-full max-w-lg text-center p-8">
        <h1 className="text-9xl font-bold text-blue-800">404</h1>
        <div className="h-2 w-1/2 mx-auto bg-blue-500 my-6 rounded-full"></div>
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Page Not Found</h2>
        <p className="text-lg text-zinc-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 inline-block">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;