 import React from 'react';
import { Loader } from 'lucide-react';

const LoaderComponent = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
            <div className="flex flex-col items-center">
                {/* Loader Icon with Spin Animation */}
                <Loader className="w-10 h-10 text-indigo-600 animate-spin" />
                
                {/* Loading Text */}
                <p className="mt-4 text-lg font-medium text-gray-700">
                    Loading content...
                </p>
            </div>
        </div>
    );
};

export default LoaderComponent;