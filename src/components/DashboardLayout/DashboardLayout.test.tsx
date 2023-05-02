import { render, screen } from '@testing-library/react';

import AuthContext from '../../store/user-context';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { UserData } from "../../models/UserData";


const User: UserData = {
    email: "rishabh@talentica.com",
    firstName: "Rishabh",
    lastName: "Reddy",
    role: "User",
}
const Admin: UserData = {
    email: "rishabh@talentica.com",
    firstName: "Rishabh",
    lastName: "Reddy",
    role: "Admin",
}
describe('Dashboard Layout component', () => {
    test('renders user dashboard heading', () => {
        render(<AuthContext.Provider value={{
            userData: User,
            isLoggedIn: true,
            login: (token) => { },
            logout: () => { },
        }}>
            <DashboardLayout children={""} />
        </AuthContext.Provider>, { wrapper: BrowserRouter })
        const textElement = screen.getByText("User Dashboard", { exact: false });
        expect(textElement).toBeInTheDocument();
    });
    test('renders admin dashboard heading', () => {
        render(<AuthContext.Provider value={{
            userData: Admin,
            isLoggedIn: true,
            login: (token) => { },
            logout: () => { },
        }}>
            <DashboardLayout children={""} />
        </AuthContext.Provider>, { wrapper: BrowserRouter })
        const textElement = screen.getByText("Admin Dashboard", { exact: false });
        expect(textElement).toBeInTheDocument();
    });
})
