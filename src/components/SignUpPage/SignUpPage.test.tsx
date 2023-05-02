import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from './SignUpPage';

describe('SignUp component', () => {
    test('checks if dropdown is present or not', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter })
        const optionElements = await screen.findAllByRole("option");
        expect(optionElements).toHaveLength(3);
    });
    //findAllByRole()=> returns promise for async req
    test('checks if input text elements are present or not', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const inputElements = await screen.findAllByRole("textbox");
        expect(inputElements).toHaveLength(3);
    });
    test('checks if input password element is present or not', async () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const inputElements = await screen.findByPlaceholderText('Enter password');
        expect(inputElements).toBeInTheDocument();
    });
    test('checks if submit button is present or not', () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Submit");
        expect(buttonElement).toBeInTheDocument();
    });

    test('checks if cancel button is present or not', () => {
        render(<SignUpPage />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Cancel");
        expect(buttonElement).toBeInTheDocument();
    });

})
