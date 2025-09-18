
import React from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <ImageGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default App;
