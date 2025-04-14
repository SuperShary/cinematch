
import React from 'react';
import { Star, TrendingUp, Award, Play } from 'lucide-react';

export interface Movie {
  title: string;
  year: string;
  rating: string;
  description: string;
  whyUserMightLikeIt: string;
  platforms?: string[]; // Add platforms property
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_#9b87f5] transform hover:-translate-y-1 h-full flex flex-col">
      <div className="relative w-full">
        {/* Movie image placeholder with gradient overlay */}
        <div className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white truncate pr-2">
              {movie.title}
            </h3>
            <div className="flex items-center bg-black/60 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-sm font-medium text-white">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2 flex items-center text-gray-400">
          <span className="mr-2">{movie.year}</span>
          {movie.platforms && movie.platforms.length > 0 && (
            <>
              <span className="mx-2 text-gray-500">•</span>
              <div className="flex items-center">
                <span className="text-sm">Available on: </span>
                <div className="ml-1 flex gap-1">
                  {movie.platforms.map((platform, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="mb-4 flex-grow">
          <p className="text-gray-300 line-clamp-3">{movie.description}</p>
        </div>
        
        <div className="mt-auto">
          <h4 className="text-neon-purple font-medium mb-1 flex items-center">
            <Award className="h-4 w-4 mr-1" />
            Why you might like it:
          </h4>
          <p className="text-gray-300 text-sm italic">{movie.whyUserMightLikeIt}</p>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700">
          <button className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors">
            <Play className="h-4 w-4 mr-2" fill="currentColor" />
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
