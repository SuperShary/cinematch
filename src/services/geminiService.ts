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
        platforms: ["Netflix", "HBO Max"]
      },
      {
        title: "John Wick",
        year: "2014",
        rating: "7.4/10",
        description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took his car.",
        whyUserMightLikeIt: `Keanu Reeves delivers a compelling performance in this stylish action thriller with brilliantly choreographed fight sequences. ${userName}, if you appreciate meticulous world-building and non-stop action, this film delivers.`,
        platforms: ["Prime Video", "Hulu"]
      },
      {
        title: "The Dark Knight",
        year: "2008",
        rating: "9.0/10",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        whyUserMightLikeIt: `${userName}, this film redefines superhero movies with its complex characters, gritty realism, and Heath Ledger's unforgettable performance as the Joker.`,
        platforms: ["Netflix", "Prime Video"]
      },
      {
        title: "Inception",
        year: "2010",
        rating: "8.8/10",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        whyUserMightLikeIt: `Christopher Nolan's mind-bending thriller combines stunning visuals with a complex, multi-layered plot. ${userName}, if you enjoy films that challenge your perception of reality, this is a must-see.`,
        platforms: ["Hulu", "Disney+"]
      },
      {
        title: "Mission: Impossible - Fallout",
        year: "2018",
        rating: "7.8/10",
        description: "Ethan Hunt and his IMF team must track down stolen plutonium while being monitored by a CIA agent after a mission gone wrong.",
        whyUserMightLikeIt: `Tom Cruise delivers breathtaking stunts in this action-packed installment of the Mission: Impossible series. ${userName}, if you appreciate practical effects and relentless pacing, this film will keep you thoroughly entertained.`,
        platforms: ["Amazon Prime", "HBO Max"]
      }
    ],
    'Comedy': [
      {
        title: "Superbad",
        year: "2007",
        rating: "7.6/10",
        description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        whyUserMightLikeIt: `${userName}, this coming-of-age comedy perfectly captures teenage awkwardness with hilarious performances from Jonah Hill and Michael Cera. Its authentic portrayal of friendship makes the outrageous humor even more impactful.`,
        platforms: ["Netflix", "Hulu"]
      },
      {
        title: "The Grand Budapest Hotel",
        year: "2014",
        rating: "8.1/10",
        description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy under the hotel's eccentric concierge.",
        whyUserMightLikeIt: `Wes Anderson's visually stunning comedy features a stellar ensemble cast and quirky humor. ${userName}, if you appreciate meticulous set design and whimsical storytelling, this film is a delight.`,
        platforms: ["Disney+", "Prime Video"]
      },
      {
        title: "21 Jump Street",
        year: "2012",
        rating: "7.2/10",
        description: "A pair of underachieving cops are sent back to high school to blend in and bring down a synthetic drug ring.",
        whyUserMightLikeIt: `Channing Tatum and Jonah Hill's comedic chemistry shines in this hilarious action-comedy. ${userName}, if you enjoy self-aware humor and over-the-top action sequences, this film is a blast.`,
        platforms: ["Netflix", "Starz"]
      },
      {
        title: "Bridesmaids",
        year: "2011",
        rating: "6.8/10",
        description: "Competition between the maid of honor and a bridesmaid threatens to upend the life of an out-of-work pastry chef.",
        whyUserMightLikeIt: `Kristen Wiig leads a talented ensemble cast in this raunchy and heartfelt comedy. ${userName}, if you appreciate female-driven humor and relatable characters, this film is a must-watch.`,
        platforms: ["Hulu", "Peacock"]
      },
      {
        title: "This Is Spinal Tap",
        year: "1984",
        rating: "7.9/10",
        description: "A mockumentary on a fictional heavy metal band, chronicling their disastrous U.S. tour.",
        whyUserMightLikeIt: `This cult classic mockumentary is a hilarious send-up of rock documentaries. ${userName}, if you enjoy clever satire and quotable lines, this film is a comedic masterpiece.`,
        platforms: ["HBO Max", "Criterion Channel"]
      }
    ],
    'Drama': [
      {
        title: "The Shawshank Redemption",
        year: "1994",
        rating: "9.3/10",
        description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        whyUserMightLikeIt: `${userName}, this film's powerful storytelling about hope and perseverance resonates deeply with audiences. The emotional journey of Andy Dufresne is both heartbreaking and ultimately uplifting.`,
        platforms: ["HBO Max", "Prime Video"]
      },
      {
        title: "The Godfather",
        year: "1972",
        rating: "9.2/10",
        description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        whyUserMightLikeIt: `Francis Ford Coppola's epic crime drama is a cinematic masterpiece with unforgettable performances. ${userName}, if you appreciate complex characters and a gripping story, this film is essential viewing.`,
        platforms: ["Paramount+", "Showtime"]
      },
      {
        title: "Pulp Fiction",
        year: "1994",
        rating: "8.9/10",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        whyUserMightLikeIt: `Quentin Tarantino's groundbreaking crime film is a stylish and endlessly quotable masterpiece. ${userName}, if you enjoy non-linear storytelling and sharp dialogue, this film is a must-see.`,
        platforms: ["Netflix", "Hulu"]
      },
      {
        title: "Schindler's List",
        year: "1993",
        rating: "8.9/10",
        description: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        whyUserMightLikeIt: `Steven Spielberg's powerful historical drama is a harrowing and unforgettable depiction of the Holocaust. ${userName}, this film's emotional impact and historical significance make it an essential viewing experience.`,
        platforms: ["Peacock", "Prime Video"]
      },
      {
        title: "Forrest Gump",
        year: "1994",
        rating: "8.8/10",
        description: "Forrest Gump, a man with a low IQ, recounts the early years of his life, during which he found himself in the middle of key historical events.",
        whyUserMightLikeIt: `Robert Zemeckis' heartwarming and nostalgic film is a celebration of life's unexpected journeys. ${userName}, if you appreciate feel-good stories and memorable characters, this film is a classic.`,
        platforms: ["Hulu", "Paramount+"]
      }
    ],
    'Sci-Fi': [
      {
        title: "Blade Runner 2049",
        year: "2017",
        rating: "8.0/10",
        description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
        whyUserMightLikeIt: `${userName}, this visually stunning sequel expands on the original's themes with breathtaking cinematography and a thought-provoking story about what it means to be human.`,
        platforms: ["HBO Max", "Netflix"]
      },
      {
        title: "Arrival",
        year: "2016",
        rating: "7.9/10",
        description: "A linguist is recruited by the military to assist in translating alien communications.",
        whyUserMightLikeIt: `Denis Villeneuve's thought-provoking sci-fi film explores themes of communication and understanding. ${userName}, if you appreciate films that challenge your perspective and offer a unique narrative, this is a must-see.`,
        platforms: ["Paramount+", "Prime Video"]
      },
      {
        title: "Interstellar",
        year: "2014",
        rating: "8.6/10",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        whyUserMightLikeIt: `Christopher Nolan's visually stunning sci-fi epic combines scientific concepts with emotional storytelling. ${userName}, if you enjoy films that explore the vastness of space and the depths of human connection, this is a must-watch.`,
        platforms: ["Hulu", "Amazon Prime"]
      },
      {
        title: "Gravity",
        year: "2013",
        rating: "7.7/10",
        description: "Two astronauts work together to survive after an accident leaves them alone in space.",
        whyUserMightLikeIt: `Alfonso Cuarón's visually stunning space thriller is a gripping and immersive experience. ${userName}, if you appreciate films that push the boundaries of visual effects and create intense suspense, this is a must-see.`,
        platforms: ["HBO Max", "Netflix"]
      },
      {
        title: "Children of Men",
        year: "2006",
        rating: "7.9/10",
        description: "In a dystopian future where women are infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
        whyUserMightLikeIt: `Alfonso Cuarón's gritty and realistic sci-fi film is a chilling depiction of a world without hope. ${userName}, if you appreciate films that blend social commentary with intense action sequences, this is a must-watch.`,
        platforms: ["Peacock", "Hulu"]
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
        title: "Parasite",
        year: "2019",
        rating: "8.5/10",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        whyUserMightLikeIt: `${userName}, this Oscar-winning thriller masterfully blends social commentary with unpredictable plot twists. Director Bong Joon-ho creates perfect tension as the story shifts between darkly funny and deeply unsettling.`,
        platforms: ["Hulu", "Prime Video"]
      },
      {
        title: "The Silence of the Lambs",
        year: "1991",
        rating: "8.6/10",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        whyUserMightLikeIt: `Jonathan Demme's chilling thriller features unforgettable performances from Jodie Foster and Anthony Hopkins. ${userName}, if you appreciate suspenseful storytelling and complex characters, this film is a must-see.`,
        platforms: ["HBO Max", "Paramount+"]
      },
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

  // If no genre match, return empty array
  if (!allMockMovies[genre]) {
    return [];
  }
  
  // If there are previous movies, filter them out to avoid duplicates
  let availableMovies = allMockMovies[genre];
  if (previousMovies.length > 0) {
    availableMovies = availableMovies.filter(movie => 
      !previousMovies.includes(movie.title)
    );
  }
  
  // Return 5 movies or fewer if there aren't enough left
  return availableMovies.slice(0, 5);
}
