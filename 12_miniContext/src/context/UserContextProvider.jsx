import React, { useState } from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
    // Create state to hold user information
    const [user, setUser] = useState(null);

    return (
        // Provider component that shares user and setUser with all child components
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;