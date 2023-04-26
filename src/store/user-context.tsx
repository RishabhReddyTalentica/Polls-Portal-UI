import React, { useState, useCallback } from 'react';
import { UserData } from '../models/UserData';


const AuthContext = React.createContext<{
    userData: UserData | null;
    isLoggedIn: boolean;
    login: (userData: any) => void;
    logout: () => void
}>({
    userData: null,
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
});

const retrieveStoredToken = () => {
    const storedUserData = localStorage.getItem('userData');
    return {
        userData: storedUserData && JSON.parse(storedUserData)
    };
};

export const AuthContextProvider = (props: any) => {
    const tokenData = retrieveStoredToken();

    let initialUserData: any;
    if (tokenData) {
        initialUserData = tokenData.userData;
    }

    const [userData, setUserData] = useState<UserData | null>(initialUserData);

    const userIsLoggedIn = !!userData;

    const logoutHandler = useCallback(() => {
        setUserData(null);
        localStorage.removeItem('userData');
    }, []);

    const loginHandler = (userData: UserData) => {
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
    };


    const contextValue = {
        userData: userData,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
