import { render, screen, waitFor } from '@testing-library/react';
import MoviesList from '../../src/components/MoviesList';
import { Movie } from '../../src/entities';
import { vi } from 'vitest';
import { getDocs } from 'firebase/firestore';


// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
    getFirestore: vi.fn(),
    collection: vi.fn(),
    getDocs: vi.fn(),
}));

describe('MoviesList', () => {
  it('should render loading state initially', () => {
    render(<MoviesList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  /* it('should render no movies if there are no movies in the database', async () => {
    
    (getDocs as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      docs: [],
    });

    render(<MoviesList />);

    
    await waitFor(() => {
        expect(screen.getByRole('paragraph', { name: /no movies/i })).toBeInTheDocument();
      });
  }); */

  it('should render trending and recommended movies', async () => {
    const mockMovies: Movie[] = [
      {
        title: 'Inception',
        year: 2010,
        rating: 'PG-13',
        actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
        genre: 'Action, Adventure, Sci-Fi',
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        thumbnail: 'https://example.com/inception.jpg',
        trending: true,
        recommended: true,
      },
      {
        title: 'The Dark Knight',
        year: 2008,
        rating: 'PG-13',
        actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
        genre: 'Action, Crime, Drama',
        synopsis: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
        thumbnail: 'https://example.com/dark-knight.jpg',
        trending: true,
        recommended: false,
      },
    ];

    // Mock getDocs to return a list of movies
    (getDocs as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      docs: mockMovies.map((movie) => ({
        data: () => movie,
      })),
    });

    render(<MoviesList />);

    
    await waitFor(() => {
      mockMovies.forEach((movie) => {
        expect(screen.getByAltText(movie.title)).toBeInTheDocument();
      });
    });
  });
});
