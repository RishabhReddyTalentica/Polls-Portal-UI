import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { Provider } from 'react-redux';
import store from '../../store/store';



describe('Admin Dashboard component', () => {
    test('checks if input text elements are present or not', async () => {
        render(<Provider store={store}><AdminDashboard /></Provider>, { wrapper: BrowserRouter });
        const inputElements = await screen.findAllByRole("link");
        expect(inputElements).not.toHaveLength(0);
    });

    test('checks if create new poll button is present or not', () => {
        render(<Provider store={store}><AdminDashboard /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Create new poll");
        expect(buttonElement).toBeInTheDocument();
    });

    test('check if Open Polls is present or not', () => {
        render(<Provider store={store}><AdminDashboard /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Open Polls");
        expect(buttonElement).toBeInTheDocument();
    });

    test('check if Closed Polls is present or not', () => {
        render(<Provider store={store}><AdminDashboard /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Closed Polls");
        expect(buttonElement).toBeInTheDocument();
    });

})
