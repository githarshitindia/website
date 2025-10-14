
import React, { useState, useCallback, useMemo } from 'react';
import { Template, ImageData } from './types';
import { TEMPLATES } from './constants';
import { generateImage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import TemplateSelector from './components/TemplateSelector';
import ImageUploader from './components/ImageUploader';
import GeneratedImage from './components/GeneratedImage';
import Loader from './components/Loader';
import { ArrowLeftIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [inputImages, setInputImages] = useState<ImageData[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptionPrompt, setSelectedOptionPrompt] = useState<string | null>(null);

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setInputImages([]);
    setGeneratedImage(null);
    setError(null);
    if (template.options && template.options.length > 0) {
      setSelectedOptionPrompt(template.options[0].prompt);
    } else {
      setSelectedOptionPrompt(null);
    }
  };

  const handleBack = () => {
    setSelectedTemplate(null);
  };

  const handleImageUpload = (images: ImageData[]) => {
    setInputImages(images);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!selectedTemplate) return;

    if (inputImages.length !== selectedTemplate.imageInputs) {
      setError(`Please upload ${selectedTemplate.imageInputs} image(s).`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // FIX: The `prompt` property on a `Template` is a string, but the code was
      // checking if it was a function, leading to a type error. The logic has been
      // simplified to correctly handle the prompt as a string from either the
      // selected option or the template itself.
      let finalPrompt: string;
      if (selectedOptionPrompt) {
        finalPrompt = selectedOptionPrompt;
      } else {
        finalPrompt = selectedTemplate.prompt;
      }
      
      const imageBase64Array = inputImages.map(img => img.base64);
      const result = await generateImage(finalPrompt, imageBase64Array);
      setGeneratedImage(result);
    } catch (e: any) {
      console.error(e);
      setError('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTemplate, inputImages, selectedOptionPrompt]);
  
  const areAllImagesUploaded = useMemo(() => {
    if (!selectedTemplate) return false;
    return inputImages.length === selectedTemplate.imageInputs;
  }, [inputImages, selectedTemplate]);


  const renderEditor = () => {
    if (!selectedTemplate) return null;
    return (
      <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
        <button onClick={handleBack} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 font-semibold">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Templates
        </button>
        <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <selectedTemplate.icon className="w-10 h-10 text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedTemplate.name}</h2>
              <p className="text-slate-400">{selectedTemplate.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <ImageUploader 
              count={selectedTemplate.imageInputs} 
              onUpload={handleImageUpload}
            />
            <div className="flex flex-col items-center justify-center bg-slate-900/70 rounded-xl p-4 border border-slate-700 min-h-[250px] md:min-h-0">
                {isLoading && <Loader />}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {generatedImage && <GeneratedImage src={generatedImage} />}
                {!isLoading && !generatedImage && !error && (
                    <div className="text-center text-slate-500">
                        <p className="font-semibold">Your creation will appear here.</p>
                        <p className="text-sm">Upload your image(s) and click "Generate".</p>
                    </div>
                )}
            </div>
          </div>

          {selectedTemplate.options && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-2">Style Options</h3>
              <div className="flex flex-wrap gap-3">
                {selectedTemplate.options.map(option => (
                  <button 
                    key={option.name}
                    onClick={() => setSelectedOptionPrompt(option.prompt)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedOptionPrompt === option.prompt ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={handleGenerate}
            disabled={isLoading || !areAllImagesUploaded}
            className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? "Generating..." : "✨ Generate Image"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {selectedTemplate ? renderEditor() : <TemplateSelector onSelect={handleTemplateSelect} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
