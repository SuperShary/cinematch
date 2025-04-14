import { useState, useEffect } from 'react';
import { getMovieRecommendations } from '../services/geminiService';
import MovieList from './MovieList';
import { Movie } from '../services/geminiService';

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const recommendations = await getMovieRecommendations('Action');
        setMovies(recommendations);
        setHasMore(recommendations.length > 0);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleShowMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const additionalMovies = await getMovieRecommendations('Action');
      setMovies(prevMovies => [...prevMovies, ...additionalMovies]);
      setPage(nextPage);
      setHasMore(additionalMovies.length > 0);
    } catch (err) {
      setError('Failed to load more movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recommended Movies</h1>
      <MovieList movies={movies} />
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Index; 