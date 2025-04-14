import axios from 'axios';

// Use the provided API key
const API_KEY = 'AIzaSyAEnTVGMVblEFynT6_aFbu-wdYXLVYz0yc';

interface RecommendationParams {
  userName: string;
  genre: string;
  previousMovies?: string[];
}

export const getMovieRecommendations = async ({ userName, genre, previousMovies = [] }: RecommendationParams) => {
  try {
    console.log('Sending request to Gemini API with:', { userName, genre, previousMovies });
    
    // Format the prompt based on whether we're getting initial or additional recommendations
    const prompt = generatePrompt(userName, genre, previousMovies);
    
    // Make the actual API call to Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Received response from Gemini API');
    
    // For development purposes, we'll still use mock data for now
    // In a production app, you would parse the Gemini response here
    // return parseGeminiResponse(response.data);
    
    return getMockRecommendations(userName, genre, previousMovies);
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw new Error('Failed to fetch movie recommendations. Please try again.');
  }
};

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
function getMockRecommendations(userName: string, genre: string, previousMovies: string[] = []) {
  const allMockMovies = {
    'Action': [
      {
        title: "Mad Max: Fury Road",
        year: "2015",
        rating: "8.1/10",
        description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler with the help of a group of female prisoners and a drifter named Max.",
        whyUserMightLikeIt: `High-octane action sequences with minimal CGI and incredible stunt work make this a visual masterpiece. If you enjoy immersive action that keeps you on the edge of your seat, ${userName}, this is a must-watch!`,
        platforms: ["Netflix", "HBO Max"],
        logoUrl: "/movie-logos/mad-max-fury-road.jpg"
      },
      {
        title: "John Wick",
        year: "2014",
        rating: "7.4/10",
        description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took his car.",
        whyUserMightLikeIt: `If you love stylish action with incredible fight choreography, ${userName}, John Wick's world-building and Keanu Reeves' performance will keep you hooked!`,
        platforms: ["Amazon Prime", "Hulu"],
        logoUrl: "/movie-logos/john-wick.jpg"
      },
      {
        title: "Mission: Impossible - Fallout",
        year: "2018",
        rating: "7.7/10",
        description: "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
        whyUserMightLikeIt: `Tom Cruise's death-defying stunts and the franchise's signature blend of action and espionage make this a thrilling watch, ${userName}!`,
        platforms: ["Paramount+", "Amazon Prime"],
        logoUrl: "/movie-logos/mission-impossible.jpg"
      },
      {
        title: "The Dark Knight",
        year: "2008",
        rating: "9.0/10",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        whyUserMightLikeIt: `Heath Ledger's iconic performance as the Joker and Christopher Nolan's masterful direction make this a superhero film like no other, ${userName}!`,
        platforms: ["HBO Max", "Netflix"],
        logoUrl: "/movie-logos/the-dark-knight.jpg"
      }
    ],
    'Comedy': [
      {
        title: "The Grand Budapest Hotel",
        year: "2014",
        rating: "8.1/10",
        description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
        whyUserMightLikeIt: `Wes Anderson's unique visual style and quirky humor make this a delightful watch. If you appreciate clever dialogue and eccentric characters, ${userName}, you'll love this!`,
        platforms: ["Disney+", "HBO Max"],
        logoUrl: "/movie-logos/grand-budapest-hotel.jpg"
      },
      {
        title: "Pulp Fiction",
        year: "1994",
        rating: "8.9/10",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        whyUserMightLikeIt: `Quentin Tarantino's non-linear storytelling and sharp dialogue make this a cult classic. ${userName}, if you enjoy dark humor and unforgettable characters, this is a must-watch!`,
        platforms: ["Netflix", "HBO Max"],
        logoUrl: "/movie-logos/pulp-fiction.jpg"
      }
    ],
    'Drama': [
      {
        title: "The Shawshank Redemption",
        year: "1994",
        rating: "9.3/10",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        whyUserMightLikeIt: `This timeless classic about hope and friendship will resonate with you, ${userName}. The powerful performances and emotional depth make it unforgettable.`,
        platforms: ["Netflix"],
        logoUrl: "/movie-logos/shawshank-redemption.jpg"
      },
      {
        title: "Parasite",
        year: "2019",
        rating: "8.5/10",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        whyUserMightLikeIt: `Bong Joon-ho's masterful blend of dark comedy and social commentary will keep you on the edge of your seat, ${userName}!`,
        platforms: ["Hulu"],
        logoUrl: "/movie-logos/parasite.jpg"
      }
    ],
    'Sci-Fi': [
      {
        title: "Inception",
        year: "2010",
        rating: "8.8/10",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        whyUserMightLikeIt: `Christopher Nolan's mind-bending masterpiece will challenge your perception of reality. If you enjoy complex narratives and stunning visuals, ${userName}, this is perfect for you!`,
        platforms: ["Netflix", "HBO Max"],
        logoUrl: "/movie-logos/inception.jpg"
      },
      {
        title: "Children of Men",
        year: "2006",
        rating: "7.9/10",
        description: "In 2027, in a chaotic world in which women have somehow become infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
        whyUserMightLikeIt: `Alfonso Cuarón's gritty and realistic sci-fi film is a chilling depiction of a world without hope. ${userName}, if you appreciate films that blend social commentary with intense action sequences, this is a must-watch!`,
        platforms: ["Peacock", "Hulu"],
        logoUrl: "/movie-logos/children-of-men.jpg"
      }
    ],
    'Romance': [
      {
        title: "Before Sunrise",
        year: "1995",
        rating: "8.1/10",
        description: "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
        whyUserMightLikeIt: `${userName}, this film captures the magic of an unexpected connection through natural dialogue and authentic performances. Its celebration of meaningful conversation feels increasingly rare in modern romance films.`,
        platforms: ["HBO Max", "Criterion Channel"]
      },
      {
        title: "The Notebook",
        year: "2004",
        rating: "7.8/10",
        description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
        whyUserMightLikeIt: `This beloved romantic drama features powerful chemistry between Rachel McAdams and Ryan Gosling. ${userName}, if you enjoy sweeping love stories that span decades, this emotional film will resonate with you.`,
        platforms: ["Netflix", "Prime Video"]
      },
      {
        title: "Call Me By Your Name",
        year: "2017",
        rating: "7.9/10",
        description: "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
        whyUserMightLikeIt: `Luca Guadagnino's sun-drenched coming-of-age romance captures the intensity of first love. ${userName}, the film's lush cinematography and sensitive performances create a deeply sensory experience.`,
        platforms: ["Hulu", "Starz"]
      },
      {
        title: "Pride & Prejudice",
        year: "2005",
        rating: "7.8/10",
        description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
        whyUserMightLikeIt: `This visually stunning adaptation of Jane Austen's classic novel features wonderful performances and gorgeous cinematography. ${userName}, the electric chemistry between Keira Knightley and Matthew Macfadyen brings this beloved story to vibrant life.`,
        platforms: ["HBO Max", "Peacock"]
      },
      {
        title: "Her",
        year: "2013",
        rating: "8.0/10",
        description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
        whyUserMightLikeIt: `Spike Jonze's unique romance explores connection and intimacy in the digital age. ${userName}, if you appreciate unconventional love stories that blend emotional depth with thought-provoking concepts, this film offers something truly special.`,
        platforms: ["Netflix", "Apple TV+"]
      }
    ],
    'Thriller': [
      {
        title: "Se7en",
        year: "1995",
        rating: "8.6/10",
        description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
        whyUserMightLikeIt: `David Fincher's dark and atmospheric thriller is a masterclass in suspense. ${userName}, if you appreciate films that explore the darker side of human nature, this is a must-watch.`,
        platforms: ["Netflix", "Hulu"]
      },
       {
        title: "Prisoners",
        year: "2013",
        rating: "8.1/10",
        description: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
        whyUserMightLikeIt: `Denis Villeneuve's intense thriller is a gripping and emotional experience. ${userName}, if you appreciate films that explore the depths of human desperation and moral ambiguity, this is a must-see.`,
        platforms: ["Prime Video", "Hulu"]
      },
      {
        title: "The Girl with the Dragon Tattoo",
        year: "2011",
        rating: "7.8/10",
        description: "A journalist is aided in his search for a woman who has been missing for forty years by a young female hacker.",
        whyUserMightLikeIt: `David Fincher's stylish thriller is a dark and suspenseful adaptation of Stieg Larsson's novel. ${userName}, if you appreciate complex characters and a gripping mystery, this is a must-see.`,
        platforms: ["Netflix", "Starz"]
      }
    ],
    'Horror': [
      {
        title: "Hereditary",
        year: "2018",
        rating: "7.3/10",
        description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
        whyUserMightLikeIt: `${userName}, this atmospheric horror film features an incredible performance by Toni Collette and builds unbearable tension through family drama before unleashing its supernatural elements.`,
        platforms: ["Prime Video", "Shudder"]
      },
      {
        title: "The Witch",
        year: "2015",
        rating: "6.9/10",
        description: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
        whyUserMightLikeIt: `Robert Eggers' period horror film creates dread through its authentic setting and religious paranoia. ${userName}, if you appreciate slow-burning atmospheric terror over jump scares, this film's meticulous attention to detail creates genuine unease.`,
        platforms: ["Netflix", "Shudder"]
      },
      {
        title: "Get Out",
        year: "2017",
        rating: "7.8/10",
        description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        whyUserMightLikeIt: `Jordan Peele's groundbreaking social thriller combines genuine scares with incisive commentary. ${userName}, the film's perfect balance of tension, horror, and dark humor creates an unforgettable viewing experience.`,
        platforms: ["HBO Max", "Prime Video"]
      },
      {
        title: "The Babadook",
        year: "2014",
        rating: "6.8/10",
        description: "A widowed mother plagued by the violent death of her husband battles with her son's fear of a monster lurking in the house, but soon discovers a sinister presence all around her.",
        whyUserMightLikeIt: `Jennifer Kent's psychological horror film is a chilling exploration of grief and mental illness. ${userName}, if you appreciate films that blend scares with emotional depth, this is a must-see.`,
        platforms: ["Hulu", "AMC+"]
      },
      {
        title: "A Quiet Place",
        year: "2018",
        rating: "7.5/10",
        description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
        whyUserMightLikeIt: `John Krasinski's suspenseful horror film is a masterclass in tension. ${userName}, if you appreciate films that create scares through atmosphere and sound design, this is a must-see.`,
        platforms: ["Paramount+", "Hulu"]
      }
    ]
  };

  // Filter out previously recommended movies
  const availableMovies = allMockMovies[genre as keyof typeof allMockMovies] || [];
  const newMovies = availableMovies.filter(movie => !previousMovies.includes(movie.title));
  
  // Return 5 random movies from the available ones
  return newMovies.sort(() => Math.random() - 0.5).slice(0, 5);
}
