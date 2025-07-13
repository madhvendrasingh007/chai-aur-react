import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

function Profile() {
    // Get user data from context
    const { user, setUser } = useContext(UserContext);

    const handleLogout = () => {
        // Clear user data from context (logout)
        setUser(null);
    };

    // Show message if user is not logged in
    if (!user) {
        return (
            <div style={profileStyles.container}>
                <h2>Profile</h2>
                <p>Please log in first</p>
            </div>
        );
    }

    // Show user profile if logged in
    return (
        <div style={profileStyles.container}>
            <h2>Profile</h2>
            <div style={profileStyles.userInfo}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Password:</strong> {user.password}</p>
                <p><strong>Status:</strong> Logged In</p>
            </div>
            
            <button onClick={handleLogout} style={profileStyles.logoutButton}>
                Logout
            </button>
        </div>
    );
}

// Basic styling for Profile component
const profileStyles = {
    container: {
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '8px',
        margin: '10px 0',
        backgroundColor: '#1e1e1e',
        maxWidth: '400px',
        color: '#e0e0e0'
    },
    userInfo: {
        backgroundColor: '#2d2d2d',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '15px',
        border: '1px solid #333'
    },
    logoutButton: {
        padding: '12px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '#c82333'
        }
    }
};

export default Profile;