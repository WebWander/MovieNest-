import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MoviesByGenre from '@/components/GenrePage';
import { getAllMovies } from '@/services/moviesService';
import { Mock, vi } from 'vitest';
import { ThemeProvider } from "@material-tailwind/react";

// Mock getAllMovies function
vi.mock('@/services/moviesService', () => ({
  getAllMovies: vi.fn(),
}));

vi.mock('@/components/ui/MovieButton', () => ({
  default: () => <div>Mocked MovieButton</div>,
}));


// Mock the carousel components
vi.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Previous</button>,
}));

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('MoviesByGenre', () => {
  const mockMovies = [
    {
      id: '1',
      title: 'Inception',
      year: 2010,
      rating: 'PG-13',
      actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
      genre: 'Action, Adventure, Sci-Fi',
      synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      thumbnail: 'https://example.com/inception.jpg',
    },
    {
      id: '2',
      title: 'The Dark Knight',
      year: 2008,
      rating: 'PG-13',
      actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      genre: 'Action, Crime, Drama',
      synopsis: 'When the menace known as the Joker emerges from his mysterious past...',
      thumbnail: 'https://example.com/dark-knight.jpg',
    },
  ];

  it('should display movies of a specific genre', async () => {
    (getAllMovies as Mock).mockResolvedValue(mockMovies);

    renderWithProviders(
      <MemoryRouter initialEntries={['/category/action']}>
        <Routes>
          <Route path="/category/:genre" element={<MoviesByGenre />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Action Films')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByAltText('Inception')).toBeInTheDocument();
      expect(screen.getByAltText('The Dark Knight')).toBeInTheDocument();
    });
  });
});
