import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mb-6" />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">
        Something Went Wrong
      </h1>
      <p className="text-lg text-gray-600 mb-2 text-center">
        We're sorry, but an unexpected error has occurred.
      </p>
      <p className="text-md text-gray-500 mb-6 text-center max-w-xl">
        It might be because of a temporary connection issue, a broken link, or an internal server error.
        Please try the following actions:
      </p>

      <ul className="text-gray-700 mb-8 space-y-2 text-center">
        <li>• Refresh the page.</li>
        <li>• Check your internet connection.</li>
        <li>• Try again after some time.</li>
        <li>• Contact our support team if the issue persists.</li>
      </ul>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 text-center"
        >
          Go Home
        </a>
        <a
          href="mailto:support@example.com"
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300 text-center"
        >
          Contact Support
        </a>
      </div>

      <p className="text-xs text-gray-400 mt-10">Error Code: 500</p>
    </div>
  );
};

export default ErrorPage;
