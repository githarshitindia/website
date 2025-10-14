import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 md:px-8 border-b border-slate-800 shadow-md bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          EditMe
          <span className="text-indigo-400">.</span>
        </h1>
        <div className="text-right">
            <span className="text-sm text-slate-400">Powered by</span>
            <p className="font-semibold text-slate-300">Codely.fun</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
