// src/components/Footer.tsx

import React from 'react';

const Footer = () => {
    // Get the current year dynamically
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 mt-12 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center">
                
                {/* Left side: Minimal Copyright and Year */}
                <p className="text-sm text-gray-500 order-2 md:order-1 mt-2 md:mt-0">
                    &copy; {currentYear} MyApp. All rights reserved.
                </p>

                {/* Right side: Single link/mention (optional) */}
                <div className="text-sm text-gray-500 order-1 md:order-2">
                    {/* Only one non-essential link, often for a legal page, or just text */}
                    <span className="hover:text-gray-900 cursor-default">
                        Privacy Policy 
                    </span> 
                    {/* Replace with your app name if desired */}
                    {/* <span className="font-semibold text-gray-700">MyApp</span> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;