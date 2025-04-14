import React from 'react';
import { Star, TrendingUp, Award, Play } from 'lucide-react';

export interface Movie {
  title: string;
  year: string;
  rating: string;
  description: string;
  whyUserMightLikeIt: string;
  platforms?: string[]; // Add platforms property
  logoUrl?: string; // Add logoUrl property
  releaseDate?: string;
  runningTime?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const getPlatformUrl = (platform: string) => {
    const platformUrls: { [key: string]: string } = {
      'Netflix': 'https://www.netflix.com',
      'HBO Max': 'https://www.max.com',
      'Amazon Prime': 'https://www.primevideo.com',
      'Hulu': 'https://www.hulu.com',
      'Disney+': 'https://www.disneyplus.com',
      'Peacock': 'https://www.peacocktv.com'
    };
    return platformUrls[platform] || '#';
  };

  const handleWatchNow = () => {
    if (movie.platforms && movie.platforms.length > 0) {
      // Open the first available platform in a new tab
      window.open(getPlatformUrl(movie.platforms[0]), '_blank');
    }
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_#9b87f5] transform hover:-translate-y-1 h-full flex flex-col">
      <div className="relative w-full">
        {/* Movie image with gradient overlay */}
        <div className="w-full h-48 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
          {movie.logoUrl ? (
            <img
              src={movie.logoUrl}
              alt={`${movie.title} logo`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900" />
          )}
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
        <div className="mb-2 flex flex-wrap items-center text-gray-400 gap-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">Year:</span>
            <span className="ml-1">{movie.year}</span>
          </div>
          {movie.releaseDate && (
            <div className="flex items-center">
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-sm font-medium">Released:</span>
              <span className="ml-1">{new Date(movie.releaseDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          )}
          {movie.runningTime && (
            <div className="flex items-center">
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-sm font-medium">Runtime:</span>
              <span className="ml-1">{movie.runningTime}</span>
            </div>
          )}
          {movie.platforms && movie.platforms.length > 0 && (
            <div className="flex items-center">
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-sm font-medium">Available on:</span>
              <div className="ml-1 flex gap-1">
                {movie.platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={getPlatformUrl(platform)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
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
          <button 
            onClick={handleWatchNow}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors"
            disabled={!movie.platforms || movie.platforms.length === 0}
          >
            <Play className="h-4 w-4 mr-2" fill="currentColor" />
            {movie.platforms && movie.platforms.length > 0 ? 'Watch Now' : 'Not Available'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
