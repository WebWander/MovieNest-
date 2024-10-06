import Fuse from 'fuse.js';
import { getAllMovies } from './moviesService';
import { Movie } from '../entities';

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    
    const movies = await getAllMovies();

   
    const options = {
      keys: ['title', 'genre', 'actors', 'synopsis'] as (keyof Movie)[], 
      minMatchCharLength: 2,
      includeScore: true, 
      threshold: 0.3, 
    };

    // Create a Fuse instance with the movies data
    const fuse = new Fuse(movies, options);

   
    const results = fuse.search(query);

    
    return results.map((result) => result.item);
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};
