import React, { useState, useCallback } from 'react';
import { generateShoeImage } from '../services/geminiService';
import Spinner from './Spinner';

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth="2"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const styles = [
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: '3d-render', name: '3D Render' },
  { id: 'illustration', name: 'Illustration' },
  { id: 'line-art', name: 'Line Art' },
];

const examplePrompts = [
    'Sleek, minimalist white sneakers, gold stripe',
    'High-top basketball shoes with a galaxy print and glowing soles',
    'Elegant women\'s high heel made of translucent, iridescent material',
    'Rugged brown leather hiking boots, worn and weathered',
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A stylish pair of futuristic Adidas sneakers, studio lighting');
  const [style, setStyle] = useState<string>('photorealistic');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a description for the shoe.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl('');

    try {
      const generatedUrl = await generateShoeImage(prompt, style);
      setImageUrl(generatedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style]);

  const handleDownloadImage = useCallback(() => {
    if (!imageUrl) return;

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-shoe-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl]);


  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">
          Describe the Shoe
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A vintage leather boot with intricate stitching"
          className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-white resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-3">
          <p className="text-xs font-medium text-gray-400">Need inspiration? Try one of these:</p>
          <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                  <button
                      key={index}
                      type="button"
                      onClick={() => !isLoading && setPrompt(example)}
                      disabled={isLoading}
                      className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {example}
                  </button>
              ))}
          </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Select Style
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => !isLoading && setStyle(s.id)}
              disabled={isLoading}
              className={`text-center py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:cursor-not-allowed ${
                style === s.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <Spinner />
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </button>

        {imageUrl && !isLoading && (
          <button
            onClick={handleDownloadImage}
            className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Image
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-center">
          <p>{error}</p>
        </div>
      )}
      
      <div className="w-full aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center text-gray-400">
            <Spinner className="w-12 h-12" />
            <p className="mt-4">Creating your digital product...</p>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated shoe" className="w-full h-full object-cover" />
        ) : (
           <div className="text-center text-gray-500">
            <p className="text-lg">Your generated image will appear here.</p>
            <p className="text-sm">Describe the shoe you want to see and click "Generate Image".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;