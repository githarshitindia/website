import React from 'react';

interface GeneratedImageProps {
  src: string;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ src }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 animate-fade-in">
        <img src={src} alt="Generated result" className="rounded-lg shadow-2xl max-w-full max-h-[300px] object-contain"/>
        <a 
            href={src} 
            download="editme-creation.png"
            className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
            Download Image
        </a>
    </div>
  );
};

export default GeneratedImage;
