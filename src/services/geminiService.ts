import axios from 'axios';
import { getMoviesByGenre, getMovieDetails, formatRuntime, getPosterUrl, GENRE_IDS } from './tmdbService';

// Use the provided API key
const API_KEY = 'AIzaSyAEnTVGMVblEFynT6_aFbu-wdYXLVYz0yc';

interface Movie {
  title: string;
  year: string;
  rating: number;
  description: string;
  whyUserMightLikeIt: string;
  platforms: string[];
  logoUrl: string;
}

export async function getMovieRecommendations(genre: string, watchedMovies: string[] = []): Promise<Movie[]> {
  try {
    const genreId = GENRE_IDS[genre.toUpperCase() as keyof typeof GENRE_IDS];
    if (!genreId) {
      throw new Error(`Invalid genre: ${genre}`);
    }

    const movies = await getMoviesByGenre(genreId);
    const recommendations: Movie[] = [];

    for (const movie of movies) {
      if (watchedMovies.includes(movie.title)) continue;

      const details = await getMovieDetails(movie.id);
      if (!details) continue;

      recommendations.push({
        title: movie.title,
        year: movie.release_date.split('-')[0],
        rating: movie.vote_average,
        description: movie.overview,
        whyUserMightLikeIt: `A ${genre.toLowerCase()} film with a rating of ${movie.vote_average.toFixed(1)}/10`,
        platforms: ['Netflix', 'Amazon Prime', 'Disney+'],
        logoUrl: getPosterUrl(movie.poster_path)
      });

      if (recommendations.length >= 50) break;
    }

    return recommendations;
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    return [];
  }
}

function generatePrompt(userName: string, genre: string, previousMovies: string[] = []) {
  if (previousMovies.length === 0) {
    return `
Hi Gemini 👋,
A user named ${userName} wants movie recommendations in the ${genre} genre.

Please provide 5 unique, top-rated movies in this format:

**Title**:  
**Year**:  
**Rating**:  
**Description**:  
**Why ${userName} might like it**:  
**Available on**: (list streaming platforms like Netflix, Hulu, Disney+, Amazon Prime, HBO Max)

Keep responses simple, friendly, and cleanly formatted for display.
    `;
  } else {
    return `
Hi Gemini 👋,
A user named ${userName} already received recommendations for these ${genre} movies:
${previousMovies.join(', ')}

Please suggest 5 **new, unique** top-rated ${genre} movies they haven't seen yet, using the same format as before with platform availability information.
    `;
  }
}

// Function to parse the Gemini API response
function parseGeminiResponse(response: any) {
  // In a real implementation, we would parse the structured response
  // For now, we'll use our mock data structure
  return [];
}

// Mock data for development
async function getMockRecommendations(userName: string, genre: string, previousMovies: string[] = []) {
  // Map genre names to TMDB genre IDs
  const genreMap: { [key: string]: number } = {
    'Action': GENRE_IDS.ACTION,
    'Comedy': GENRE_IDS.COMEDY,
    'Drama': GENRE_IDS.DRAMA
  };

  const genreId = genreMap[genre];
  if (!genreId) return [];

  // Fetch movies from TMDB
  const movies = await getMoviesByGenre(genreId, 1);
  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      const details = await getMovieDetails(movie.id);
      return {
        title: movie.title,
        year: movie.release_date.split('-')[0],
        rating: `${movie.vote_average.toFixed(1)}/10`,
        description: movie.overview,
        whyUserMightLikeIt: `This ${genre.toLowerCase()} film has received critical acclaim with a rating of ${movie.vote_average.toFixed(1)}/10. ${userName}, if you enjoy ${genre.toLowerCase()} movies, this is a must-watch!`,
        platforms: ["Netflix", "HBO Max", "Amazon Prime"], // This would need to be fetched from a streaming availability API
        logoUrl: getPosterUrl(movie.poster_path),
        releaseDate: movie.release_date,
        runningTime: formatRuntime(details?.runtime || 0)
      };
    })
  );

  // Return movies for the selected genre, excluding previous movies
  return detailedMovies.filter(movie => !previousMovies.includes(movie.title));
}
