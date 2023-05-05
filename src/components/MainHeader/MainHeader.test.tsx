import { render, screen } from '@testing-library/react';
import MainHeader from './MainHeader';
import AuthContext from '../../store/user-context';
import { BrowserRouter } from 'react-router-dom';

describe('Main Header component', () => {
    test('renders main header before login', () => {
        render(<AuthContext.Provider value={{
            userData: null,
            isLoggedIn: false,
            login: (token) => { },
            logout: () => { },
        }}>
            <MainHeader children={""} navigate={undefined} />
        </AuthContext.Provider>, { wrapper: BrowserRouter })
        const buttonElement = screen.queryByText("Logout");
        expect(buttonElement).toBeNull();
    });
    //findAllByRole()=> returns promise for async req
    test('renders main header after login', () => {
        render(<AuthContext.Provider value={{
            userData: null,
            isLoggedIn: true,
            login: (token) => { },
            logout: () => { },
        }}>
            <MainHeader children={""} navigate={undefined} />
        </AuthContext.Provider>, { wrapper: BrowserRouter });
        const buttonElement = screen.getByText("Logout");
        expect(buttonElement).toBeInTheDocument();
    });
})
