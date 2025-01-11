import { useState, createContext, useContext } from 'react'

const GlobalContext = createContext(null)

export const GlobalState = (props) => {
    const [user, setUser] = useState(null)

    return (
        <GlobalContext.Provider value={[user, setUser]}>
            {props.children}
        </GlobalContext.Provider>
    )
}

// custom hook for retrieving the provided state
export const useUser = () => useContext(GlobalContext)
