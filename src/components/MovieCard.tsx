
import React from 'react';
import { Star } from 'lucide-react';

export interface Movie {
  title: string;
  year: string;
  rating: string;
  description: string;
  whyUserMightLikeIt: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_#9b87f5] transform hover:-translate-y-1 h-full flex flex-col">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {movie.title}
          </h3>
          <div className="flex items-center bg-secondary/50 px-2 py-1 rounded-full">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{movie.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-400 mb-4">
          <span className="mr-2">{movie.year}</span>
        </p>
        
        <div className="mb-4">
          <p className="text-gray-300 line-clamp-3">{movie.description}</p>
        </div>
        
        <div className="mt-auto">
          <h4 className="text-neon-purple font-medium mb-1">Why you might like it:</h4>
          <p className="text-gray-300 text-sm italic">{movie.whyUserMightLikeIt}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
