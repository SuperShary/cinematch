
import React from 'react';
import { Film } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-center py-6 px-4 w-full">
      <div className="flex items-center space-x-2">
        <Film className="h-8 w-8 text-neon-purple animate-pulse-glow" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          CineMatch <span className="text-white">🎬</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
