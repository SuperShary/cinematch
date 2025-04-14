
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserFormProps {
  onSubmit: (userName: string, genre: string) => void;
  isLoading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, isLoading }) => {
  const [userName, setUserName] = useState('');
  const [genre, setGenre] = useState('');
  const genres = [
    'Action', 
    'Comedy', 
    'Drama', 
    'Sci-Fi', 
    'Romance', 
    'Thriller', 
    'Horror', 
    'Animation', 
    'Mystery', 
    'Adventure'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && genre) {
      onSubmit(userName, genre);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="neo-blur p-6 rounded-xl mx-auto max-w-md"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-200">
            What's your name?
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-secondary/40 border-white/10 placeholder:text-gray-400 text-white focus:ring-neon-purple focus:border-neon-purple transition-all duration-300"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre" className="text-sm font-medium text-gray-200">
            What genre are you in the mood for today?
          </Label>
          <Select value={genre} onValueChange={setGenre} required>
            <SelectTrigger 
              id="genre" 
              className="bg-secondary/40 border-white/10 text-gray-100 focus:ring-neon-purple focus:border-neon-purple hover:shadow-[0_0_10px_#9b87f5] transition-all duration-300"
            >
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="bg-card/90 backdrop-blur-md border-white/10 text-white">
              {genres.map((g) => (
                <SelectItem 
                  key={g} 
                  value={g}
                  className="focus:bg-neon-purple/20 focus:text-white"
                >
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          disabled={!userName || !genre || isLoading}
          className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 hover:shadow-[0_0_15px_#9b87f5] transition-all duration-300 font-medium py-2"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding Movies...
            </span>
          ) : (
            <>🎯 Recommend</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
