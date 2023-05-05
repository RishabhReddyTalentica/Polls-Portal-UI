import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserPollForm from './UserPollForm';


describe('UserPollForm component', () => {
    test('checks if options present or not', async () => {
        render(<UserPollForm navigate={undefined} />, { wrapper: BrowserRouter })
        const optionElements = await screen.findAllByRole("radio");
        expect(optionElements).not.toHaveLength(0);
    });
    test('checks if Cancel button is present or not', () => {
        render(<UserPollForm navigate={undefined} />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Cancel");
        expect(buttonElement).toBeInTheDocument();
    });

    test('checks if Submit poll button is present or not', () => {
        render(<UserPollForm navigate={undefined} />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Submit Poll");
        expect(buttonElement).toBeInTheDocument();
    });

})
