import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 border-4 border-t-indigo-500 border-slate-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 text-sm font-semibold">AI is creating magic...</p>
    </div>
  );
};

export default Loader;
