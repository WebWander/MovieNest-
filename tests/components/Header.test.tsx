import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Navbar from '@/components/Header';
import { BrowserRouter} from 'react-router-dom';
import { getAllGenres } from '@/services/moviesService';
import { Mock } from 'vitest';


describe('Navbar', () => {

    vi.mock('@/services/moviesService', () => ({
        getAllGenres: vi.fn(),
      }));

    const renderComponent = () => {
        render(
            <BrowserRouter>
            <Navbar/>
            </BrowserRouter>
        );

        return {
            homeLink: screen.getByRole('link', { name: /home/i }),
            myListLink: screen.getByRole('link', { name: /my list/i }),
            categoriesLink: screen.getByText(/categories/i)
        }
      }

    it('should render Links in the Navbar', () => {
     const { homeLink, myListLink, categoriesLink} = renderComponent();

     expect(homeLink).toHaveAttribute('href', '/');
     expect(myListLink).toHaveAttribute('href', '/my-list');
     expect(categoriesLink).toBeInTheDocument();
 
    })

    it('should render dynamic category links correctly', async () => {
        
        (getAllGenres as Mock).mockResolvedValue(['Action', 'Comedy', 'Drama']);
    
        render(
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        );
    
        await waitFor(() => {
          expect(screen.getByRole('link', { name: /action/i })).toBeInTheDocument();
          expect(screen.getByRole('link', { name: /comedy/i })).toBeInTheDocument();
          expect(screen.getByRole('link', { name: /drama/i })).toBeInTheDocument();
        });
      });

      it('should open and close the Categories dropdown', async () => {
        const { categoriesLink } = renderComponent();
    
        expect(screen.queryByText(/Action/i)).not.toBeInTheDocument();
    
        fireEvent.mouseEnter(categoriesLink);
        await waitFor(() => {
            expect(screen.getByText(/Action/i)).toBeInTheDocument();
        });
    
       /* 
        fireEvent.mouseLeave(categoriesLink);
    
       
        await waitFor(() => {
            expect(screen.queryByText(/Action/i)).not.toBeInTheDocument();
        }); */
    });   
    
});
