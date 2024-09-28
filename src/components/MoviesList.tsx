import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Movie } from '../entities';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import { Navigation, Pagination } from 'swiper/modules';

const MoviesList: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Access the 'movies' collection in Firestore
        const moviesCollection = collection(db, 'movies');
        const moviesSnapshot = await getDocs(moviesCollection);
        const moviesList = moviesSnapshot.docs.map((doc) => doc.data() as Movie);

        // Randomly select movies for 'Trending'
        const trendingMoviesList = getRandomMovies(moviesList, 10); 

        // Filter out trending movies from the list for recommended section
        const remainingMovies = moviesList.filter(
          (movie) => !trendingMoviesList.includes(movie)
        );

        // Randomly select movies for Recommended section from the remaining movies
        const recommendedMoviesList = getRandomMovies(remainingMovies, 10);  

        // Update state
        setTrendingMovies(trendingMoviesList);
        setRecommendedMovies(recommendedMoviesList);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Utility function to select random movies
  const getRandomMovies = (movies: Movie[], count: number): Movie[] => {
    const shuffled = [...movies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black text-white relative px-5 md:px-20">
      <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
      <section className="flex space-x-4">
        {trendingMovies.length === 0 ? (
          <p>No trending movies available</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {trendingMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                  {/* <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                  <p><strong>Year:</strong> {movie.year}</p>
                  <p><strong>Genre:</strong> {movie.genre}</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
      <section className="flex space-x-4">
        {recommendedMovies.length === 0 ? (
          <p>No recommended movies available</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {recommendedMovies.map((movie, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                  />
                  {/* <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                  <p><strong>Year:</strong> {movie.year}</p>
                  <p><strong>Genre:</strong> {movie.genre}</p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
};

export default MoviesList;





