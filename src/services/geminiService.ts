
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

Keep responses simple, friendly, and cleanly formatted for display.
    `;
  } else {
    return `
Hi Gemini 👋,
A user named ${userName} already received recommendations for these ${genre} movies:
${previousMovies.join(', ')}

Please suggest 5 **new, unique** top-rated ${genre} movies they haven't seen yet, using the same format as before.
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
        whyUserMightLikeIt: `High-octane action sequences with minimal CGI and incredible stunt work make this a visual masterpiece. If you enjoy immersive action that keeps you on the edge of your seat, ${userName}, this is a must-watch!`
      },
      {
        title: "John Wick",
        year: "2014",
        rating: "7.4/10",
        description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took his car.",
        whyUserMightLikeIt: `Keanu Reeves delivers a compelling performance in this stylish action thriller with brilliantly choreographed fight sequences. ${userName}, if you appreciate meticulous world-building and non-stop action, this film delivers.`
      },
      {
        title: "The Raid",
        year: "2011",
        rating: "7.6/10",
        description: "A S.W.A.T. team becomes trapped in a tenement run by a ruthless mobster and his army of killers and thugs.",
        whyUserMightLikeIt: `This Indonesian action masterpiece features some of the most incredible martial arts sequences ever filmed. ${userName}, if you're looking for raw, brutal combat choreography, this film raises the bar.`
      },
      {
        title: "Mission: Impossible - Fallout",
        year: "2018",
        rating: "7.7/10",
        description: "Ethan Hunt and his IMF team must track down missing plutonium while being monitored by a CIA agent after a mission goes wrong.",
        whyUserMightLikeIt: `Tom Cruise performs incredible stunts in this high-stakes spy thriller. ${userName}, the breathtaking action sequences and complex plot will keep you thoroughly entertained.`
      },
      {
        title: "Die Hard",
        year: "1988",
        rating: "8.2/10",
        description: "An NYPD officer tries to save his wife and several others taken hostage by German terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
        whyUserMightLikeIt: `This classic defined the action genre with its perfect blend of tension, humor, and spectacular set pieces. ${userName}, you'll appreciate the charismatic performance by Bruce Willis and how this film influenced countless action movies that followed.`
      },
      {
        title: "The Matrix",
        year: "1999",
        rating: "8.7/10",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        whyUserMightLikeIt: `Groundbreaking visual effects combined with philosophical themes make this a revolutionary action film. ${userName}, the innovative "bullet time" sequences and martial arts choreography created a new visual language for action cinema.`
      },
      {
        title: "Edge of Tomorrow",
        year: "2014",
        rating: "7.9/10",
        description: "A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.",
        whyUserMightLikeIt: `This sci-fi action film combines thrilling combat sequences with a clever time-loop concept. ${userName}, you'll enjoy the character development and how the film balances intense action with unexpected humor.`
      },
      {
        title: "Inception",
        year: "2010",
        rating: "8.8/10",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        whyUserMightLikeIt: `Christopher Nolan's mind-bending thriller features innovative action sequences that defy gravity and reality. ${userName}, if you appreciate action that challenges your perception while delivering spectacular visuals, this film is perfect for you.`
      },
      {
        title: "Terminator 2: Judgment Day",
        year: "1991",
        rating: "8.5/10",
        description: "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son from an even more advanced and powerful cyborg.",
        whyUserMightLikeIt: `This sequel redefined what action movies could be with groundbreaking special effects and explosive set pieces. ${userName}, the perfect blend of character development, suspense, and innovative action sequences makes this a must-see classic.`
      },
      {
        title: "Kill Bill: Vol. 1",
        year: "2003",
        rating: "8.1/10",
        description: "After awakening from a four-year coma, a former assassin seeks vengeance against the team of assassins who betrayed her.",
        whyUserMightLikeIt: `Quentin Tarantino's stylish revenge thriller features extraordinary martial arts sequences and a compelling story. ${userName}, the vibrant visual style and Uma Thurman's powerful performance create an unforgettable action experience.`
      }
    ],
    'Comedy': [
      {
        title: "Superbad",
        year: "2007",
        rating: "7.6/10",
        description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        whyUserMightLikeIt: `${userName}, this coming-of-age comedy perfectly captures teenage awkwardness with hilarious performances from Jonah Hill and Michael Cera. Its authentic portrayal of friendship makes the outrageous humor even more impactful.`
      },
      {
        title: "The Grand Budapest Hotel",
        year: "2014",
        rating: "8.1/10",
        description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        whyUserMightLikeIt: `Wes Anderson's meticulously crafted visual style combines with witty dialogue and absurd situations. ${userName}, if you appreciate quirky humor and stunning aesthetics, this film offers a uniquely delightful experience.`
      },
      {
        title: "Bridesmaids",
        year: "2011",
        rating: "6.8/10",
        description: "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
        whyUserMightLikeIt: `This groundbreaking female-led comedy blends hilarious set pieces with genuine emotional depth. ${userName}, the talented ensemble cast led by Kristen Wiig delivers performances that are both outrageously funny and surprisingly touching.`
      },
      {
        title: "Shaun of the Dead",
        year: "2004",
        rating: "7.9/10",
        description: "A man's uneventful life is disrupted by the zombie apocalypse.",
        whyUserMightLikeIt: `Edgar Wright's zombie comedy perfectly blends horror tropes with brilliant comedic timing. ${userName}, if you enjoy smart humor with a dash of heart and gore, this genre-bending film will be right up your alley.`
      },
      {
        title: "The Hangover",
        year: "2009",
        rating: "7.7/10",
        description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
        whyUserMightLikeIt: `This raunchy comedy follows an increasingly absurd mystery with unexpected twists and memorable characters. ${userName}, the chemistry between the lead actors creates comedic gold as they piece together their wild night.`
      },
      {
        title: "Airplane!",
        year: "1980",
        rating: "7.7/10",
        description: "A man afraid to fly must ensure that a plane lands safely after the pilots become sick.",
        whyUserMightLikeIt: `This classic parody film pioneered the spoof genre with its rapid-fire gags and absurdist humor. ${userName}, if you enjoy clever wordplay and visual jokes that reward multiple viewings, this influential comedy is essential.`
      },
      {
        title: "What We Do in the Shadows",
        year: "2014",
        rating: "7.7/10",
        description: "A documentary team films the lives of a group of vampires for a few months. The vampires share a house in Wellington, New Zealand.",
        whyUserMightLikeIt: `This mockumentary blends supernatural elements with mundane roommate problems to create unique comedic situations. ${userName}, Taika Waititi's distinct style of humor shines through with deadpan delivery and surprising heart.`
      },
      {
        title: "Dumb and Dumber",
        year: "1994",
        rating: "7.3/10",
        description: "After a woman leaves a briefcase at the airport terminal, a dumb limo driver and his dumber friend set out on a hilarious cross-country road trip to Aspen to return it.",
        whyUserMightLikeIt: `Jim Carrey and Jeff Daniels commit fully to their characters' ridiculous antics in this road trip comedy. ${userName}, if you enjoy physical comedy and absurd situations taken to their logical extreme, this film delivers non-stop laughs.`
      },
      {
        title: "This Is Spinal Tap",
        year: "1984",
        rating: "7.9/10",
        description: "Filmmaker Marty DiBergi follows the rock band Spinal Tap on their disastrous reunion tour.",
        whyUserMightLikeIt: `This groundbreaking mockumentary about a fictional heavy metal band pioneered a new style of comedy. ${userName}, its improvisational style and quotable lines have influenced comedy for decades, and it only gets funnier with repeated viewings.`
      },
      {
        title: "Ghostbusters",
        year: "1984",
        rating: "7.8/10",
        description: "Three former parapsychology professors set up shop as a unique ghost removal service.",
        whyUserMightLikeIt: `This beloved classic perfectly blends supernatural elements with dry wit and physical comedy. ${userName}, the chemistry between Bill Murray, Dan Aykroyd, and Harold Ramis creates comedic magic in this film that defined 80s comedy.`
      }
    ],
    'Drama': [
      {
        title: "The Shawshank Redemption",
        year: "1994",
        rating: "9.3/10",
        description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
        whyUserMightLikeIt: `${userName}, this film's powerful storytelling about hope and perseverance resonates deeply with audiences. The emotional journey of Andy Dufresne is both heartbreaking and ultimately uplifting.`
      },
      {
        title: "The Godfather",
        year: "1972",
        rating: "9.2/10",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        whyUserMightLikeIt: `This masterpiece of cinema features extraordinary performances and meticulous direction by Francis Ford Coppola. ${userName}, its complex examination of family, power, and morality creates a rich dramatic experience.`
      },
      {
        title: "12 Angry Men",
        year: "1957",
        rating: "9.0/10",
        description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
        whyUserMightLikeIt: `Set almost entirely in one room, this film creates incredible tension through dialogue and character development. ${userName}, if you appreciate psychological depth and moral complexity, this classic will captivate you.`
      },
      {
        title: "Schindler's List",
        year: "1993",
        rating: "9.0/10",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        whyUserMightLikeIt: `Spielberg's unflinching portrayal of the Holocaust is both devastating and essential viewing. ${userName}, the film's powerful message about human dignity and moral courage makes it an unforgettable experience.`
      },
      {
        title: "Whiplash",
        year: "2014",
        rating: "8.5/10",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
        whyUserMightLikeIt: `The intense relationship between student and teacher creates electrifying drama with outstanding performances. ${userName}, if you're drawn to stories about the pursuit of excellence and its psychological cost, this film will resonate with you.`
      },
      {
        title: "Eternal Sunshine of the Spotless Mind",
        year: "2004",
        rating: "8.3/10",
        description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
        whyUserMightLikeIt: `This inventive film explores love, memory, and regret through a science fiction premise. ${userName}, the emotional depth and innovative storytelling create a uniquely moving experience.`
      },
      {
        title: "Moonlight",
        year: "2016",
        rating: "7.4/10",
        description: "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
        whyUserMightLikeIt: `This visually stunning and emotionally resonant coming-of-age story explores universal themes with remarkable sensitivity. ${userName}, the film's poetic approach to storytelling creates moments of profound beauty and truth.`
      },
      {
        title: "Marriage Story",
        year: "2019",
        rating: "7.9/10",
        description: "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
        whyUserMightLikeIt: `Scarlett Johansson and Adam Driver deliver raw, authentic performances in this intimate portrait of divorce. ${userName}, if you appreciate nuanced character studies that avoid simplistic villains and heroes, this film offers remarkable emotional insight.`
      },
      {
        title: "There Will Be Blood",
        year: "2007",
        rating: "8.2/10",
        description: "A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.",
        whyUserMightLikeIt: `Daniel Day-Lewis gives a towering performance in Paul Thomas Anderson's epic about ambition and corruption. ${userName}, the film's striking visuals and haunting score create an unforgettable portrait of obsession.`
      },
      {
        title: "Parasite",
        year: "2019",
        rating: "8.5/10",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        whyUserMightLikeIt: `This Oscar-winning film seamlessly blends social commentary with thrilling storytelling. ${userName}, its unpredictable narrative shifts and incisive examination of inequality create a wholly original dramatic experience.`
      }
    ],
    'Sci-Fi': [
      {
        title: "Blade Runner 2049",
        year: "2017",
        rating: "8.0/10",
        description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
        whyUserMightLikeIt: `${userName}, this visually stunning sequel expands on the original's themes with breathtaking cinematography and a thought-provoking story about what it means to be human.`
      },
      {
        title: "Arrival",
        year: "2016",
        rating: "7.9/10",
        description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
        whyUserMightLikeIt: `This intelligent sci-fi film focuses on language and communication rather than typical alien invasion tropes. ${userName}, its emotional core and mind-bending concept of time create a uniquely moving experience.`
      },
      {
        title: "Ex Machina",
        year: "2014",
        rating: "7.7/10",
        description: "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
        whyUserMightLikeIt: `This claustrophobic thriller explores artificial intelligence with minimalist precision. ${userName}, if you enjoy psychological sci-fi that raises profound questions about consciousness and manipulation, this film delivers.`
      },
      {
        title: "Children of Men",
        year: "2006",
        rating: "7.9/10",
        description: "In a chaotic world in which women have become somehow infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea.",
        whyUserMightLikeIt: `Alfonso Cuarón's dystopian film features incredible long-take sequences and a gritty, realistic vision of the future. ${userName}, its themes of hope amid societal collapse feel increasingly relevant.`
      },
      {
        title: "The Martian",
        year: "2015",
        rating: "8.0/10",
        description: "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive and can survive until a potential rescue.",
        whyUserMightLikeIt: `This optimistic sci-fi adventure celebrates scientific problem-solving and human resilience. ${userName}, Matt Damon's charismatic performance makes the technical challenges engaging and often surprisingly funny.`
      },
      {
        title: "Interstellar",
        year: "2014", 
        rating: "8.6/10",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        whyUserMightLikeIt: `Christopher Nolan's ambitious space epic combines spectacular visuals with emotional family drama. ${userName}, the film's exploration of love transcending dimensions adds heart to its mind-bending physics.`
      },
      {
        title: "Her",
        year: "2013",
        rating: "8.0/10", 
        description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
        whyUserMightLikeIt: `Spike Jonze's intimate sci-fi romance explores connection in the digital age with remarkable sensitivity. ${userName}, if you appreciate science fiction that prioritizes emotional depth over spectacle, this film offers a uniquely touching experience.`
      },
      {
        title: "Dune",
        year: "2021",
        rating: "8.0/10",
        description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        whyUserMightLikeIt: `Denis Villeneuve's adaptation brings Herbert's epic world to life with awe-inspiring scale and visual poetry. ${userName}, the film's immersive world-building and political intrigue offer a rich sci-fi experience.`
      },
      {
        title: "Annihilation",
        year: "2018",
        rating: "6.8/10",
        description: "A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don't apply.",
        whyUserMightLikeIt: `This visually striking and conceptually daring film explores themes of self-destruction and transformation. ${userName}, if you enjoy atmospheric sci-fi horror that prioritizes mood and metaphor over exposition, this film creates an unforgettable experience.`
      },
      {
        title: "Snowpiercer",
        year: "2013",
        rating: "7.1/10",
        description: "In a future where a failed climate-change experiment has killed all life except for the lucky few who boarded the Snowpiercer, a train that travels around the globe, a new class system emerges.",
        whyUserMightLikeIt: `Bong Joon-ho's stylish dystopian thriller uses its train setting as a powerful metaphor for class struggle. ${userName}, the film's creative action sequences and social commentary create a unique sci-fi experience.`
      }
    ],
    'Romance': [
      {
        title: "Before Sunrise",
        year: "1995",
        rating: "8.1/10",
        description: "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna. Unfortunately, both know that this will probably be their only night together.",
        whyUserMightLikeIt: `${userName}, this film captures the magic of an unexpected connection through natural dialogue and authentic performances. Its celebration of meaningful conversation feels increasingly rare in modern romance films.`
      },
      {
        title: "The Notebook",
        year: "2004",
        rating: "7.8/10",
        description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
        whyUserMightLikeIt: `This beloved romantic drama features powerful chemistry between Rachel McAdams and Ryan Gosling. ${userName}, if you enjoy sweeping love stories that span decades, this emotional film will resonate with you.`
      },
      {
        title: "Call Me By Your Name",
        year: "2017",
        rating: "7.9/10",
        description: "In 1980s Italy, romance blossoms between a seventeen-year-old student and the older man hired as his father's research assistant.",
        whyUserMightLikeIt: `Luca Guadagnino's sun-drenched coming-of-age romance captures the intensity of first love. ${userName}, the film's lush cinematography and sensitive performances create a deeply sensory experience.`
      },
      {
        title: "Pride & Prejudice",
        year: "2005",
        rating: "7.8/10",
        description: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
        whyUserMightLikeIt: `This visually stunning adaptation of Jane Austen's classic novel features wonderful performances and gorgeous cinematography. ${userName}, the electric chemistry between Keira Knightley and Matthew Macfadyen brings this beloved story to vibrant life.`
      },
      {
        title: "Her",
        year: "2013",
        rating: "8.0/10",
        description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
        whyUserMightLikeIt: `Spike Jonze's unique romance explores connection and intimacy in the digital age. ${userName}, if you appreciate unconventional love stories that blend emotional depth with thought-provoking concepts, this film offers something truly special.`
      },
      {
        title: "The Shape of Water",
        year: "2017",
        rating: "7.3/10",
        description: "At a top secret research facility in the 1960s, a lonely janitor forms a unique relationship with an amphibious creature that is being held in captivity.",
        whyUserMightLikeIt: `Guillermo del Toro's fantasy romance combines stunning visuals with a touching story about outcasts finding connection. ${userName}, the film's beautiful production design and emotional performances create a unique romantic fable.`
      },
      {
        title: "Portrait of a Lady on Fire",
        year: "2019",
        rating: "8.1/10",
        description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman.",
        whyUserMightLikeIt: `This visually stunning period romance explores the female gaze and forbidden love with extraordinary sensitivity. ${userName}, the film's deliberate pacing and visual storytelling create a deeply immersive romantic experience.`
      },
      {
        title: "The Eternal Sunshine of the Spotless Mind",
        year: "2004",
        rating: "8.3/10",
        description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
        whyUserMightLikeIt: `Charlie Kaufman's innovative screenplay explores love and memory through a science fiction concept. ${userName}, if you enjoy romances that balance emotional depth with conceptual creativity, this unique film will captivate you.`
      },
      {
        title: "About Time",
        year: "2013",
        rating: "7.8/10",
        description: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
        whyUserMightLikeIt: `This charming British film uses its time travel premise to explore appreciating everyday moments. ${userName}, beyond the romance, its heartfelt examination of father-son relationships adds unexpected emotional depth.`
      },
      {
        title: "Casablanca",
        year: "1942",
        rating: "8.5/10",
        description: "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
        whyUserMightLikeIt: `This timeless classic features iconic performances and some of cinema's most memorable lines. ${userName}, if you appreciate romances where love and sacrifice intertwine with historical events, this influential film remains unmatched.`
      }
    ],
    'Thriller': [
      {
        title: "Parasite",
        year: "2019",
        rating: "8.5/10",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        whyUserMightLikeIt: `${userName}, this Oscar-winning thriller masterfully blends social commentary with unpredictable plot twists. Director Bong Joon-ho creates perfect tension as the story shifts between darkly funny and deeply unsettling.`
      },
      {
        title: "The Silence of the Lambs",
        year: "1991",
        rating: "8.6/10",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
        whyUserMightLikeIt: `This psychological thriller features unforgettable performances from Jodie Foster and Anthony Hopkins. ${userName}, the cat-and-mouse dynamic creates unbearable tension in this perfectly crafted film.`
      },
      {
        title: "Prisoners",
        year: "2013",
        rating: "8.1/10",
        description: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts.",
        whyUserMightLikeIt: `Denis Villeneuve's gripping thriller explores moral ambiguity and desperation with stunning cinematography. ${userName}, Hugh Jackman and Jake Gyllenhaal deliver powerful performances in this emotionally intense mystery.`
      },
      {
        title: "Get Out",
        year: "2017",
        rating: "7.8/10",
        description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        whyUserMightLikeIt: `Jordan Peele's innovative thriller blends social commentary with genuine scares. ${userName}, if you appreciate films that combine suspense with thought-provoking themes, this groundbreaking thriller delivers.`
      },
      {
        title: "Gone Girl",
        year: "2014",
        rating: "8.1/10",
        description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
        whyUserMightLikeIt: `David Fincher's adaptation of Gillian Flynn's novel features shocking twists and dark examinations of marriage. ${userName}, the film's precise direction and Rosamund Pike's incredible performance create a memorably disturbing experience.`
      },
      {
        title: "Nightcrawler",
        year: "2014",
        rating: "7.9/10",
        description: "When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant to become the star of his own story.",
        whyUserMightLikeIt: `Jake Gyllenhaal's unsettling performance anchors this neo-noir about media ethics and ambition. ${userName}, the film's nocturnal Los Angeles setting creates a perfect backdrop for this disturbing character study.`
      },
      {
        title: "No Country for Old Men",
        year: "2007",
        rating: "8.2/10",
        description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
        whyUserMightLikeIt: `The Coen Brothers' adaptation of Cormac McCarthy's novel features incredible tension and Javier Bardem's iconic villain. ${userName}, the film's sparse dialogue and stunning cinematography create a uniquely suspenseful experience.`
      },
      {
        title: "Shutter Island",
        year: "2010",
        rating: "8.2/10",
        description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane.",
        whyUserMightLikeIt: `Martin Scorsese's psychological thriller features Leonardo DiCaprio in a gripping performance full of paranoia and dread. ${userName}, the film's striking visuals and mind-bending story will keep you guessing until the final reveal.`
      },
      {
        title: "Zodiac",
        year: "2007",
        rating: "7.7/10",
        description: "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
        whyUserMightLikeIt: `David Fincher's meticulous thriller focuses on the investigation rather than the violence, creating mounting obsession and dread. ${userName}, if you appreciate attention to detail and the psychological toll of unsolved mysteries, this film is exceptional.`
      },
      {
        title: "The Prestige",
        year: "2006",
        rating: "8.5/10",
        description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
        whyUserMightLikeIt: `Christopher Nolan's twisty thriller about rival magicians features incredible performances and mind-bending reveals. ${userName}, the film's structure mirrors a magic trick itself, rewarding multiple viewings with new details.`
      }
    ],
    'Horror': [
      {
        title: "Hereditary",
        year: "2018",
        rating: "7.3/10",
        description: "A grieving family is haunted by tragic and disturbing occurrences after the death of their secretive grandmother.",
        whyUserMightLikeIt: `${userName}, this atmospheric horror film features an incredible performance by Toni Collette and builds unbearable tension through family drama before unleashing its supernatural elements.`
      },
      {
        title: "The Witch",
        year: "2015",
        rating: "6.9/10",
        description: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
        whyUserMightLikeIt: `Robert Eggers' period horror film creates dread through its authentic setting and religious paranoia. ${userName}, if you appreciate slow-burning atmospheric terror over jump scares, this film's meticulous attention to detail creates genuine unease.`
      },
      {
        title: "Get Out",
        year: "2017",
        rating: "7.8/10",
        description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        whyUserMightLikeIt: `Jordan Peele's groundbreaking social thriller combines genuine scares with incisive commentary. ${userName}, the film's perfect balance of tension, horror, and dark humor creates an unforgettable viewing experience.`
      },
      {
        title: "The Shining",
        year: "1980",
        rating: "8.4/10",
        description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
        whyUserMightLikeIt: `Stanley Kubrick's masterpiece of psychological horror features iconic performances and visually stunning sequences. ${userName}, the film's deliberate pacing and mounting dread create an atmosphere of inescapable terror.`
      },
      {
        title: "It Follows",
        year: "2014",
        rating: "6.8/10",
        description: "A young woman is followed by an unknown supernatural force after a sexual encounter.",
        whyUserMightLikeIt: `This innovative horror film creates terror through its relentless, slow-moving threat and haunting synth score. ${userName}, if you appreciate horror that builds genuine dread rather than relying on jump scares, this film's unique premise will stay with you.`
      },
      {
        title: "The Babadook",
        year: "2014",
        rating: "6.8/10",
        description: "A single mother and her child fall into a deep well of paranoia when an eerie children's book titled 'Mister Babadook' manifests in their home.",
        whyUserMightLikeIt: `This Australian horror film uses its monster as a brilliant metaphor for grief and depression. ${userName}, the powerful central performance and psychological depth elevate this beyond typical monster movies.`
      },
      {
        title: "A Quiet Place",
        year: "2018",
        rating: "7.5/10",
        description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
        whyUserMightLikeIt: `This innovative thriller creates unbearable tension through its sound design and premise. ${userName}, the film's focus on family dynamics amidst horror elements adds emotional depth to the scares.`
      },
      {
        title: "The Descent",
        year: "2005",
        rating: "7.2/10",
        description: "A caving expedition goes horribly wrong, as the explorers become trapped and ultimately pursued by a strange breed of predators.",
        whyUserMightLikeIt: `This claustrophobic horror film builds tension even before the monsters appear. ${userName}, if you're afraid of tight spaces, this film's cave setting alone will terrify you before the creatures even show up.`
      },
      {
        title: "Midsommar",
        year: "2019",
        rating: "7.1/10",
        description: "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
        whyUserMightLikeIt: `Ari Aster's folk horror occurs almost entirely in bright daylight, subverting traditional horror tropes. ${userName}, the film's stunning visuals and examination of toxic relationships create a uniquely disturbing experience.`
      },
      {
        title: "Let the Right One In",
        year: "2008",
        rating: "7.9/10",
        description: "Oskar, a bullied 12-year-old, befriends Eli, a peculiar girl who only appears at night and is revealed to be a vampire.",
        whyUserMightLikeIt: `This Swedish vampire film blends horror with a touching coming-of-age story. ${userName}, the film's chilly atmosphere and unique perspective make it an unforgettable entry in vampire cinema.`
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
