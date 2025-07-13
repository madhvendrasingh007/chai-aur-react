import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';

function Login() {
    // Local state for form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Get setUser function from context to update global user state
    const { setUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation - check if fields are not empty
        if (username.trim() && password.trim()) {
            // Update global user state through context
            setUser({ username, password });
            
            // Clear form after successful login
            setUsername('');
            setPassword('');
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div style={loginStyles.container}>
            <h2>Login</h2>
            
            <form onSubmit={handleSubmit} style={loginStyles.form}>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={loginStyles.input}
                />
                
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={loginStyles.input}
                />
                
                <button type="submit" style={loginStyles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
}
// Dark theme styling for Login component
const loginStyles = {
    container: {
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '8px',
        margin: '10px 0',
        backgroundColor: '#1e1e1e',
        maxWidth: '400px',
        color: '#e0e0e0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        padding: '12px',
        border: '1px solid #333',
        borderRadius: '4px',
        fontSize: '14px',
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        outline: 'none',
        '&:focus': {
            borderColor: '#007bff'
        }
    },
    button: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '#0069d9'
        }
    }
};

export default Login;