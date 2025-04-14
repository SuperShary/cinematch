import React from 'react';
import { Film } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  return (
    <header className="flex items-center justify-center py-6 px-4 w-full">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/home')}
      >
        <Film className="h-8 w-8 text-red-600" />
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-red-600 tracking-tight`}>
          CineMatch <span className="text-white">🎬</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
