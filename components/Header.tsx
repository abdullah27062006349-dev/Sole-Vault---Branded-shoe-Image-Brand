
import React from 'react';

const ShoeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M7 16a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2.5" />
        <path d="M9 16V8" />
        <path d="M14 16.5a2.5 2.5 0 1 1-5 0" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-center">
        <ShoeIcon className="w-8 h-8 mr-3 text-indigo-400"/>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Digital Shoe Brand Imager
        </h1>
      </div>
    </header>
  );
};

export default Header;
