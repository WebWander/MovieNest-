import { render, screen, waitFor } from '@testing-library/react';
import SearchComponent from '@/components/SearchBox';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import { searchMovies } from '@/services/SearchService';

vi.mock('@/services/SearchService', () => ({
     searchMovies: vi.fn(),
  }));

describe('SearchBox', () => {
    const onChange = vi.fn();
    const renderSearchBox = () => {
        render(
            <BrowserRouter>
            <SearchComponent/>
            </BrowserRouter>
        );

        return{
            input: screen.getByPlaceholderText(/search/i),
            onChange
        }
    }
    it('should render an input field for searching', () => {
        const { input } = renderSearchBox();
        expect(input).toBeInTheDocument(); 
    })

    it('should call searchMovies when enter is pressed', async () => {
        const mockSearchMovies = searchMovies as Mock;
        mockSearchMovies.mockResolvedValueOnce([]); 
        const { input } = renderSearchBox();

        const user = userEvent.setup();
        const query = 'SearchTerm';
    
        // Type in the input field and press Enter
        await user.type(input, `${query}{enter}`);
    
        await waitFor(() => {
            expect(mockSearchMovies).toHaveBeenCalledWith(query);
          });
      });

  /*   it('should call onChange when enter is pressed', async () => {
        const { input, onChange } = renderSearchBox();
         const user = userEvent.setup();
         const searchTerm = 'SearchTerm';
         await user.type(input, searchTerm + '{enter}');

         expect(onChange).toHaveBeenCalledWith(searchTerm);
    }) */
   /*  it('should not call onChange if input field is empty', async () => {
        const { input, onChange } = renderSearchBox();
         const user = userEvent.setup();
         await user.type(input, '{enter}');

         expect(onChange).not.toHaveBeenCalled();
    }) */
})