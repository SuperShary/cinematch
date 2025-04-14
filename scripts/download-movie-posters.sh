#!/bin/bash

# Create directory if it doesn't exist
mkdir -p public/movie-logos

# Download movie posters from TMDB
# Mad Max: Fury Road (ID: 76341)
curl -L "https://image.tmdb.org/t/p/w1280/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg" -o public/movie-logos/mad-max-fury-road.jpg

# John Wick (ID: 245891)
curl -L "https://image.tmdb.org/t/p/w1280/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg" -o public/movie-logos/john-wick.jpg

# Mission: Impossible - Fallout (ID: 353081)
curl -L "https://image.tmdb.org/t/p/w1280/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg" -o public/movie-logos/mission-impossible.jpg

# The Dark Knight (ID: 155)
curl -L "https://image.tmdb.org/t/p/w1280/qJ2tW6WMUDux911r6m7haRef0WH.jpg" -o public/movie-logos/the-dark-knight.jpg

# The Grand Budapest Hotel (ID: 120467)
curl -L "https://image.tmdb.org/t/p/w1280/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" -o public/movie-logos/grand-budapest-hotel.jpg

# Pulp Fiction (ID: 680)
curl -L "https://image.tmdb.org/t/p/w1280/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" -o public/movie-logos/pulp-fiction.jpg

# The Shawshank Redemption (ID: 278)
curl -L "https://image.tmdb.org/t/p/w1280/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" -o public/movie-logos/shawshank-redemption.jpg

# Parasite (ID: 496243)
curl -L "https://image.tmdb.org/t/p/w1280/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" -o public/movie-logos/parasite.jpg

# Inception (ID: 27205)
curl -L "https://image.tmdb.org/t/p/w1280/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg" -o public/movie-logos/inception.jpg

# Children of Men (ID: 9693)
curl -L "https://image.tmdb.org/t/p/w1280/8I37NtDffNV7AZlDa7uDvvqhovU.jpg" -o public/movie-logos/children-of-men.jpg 