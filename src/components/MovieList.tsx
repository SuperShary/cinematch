
import React from 'react';
import MovieCard, { Movie } from './MovieCard';
import { Button } from "@/components/ui/button";
import { FileDown, Plus } from 'lucide-react';
import { createPdf } from '@/utils/pdfUtils';

interface MovieListProps {
  movies: Movie[];
  userName: string;
  genre: string;
  onShowMore: () => void;
  isLoadingMore: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ 
  movies, 
  userName, 
  genre, 
  onShowMore, 
  isLoadingMore 
}) => {
  const handleExportPdf = async () => {
    await createPdf(movies, userName, genre);
  };

  if (!movies.length) return null;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Movie recommendations for <span className="text-neon-purple">{userName}</span> — Genre: <span className="text-neon-purple">{genre}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.title}-${index}`} movie={movie} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button 
          onClick={handleExportPdf}
          className="bg-secondary hover:bg-secondary/80 text-white hover:shadow-[0_0_10px_rgba(155,135,245,0.5)] transition-all duration-300"
        >
          <FileDown className="mr-2 h-4 w-4" />
          📄 Export as PDF
        </Button>
        
        <Button 
          onClick={onShowMore}
          disabled={isLoadingMore}
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 hover:shadow-[0_0_15px_#9b87f5] transition-all duration-300"
        >
          {isLoadingMore ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Show More 🎬
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MovieList;
