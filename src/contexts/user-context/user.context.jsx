import { createContext, useState } from 'react';

export const UserContext = createContext({
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined: ''
        });
    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
};