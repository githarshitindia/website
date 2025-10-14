import React, { useState, useCallback } from 'react';
import { ImageData } from '../types';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  count: number;
  onUpload: (images: ImageData[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ count, onUpload }) => {
  const [previews, setPreviews] = useState<(string | null)[]>(Array(count).fill(null));

  const handleFileChange = useCallback(async <T,>(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newPreviews = [...previews];
      newPreviews[index] = reader.result as string;
      setPreviews(newPreviews);

      const uploadedImages = newPreviews
        .map((base64, id) => ({ id, base64 }))
        .filter(item => item.base64 !== null) as ImageData[];
      
      onUpload(uploadedImages);
    };
    reader.readAsDataURL(file);
  }, [previews, onUpload]);

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full">
          <label 
            htmlFor={`file-upload-${index}`}
            className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            {previews[index] ? (
              <img src={previews[index] as string} alt={`Preview ${index + 1}`} className="object-contain h-full w-full rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
                <UploadIcon className="w-8 h-8 mb-3" />
                <p className="mb-2 text-sm font-semibold">Click to upload Image {index + 1}</p>
                <p className="text-xs">PNG, JPG or JPEG</p>
              </div>
            )}
            <input 
              id={`file-upload-${index}`} 
              type="file" 
              className="hidden" 
              accept="image/png, image/jpeg" 
              onChange={(e) => handleFileChange(e, index)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
