import { render, screen, waitFor, act } from '@testing-library/react';
import MoviesList from '../../src/components/MoviesList';
import { Movie } from '../../src/entities';
import { getDocs } from 'firebase/firestore';
import { Mock } from 'vitest';
import { vi } from 'vitest';

// Mock Firebase Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
}));

describe('MoviesList', () => {
  it('should render loading state initially', () => {
    // Use act to wrap the rendering of the component
    act(() => {
      render(<MoviesList />);
    });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render no movies if there are no movies in the database', async () => {
    // Mock getDocs to return an empty list of movies
    (getDocs as Mock).mockResolvedValue({
      docs: [],
    });

    // Wrap the rendering in act
    await act(async () => {
      render(<MoviesList />);
    });

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByText(/no trending movies available/i)).toBeInTheDocument();
      expect(screen.getByText(/no recommended movies available/i)).toBeInTheDocument();
    });
  });

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
    (getDocs as Mock).mockResolvedValue({
      docs: mockMovies.map((movie) => ({
        data: () => movie,
      })),
    });

    // Wrap rendering and subsequent actions in act
   act( () => {
      render(<MoviesList />);
    });

    // Wait for the component to finish loading and render movies
    await waitFor(() => {
      mockMovies.forEach((movie) => {
        expect(screen.getByAltText(movie.title)).toBeInTheDocument();
      });
    });
  });
});
