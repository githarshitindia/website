import type React from 'react';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  prompt: string;
  imageInputs: number;
  options?: { name: string; prompt: string }[];
}

export interface ImageData {
  id: number;
  base64: string;
}
