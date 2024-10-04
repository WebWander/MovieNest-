import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllMovies } from '@/services/moviesService';
import { Movie } from '../entities';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { FaPlay, FaPlus, FaThumbsUp, FaChevronDown  } from 'react-icons/fa';
import MovieButton from './ui/MovieButton';


const MoviesByGenre: React.FC = () => {
  const { genre } = useParams<{ genre: string }>(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);


  const getDisplayRating = (rating: string): string => {
    switch (rating) {
      case 'R':
        return '17+';
      case 'PG-13':
        return '13+';
      case 'PG':
        return 'All Ages';
      default:
        return rating;
    }
  }; 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getAllMovies();

        const filteredMovies = allMovies.filter((movie) =>
          movie.genre.split(',').map((g) => g.trim().toLowerCase()).includes(genre?.toLowerCase() ?? '')
        );
        
        

        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (movies.length === 0) {
    return <p>No films found in the "{genre}" genre.</p>;
  }

  return (
    <div className='p-6'>
      <h2 className="text-3xl font-bold mb-16 p-10 md:px-10">
  {genre ? genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase() : 'Unknown'} Films
</h2>

      <section className="flex space-x-4">
        {movies.length === 0 ? (
          <p>No Films in this genre at the moment</p>
        ) : (
          <Carousel className="">
            <CarouselContent className="-ml-1">
              {movies.map((movie, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/5 ">
                  <div className="p-1">
                    <Card className="group relative rounded-md overflow-hidden transform transition text-white duration-300 hover:scale-105">
                      <CardContent className="flex items-center justify-center p-0">
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-full h-auto rounded-md"
                        />
                        <div className="absolute h-40 bottom-0 left-0 right-0 bg-black bg-opacity-90 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         {/*  <h3 className="text-lg font-semibold">{movie.title}</h3> */}
                         <div className="flex  mb-6">
                            <MovieButton
                              icon={<FaPlay />}
                              label="Play"
                            />
                             <MovieButton
                              icon={<FaThumbsUp />}
                              label="Like"
                            />
                            <MovieButton
                              icon={<FaPlus />}
                              label="Add to My List"
                            />
                            <div className="ml-16">
                             <MovieButton
                              icon={<FaChevronDown />}
                              label="Info"
                             />
                            </div>
                          </div>

                          
                         {/*  <p className="text-sm">
                            <strong>Year:</strong> {movie.year}
                          </p> */}
                          
                          <span className="px-2 border-2 border-neutral-700 rounded-md ">
                            {/* <strong>Rating:</strong>  */}{getDisplayRating(movie.rating)}
                          </span>

                          <p className="text-sm mt-4 ">
                            {/* <strong>Genre:</strong> */} {movie.genre}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>
    </div>
  );
};

export default MoviesByGenre;



