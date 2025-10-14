import React from 'react';
import { Template } from '../types';

interface TemplateCardProps {
  template: Template;
  onSelect: (template: Template) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(template)}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-left h-full flex flex-col items-start hover:bg-slate-700/70 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="mb-4 bg-slate-700/50 p-3 rounded-lg group-hover:bg-indigo-600/50 transition-colors">
        <template.icon className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
      <p className="text-sm text-slate-400 flex-grow">{template.description}</p>
    </button>
  );
};

export default TemplateCard;
