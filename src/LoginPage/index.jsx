import React, { useState, useEffect } from 'react';
import './styles.css';

const LoginPage = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(prevState => !prevState);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <h2>Login</h2>
            <form>
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <div className="oauth-buttons">
                <button>Login with Google</button>
            </div>
            <div className="staff-login">
                <button>Staff Login</button>
            </div>
            <div className="image-container">
                <img
                    className={fadeIn ? 'fade-in' : ''}
                    src="C:\Users\Harsh\viman\public\lady-1.jpg"
                    alt="Fading"
                />
            </div>
        </div>
    );
}

export default LoginPage;
