
import React, { useState } from 'react';
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

  const handleUserFormSubmit = async (name: string, genre: string) => {
    setUserName(name);
    setSelectedGenre(genre);
    setIsLoading(true);

    try {
      const recommendations = await getMovieRecommendations({ userName: name, genre });
      setMovies(recommendations);
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
    if (!userName || !selectedGenre) return;
    
    setIsLoadingMore(true);
    
    try {
      const currentMovieTitles = movies.map(movie => movie.title);
      const moreRecommendations = await getMovieRecommendations({ 
        userName, 
        genre: selectedGenre, 
        previousMovies: currentMovieTitles 
      });
      
      setMovies([...movies, ...moreRecommendations]);
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
          {movies.length === 0 ? (
            <>
              <h1 className="text-4xl font-bold mb-4 text-white">
                Discover Your <span className="text-red-600">Next</span> Favorite Movie
              </h1>
              <p className="text-gray-300 mb-8">
                Tell us your name and preferred genre, and we'll recommend movies tailored just for you.
              </p>
            </>
          ) : userName && (
            <p className="text-xl text-gray-200 mb-8 animate-fade-in">
              Hi <span className="text-red-600 font-semibold">{userName}</span>! 
              {movies.length > 0 ? " Here are your personalized recommendations." : " What kind of movies are you in the mood for today?"}
            </p>
          )}
        </div>
        
        {movies.length === 0 && !isLoading && (
          <UserForm onSubmit={handleUserFormSubmit} isLoading={isLoading} />
        )}
        
        {isLoading && <LoadingSpinner />}
        
        {movies.length > 0 && !isLoading && (
          <MovieList 
            movies={movies} 
            userName={userName} 
            genre={selectedGenre} 
            onShowMore={handleShowMore}
            isLoadingMore={isLoadingMore}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
