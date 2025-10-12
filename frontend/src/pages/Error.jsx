import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Not Found</h1>
      <p className="text-lg text-richblack-200 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
