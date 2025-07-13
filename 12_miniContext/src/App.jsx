// ========================
// File: src/App.jsx
// ========================

import React from 'react';
import UserContextProvider from './context/UserContextProvider';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
    return (
        <UserContextProvider>
            <div style={appStyles.container}>
                <h1>React Context API Demo</h1>
                <p style={appStyles.description}>
                    This demo shows how Context API allows components to share state 
                    without prop drilling. The Login and Profile components can both 
                    access and modify the user state directly through context.
                </p>
                
                <Login />
                <Profile />
            </div>
        </UserContextProvider>
    );
}

const appStyles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#242424',
        minHeight: '100vh',
        color: '#e0e0e0'
    },
    description: {
        backgroundColor: '#1e1e1e',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#bbbbbb',
        border: '1px solid #333'
    }
};

export default App;