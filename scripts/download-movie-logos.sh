#!/bin/bash

# Create the movie-logos directory if it doesn't exist
mkdir -p public/movie-logos

# Download and process movie logos
# Mad Max: Fury Road
curl -o public/movie-logos/mad-max-fury-road.jpg "https://image.tmdb.org/t/p/w500/8tZYtuWezp8xLHAsfFp80E8XhXD.jpg"

# John Wick
curl -o public/movie-logos/john-wick.jpg "https://image.tmdb.org/t/p/w500/5vHssUeVe25bMrof1HyaPyWgaP.jpg"

# The Grand Budapest Hotel
curl -o public/movie-logos/grand-budapest-hotel.jpg "https://image.tmdb.org/t/p/w500/9D4fCYp8jQZgqOZPrLdQxqK9q3h.jpg"

# The Shawshank Redemption
curl -o public/movie-logos/shawshank-redemption.jpg "https://image.tmdb.org/t/p/w500/q6y0GoNCtsSl8z3bXxKU1a4vBPE.jpg"

# Inception
curl -o public/movie-logos/inception.jpg "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"

# Make the script executable
chmod +x scripts/download-movie-logos.sh 