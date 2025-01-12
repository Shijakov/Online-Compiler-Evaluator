import { useState, createContext, useContext } from 'react';

export const GlobalContext = createContext(null);

export const GlobalState = (props) => {
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider
            value={{
                user: [user, setUser],
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
