import React from 'react';
import { Template } from '../types';
import { TEMPLATES } from '../constants';
import TemplateCard from './TemplateCard';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Choose Your Magic Wand</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">Select a template to begin your creative journey. Each one is a gateway to a new reality for your photos.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TEMPLATES.map(template => (
          <TemplateCard key={template.id} template={template} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
