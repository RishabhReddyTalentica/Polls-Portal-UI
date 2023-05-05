import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreatePoll from './CreatePoll';
import { Provider } from 'react-redux';
import store from '../../store/store';



describe('CreatePoll component', () => {
    test('checks if input poll name element is present or not', async () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const inputElements = await screen.findByPlaceholderText('Enter poll name');
        expect(inputElements).toBeInTheDocument();
    });
    test('checks if input question label element is present or not', async () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const inputElements = await screen.findByPlaceholderText('Enter question');
        expect(inputElements).toBeInTheDocument();
    });
    test('checks if Add Question button is present or not', () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Add Question");
        expect(buttonElement).toBeInTheDocument();
    });
    test('checks if Add Question button click is working or not', async () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Add Question");
        fireEvent.click(buttonElement);
        const inputElements = await screen.findAllByPlaceholderText('Enter question');
        expect(inputElements).not.toHaveLength(1);
    });

    test('checks if Add Option button is present or not', () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Add Option");
        expect(buttonElement).toBeInTheDocument();
    });

    test('checks if Add Option button click is working or not', async () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Add Option");
        fireEvent.click(buttonElement);
        const inputElements = await screen.findAllByPlaceholderText('Enter option', { exact: false });
        expect(inputElements).not.toHaveLength(2);
    });

    test('checks if Cancel button is present or not', () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Cancel");
        expect(buttonElement).toBeInTheDocument();
    });

    test('checks if Submit Poll button is present or not', () => {
        render(<Provider store={store}><CreatePoll navigate={undefined} /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Submit Poll");
        expect(buttonElement).toBeInTheDocument();
    });

})
