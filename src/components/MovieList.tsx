import React from 'react';
import MovieCard, { Movie } from './MovieCard';
import { Button } from "@/components/ui/button";
import { FileDown, Plus, RefreshCw } from 'lucide-react';
import { createPdf } from '@/utils/pdfUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Movie as GeminiMovie } from '../services/geminiService';

interface MovieListProps {
  movies: Movie[];
  userName: string;
  genre: string;
  onShowMore: () => void;
  isLoadingMore: boolean;
  hasMore: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ 
  movies, 
  userName, 
  genre, 
  onShowMore, 
  isLoadingMore,
  hasMore
}) => {
  const isMobile = useIsMobile();
  
  const handleExportPdf = async () => {
    await createPdf(movies, userName, genre);
  };

  // Calculate total running time for the genre
  const totalRunningTime = movies.reduce((total, movie) => {
    if (movie.runningTime) {
      const [hours, minutes] = movie.runningTime.split('h ');
      const mins = minutes ? parseInt(minutes.replace('m', '')) : 0;
      return total + (parseInt(hours) * 60 + mins);
    }
    return total;
  }, 0);

  const hours = Math.floor(totalRunningTime / 60);
  const minutes = totalRunningTime % 60;

  if (!movies.length) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-white mb-2 sm:mb-0`}>
          <span className="text-gray-300">For </span> 
          <span className="text-red-600 font-bold">{userName}</span>
          <span className="text-gray-300"> — Genre: </span>
          <span className="text-red-600">{genre}</span>
        </h2>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleExportPdf}
            className="bg-gray-800 hover:bg-gray-700 text-white hover:shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-300"
            size="sm"
          >
            <FileDown className="mr-2 h-4 w-4" />
            {isMobile ? "" : "Export"}
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{genre} Movies</h2>
        <div className="text-gray-400">
          Total Runtime: {hours}h {minutes}m
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={onShowMore}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Show More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MovieList;
