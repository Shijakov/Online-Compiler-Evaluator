import { useState, createContext } from 'react';

export const GlobalContext = createContext(null);

export const GlobalState = (props) => {
    const [user, setUser] = useState(null);

    const hasRole = (role) => {
        return isAuthenticated() && user.roles.includes(role);
    };

    const isAuthenticated = () => {
        return user != null;
    };

    return (
        <GlobalContext.Provider
            value={{
                user: { user, setUser, hasRole, isAuthenticated },
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
