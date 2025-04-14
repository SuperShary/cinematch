
import React from 'react';
import MovieCard, { Movie } from './MovieCard';
import { Button } from "@/components/ui/button";
import { FileDown, Plus, RefreshCw } from 'lucide-react';
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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-white mb-2 sm:mb-0">
          <span className="text-gray-300">For </span> 
          <span className="text-red-600 font-bold">{userName}</span>
          <span className="text-gray-300"> — Genre: </span>
          <span className="text-neon-purple">{genre}</span>
        </h2>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleExportPdf}
            className="bg-gray-800 hover:bg-gray-700 text-white hover:shadow-[0_0_10px_rgba(155,135,245,0.5)] transition-all duration-300"
            size="sm"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.title}-${index}`} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={onShowMore}
          disabled={isLoadingMore}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-[0_0_15px_rgba(220,38,38,0.6)] transition-all duration-300 text-white px-6"
          size="lg"
        >
          {isLoadingMore ? (
            <span className="flex items-center">
              <RefreshCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Loading...
            </span>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Show More Recommendations
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MovieList;
