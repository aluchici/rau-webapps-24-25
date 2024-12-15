import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSignUp(e) {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Sign-up successful. Please sign in.');
                navigate('/signin');
            } else {
                setError(data.error || 'Sign-up failed.');
            }
        } catch (err) {
            setError('Error connecting to server.');
        }
    }
    
    // const handleSignUp = async (e) => {
    //     e.preventDefault();
    //     setError('');

    //     try {
    //         const response = await fetch('http://localhost:5000/api/auth/signup', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email, password }),
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             alert('Sign-up successful. Please sign in.');
    //             navigate('/signin');
    //         } else {
    //             setError(data.error || 'Sign-up failed.');
    //         }
    //     } catch (err) {
    //         setError('Error connecting to server.');
    //     }
    // };

    // const onPasswordChange = (e) => setPassword(e.target.value);
    function onPasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <div style={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <br></br>
                <button type="submit" style={styles.button}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    input: {
        width: '200px',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
};

export default SignUpPage;
