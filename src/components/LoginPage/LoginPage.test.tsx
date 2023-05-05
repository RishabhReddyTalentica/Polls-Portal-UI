import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';


describe('Login Page component', () => {
    //findAllByRole()=> returns promise for async req
    test('checks if input text elements are present or not', async () => {
        render(<LoginPage navigate={undefined} />, { wrapper: BrowserRouter });
        const inputElements = await screen.findAllByRole("textbox");
        expect(inputElements).toHaveLength(1);
    });

    test('checks if input password element is present or not', async () => {
        render(<LoginPage navigate={undefined} />, { wrapper: BrowserRouter });
        const inputElements = await screen.findByPlaceholderText('Enter password');
        expect(inputElements).toBeInTheDocument();
    });

    test('checks if SignUp button is present or not', () => {
        render(<LoginPage navigate={undefined} />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("SignUp");
        expect(buttonElement).toBeInTheDocument();
    });

    test('checks if Login button is present or not', () => {
        render(<LoginPage navigate={undefined} />, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Login");
        expect(buttonElement).toBeInTheDocument();
    });

})
