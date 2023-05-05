import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import UserDashboard from './UserDashboard';
import ReactDOM from 'react-dom';
import { TIMEOUT } from 'dns';




describe('User Dashboard component', () => {
    beforeAll(() => {
        ReactDOM.createPortal = jest.fn((element: any, node) => {
            return element;
        });
    });

    test('check if Online Polls is present or not', () => {
        render(<Provider store={store}><UserDashboard /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Online Polls");
        expect(buttonElement).toBeInTheDocument();
    });

    test('check if Submitted Polls is present or not', () => {
        render(<Provider store={store}><UserDashboard /></Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Submitted Polls");
        expect(buttonElement).toBeInTheDocument();
    });

})
