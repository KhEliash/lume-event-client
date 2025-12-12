 "use client"

import React, { useEffect } from 'react';

// The error component receives 'error' and 'reset' props from Next.js
interface ErrorProps {
    error: Error;
    reset: () => void;
}

const ErrorBoundary: React.FC<ErrorProps> = ({ error, reset }) => {
    
    // Optional: Log the error to an error reporting service
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
            
            <h1 className="text-5xl font-extrabold text-red-600 mb-4">
                Oops! Something Went Wrong.
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
                We apologize for the inconvenience. An unexpected error occurred while loading this page.
            </p>
            
            {/* Optional: Display error details for debugging */}
            <details className="text-sm text-gray-500 mb-8 p-4 bg-white border rounded-lg shadow-inner max-w-md w-full">
                <summary className="cursor-pointer font-medium text-gray-800">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap text-left wrap-break-word">
                    {error.message}
                </pre>
            </details>

            {/* Reset Button */}
            <button
                onClick={
                    // Attempt to re-render the segment
                    () => reset()
                }
                className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
                Try Again
            </button>
        </div>
    );
};

// Renaming the export to something descriptive like 'ErrorBoundary' or 'ErrorPage'
export default ErrorBoundary;