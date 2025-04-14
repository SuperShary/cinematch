import axios from 'axios';

const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  runtime: number;
  poster_path: string;
}

export const GENRE_IDS = {
  ACTION: 28,
  COMEDY: 35,
  DRAMA: 18
};

export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<TMDBMovie[]> {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId,
        sort_by: 'popularity.desc',
        page: page,
        include_adult: false,
        language: 'en-US'
      }
    });

    // Fetch 50 movies by making multiple requests if needed
    const moviesPerPage = 20;
    const totalPagesNeeded = Math.ceil(50 / moviesPerPage);
    const allMovies: TMDBMovie[] = response.data.results;

    if (page < totalPagesNeeded) {
      const remainingPages = Array.from({ length: totalPagesNeeded - page }, (_, i) => page + i + 1);
      const additionalMovies = await Promise.all(
        remainingPages.map(p => getMoviesByGenre(genreId, p))
      );
      return [...allMovies, ...additionalMovies.flat()].slice(0, 50);
    }

    return allMovies.slice(0, 50);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
}

export async function getMovieDetails(movieId: number): Promise<TMDBMovie | null> {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function getPosterUrl(posterPath: string): string {
  return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
} 