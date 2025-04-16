"use client";
import React, { useState } from 'react';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import './LoginPage.css';
import MainPage from './MainPage';

interface LoginErrors {
    email?: string;
    password?: string;
}

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    const validateForm = (): boolean => {
        const newErrors: LoginErrors = {};
        let isValid = true;

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {

        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Reset form
            setEmail('');
            setPassword('');
            setRememberMe(false);
            setIsLoggedIn(true); // Set login state to true

        }, 2000);
    };

    // Render MainPage if logged in
    if (isLoggedIn) {
        return <MainPage />;
    }
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Please login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className={`form-group ${errors.email ? 'error' : ''}`}>
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className={`form-group ${errors.password ? 'error' : ''}`}>
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="additional-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                            Remember me
                        </label>
                        <a href="/forgot-password" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="login-button" disabled={isLoading} >
                        {isLoading ? (
                            <>
                                <FaSpinner className="spinner" />
                                Logging in...

                            </>
                        ) : (
                            'Login'
                        )

                        }

                    </button>
                </form>

                <div className="signup-link">
                    Don&apos;t have an account? <a href="/signup">Sign up</a>
                </div>
            </div>
        </div>
    );
};


export default LoginPage;