"use client";

import React, { useState } from 'react';
import '../admin_Pages/login.css';
import Base_Url from '@/config/Base_Url';
import Swal from 'sweetalert2';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({
        login: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { login: '', password: '' };

        // Login validation
        if (!login.trim()) {
            newErrors.login = 'Please enter your email, mobile number, or username';
            isValid = false;
        }

        // Password validation
        if (!password.trim()) {
            newErrors.password = 'Please enter your password';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await Base_Url.get('login', {
                params: {
                    login: login.trim(),
                    password: password
                }
            });

            console.log('Login Response:', response.data);

            if (response.data.success) {

                // Show success alert and WAIT for OK
                await Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                });

                // Save user after OK
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.data)
                );

                // Redirect after OK
                window.location.href = '/admin/User_master';

            } else {

                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: response.data.message || 'Login failed',
                    confirmButtonText: 'OK'
                });

            }

        } catch (error) {

            console.error('Login Error:', error);

            if (error.response) {

                await Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text:
                        error.response.data.message ||
                        error.response.data.error ||
                        'Invalid login credentials',
                    confirmButtonText: 'OK'
                });

            } else {

                await Swal.fire({
                    icon: 'error',
                    title: 'Server Error',
                    text: 'Unable to connect to server',
                    confirmButtonText: 'OK'
                });

            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">

                {/* Left Side */}
                <div className="brand-section">
                    <div className="brand-header">
                        <img
                            src="/vd-logo.png"
                            alt="Vaibhav Diamond Logo"
                            className="brand-logo"
                            onError={(e) => {
                                e.target.src = '/vd-logo.svg';
                            }}
                        />
                        <span className="brand-title">
                            VAIBHAV DIAMOND
                        </span>
                    </div>

                    <div className="brand-hero">
                        <h2>Excellence In Every Facet.</h2>
                        <p>
                            Sign in to manage diamond inventories,
                            track orders, and view dashboard analytics.
                        </p>
                    </div>

                    <div className="brand-footer-text">
                        <span>Crafted for brilliance & precision</span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="form-section">
                    <div className="form-box">

                        <div className="user-avatar-badge">
                            <svg
                                viewBox="0 0 24 24"
                                width="32"
                                height="32"
                                fill="currentColor"
                            >
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                            </svg>
                        </div>

                        <h3>Welcome Back</h3>

                        <p className="subtitle">
                            Enter your credentials to access your account
                        </p>

                        <form onSubmit={handleSubmit} noValidate>

                            {/* Login Input */}
                            <div className="input-group">

                                <label htmlFor="login">
                                    Email / Mobile Number / Username
                                </label>

                                <div
                                    className={`input-field ${errors.login ? 'input-error' : ''
                                        } `}
                                >
                                    <svg
                                        className="icon"
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>

                                    <input
                                        type="text"
                                        id="login"
                                        placeholder="Email, mobile number or username"
                                        value={login}
                                        onChange={(e) => {
                                            setLogin(e.target.value);

                                            if (errors.login) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    login: ''
                                                }));
                                            }
                                        }}
                                    />
                                </div>

                                {errors.login && (
                                    <span className="error-message">
                                        {errors.login}
                                    </span>
                                )}
                            </div>

                            {/* Password */}
                            <div className="input-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div
                                    className={`input-field ${errors.password
                                        ? 'input-error'
                                        : ''
                                        } `}
                                >
                                    <svg
                                        className="icon"
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect
                                            x="3"
                                            y="11"
                                            width="18"
                                            height="11"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>

                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);

                                            if (errors.password) {
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    password: ''
                                                }));
                                            }
                                        }}
                                    />
                                </div>

                                {errors.password && (
                                    <span className="error-message">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Options */}
                            <div className="form-options">

                                <label className="remember-me">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(e.target.checked)
                                        }
                                    />
                                    <span>Remember me</span>
                                </label>

                                <a
                                    href="#forgot"
                                    className="forgot-link"
                                >
                                    Forgot Password?
                                </a>

                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="login-button"
                            >
                                Sign In
                            </button>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
