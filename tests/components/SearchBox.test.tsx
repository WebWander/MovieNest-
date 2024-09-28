import { render, screen } from '@testing-library/react';
import SearchBox from '../../src/components/SearchBox';
import userEvent from '@testing-library/user-event';

describe('SearchBox', () => {
    const onChange = vi.fn();
    const renderSearchBox = () => {
        render(<SearchBox onChange={onChange}/>);

        return{
            input: screen.getByPlaceholderText(/search/i),
            onChange
        }
    }
    it('should render an input field for searching', () => {
        const { input } = renderSearchBox();
        expect(input).toBeInTheDocument(); 
    })

    it('should call onChange when enter is pressed', async () => {
        const { input, onChange } = renderSearchBox();
         const user = userEvent.setup();
         const searchTerm = 'SearchTerm';
         await user.type(input, searchTerm + '{enter}');

         expect(onChange).toHaveBeenCalledWith(searchTerm);
    })
   /*  it('should not call onChange if input field is empty', async () => {
        const { input, onChange } = renderSearchBox();
         const user = userEvent.setup();
         await user.type(input, '{enter}');

         expect(onChange).not.toHaveBeenCalled();
    }) */
})