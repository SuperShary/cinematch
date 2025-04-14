import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import UserForm from '@/components/UserForm';
import MovieList from '@/components/MovieList';
import LoadingSpinner from '@/components/LoadingSpinner';
import { getMovieRecommendations } from '@/services/geminiService';
import { Movie } from '@/components/MovieCard';

const Index = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPage = 10;

  // Load initial movies when component mounts
  useEffect(() => {
    const loadInitialMovies = async () => {
      setIsLoading(true);
      try {
        const recommendations = await getMovieRecommendations({ 
          userName: 'Movie Lover', 
          genre: 'Action' 
        });
        setMovies(recommendations);
        setDisplayedMovies(recommendations.slice(0, moviesPerPage));
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get recommendations. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialMovies();
  }, []);

  const handleUserFormSubmit = async (name: string, genre: string) => {
    setUserName(name);
    setSelectedGenre(genre);
    setIsLoading(true);
    setCurrentPage(1);

    try {
      const recommendations = await getMovieRecommendations({ userName: name, genre });
      setMovies(recommendations);
      setDisplayedMovies(recommendations.slice(0, moviesPerPage));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = async () => {
    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * moviesPerPage;
      
      // If we need more movies, fetch them
      if (endIndex > movies.length) {
        const currentMovieTitles = movies.map(movie => movie.title);
        const moreRecommendations = await getMovieRecommendations({ 
          userName: userName || 'Movie Lover', 
          genre: selectedGenre || 'Action',
          previousMovies: currentMovieTitles
        });
        setMovies([...movies, ...moreRecommendations]);
      }
      
      // Always show 10 movies per page
      const newMovies = movies.slice(0, endIndex);
      setDisplayedMovies(newMovies);
      setCurrentPage(nextPage);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get more recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-gradient-to-b from-black to-gray-900">
      <Header />
      
      <main className="container px-4 mx-auto mt-6">
        <div className="max-w-lg mx-auto text-center mb-8">
          {!userName ? (
            <>
              <h1 className="text-4xl font-bold mb-4 text-white">
                Discover Your <span className="text-red-600">Next</span> Favorite Movie
              </h1>
              <p className="text-gray-300 mb-8">
                Tell us your name and preferred genre, and we'll recommend movies tailored just for you.
              </p>
            </>
          ) : (
            <p className="text-xl text-gray-200 mb-8 animate-fade-in">
              Hi <span className="text-red-600 font-semibold">{userName}</span>! 
              Here are your personalized recommendations.
            </p>
          )}
        </div>
        
        {!userName && !isLoading && (
          <UserForm onSubmit={handleUserFormSubmit} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {displayedMovies.length > 0 && !isLoading && (
          <MovieList 
            movies={displayedMovies} 
            userName={userName || 'Movie Lover'} 
            genre={selectedGenre || 'Action'} 
            onShowMore={handleShowMore}
            isLoadingMore={isLoadingMore}
            hasMore={true} // Always show the button as we can fetch more
          />
        )}
      </main>
    </div>
  );
};

export default Index;
