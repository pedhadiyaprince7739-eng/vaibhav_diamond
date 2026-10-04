"use client";

import React, { useState } from 'react';
import '../admin_Pages/Master_Pages.css';
import Base_Url from '@/config/Base_Url';

const User_Master = () => {
    const initialForm = {
        userName: '',
        email: '',
        mobile: '',
        role: '',
        password: '',
        isActive: true,
    };

    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const roleMapping = {
        Admin: 1,
        Manager: 2,
        Staff: 3,
        Broker: 4,
    };

    // Field Validation on Change
    const validateField = (name, value) => {
        let errorMsg = '';

        switch (name) {
            case 'userName':
                if (!value.trim()) {
                    errorMsg = 'Full name is required.';
                } else if (value.trim().length < 3) {
                    errorMsg = 'Name must be at least 3 characters.';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    errorMsg = 'Email address is required.';
                } else if (!emailRegex.test(value)) {
                    errorMsg = 'Please enter a valid email address.';
                }
                break;

            case 'mobile':
                const mobileRegex = /^[0-9]{10}$/;
                if (!value.trim()) {
                    errorMsg = 'Mobile number is required.';
                } else if (!mobileRegex.test(value.replace(/\s+/g, ''))) {
                    errorMsg = 'Enter a valid 10-digit mobile number.';
                }
                break;

            case 'role':
                if (!value) {
                    errorMsg = 'Please select a user role.';
                }
                break;

            case 'password':
                if (!value) {
                    errorMsg = 'Password is required.';
                } else if (value.length < 6) {
                    errorMsg = 'Password must be at least 6 characters.';
                }
                break;

            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    };

    // OnChange Handler
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: fieldValue }));
        validateField(name, fieldValue);
        if (successMessage) setSuccessMessage(false);
    };

    // Validate All Fields on Submit Click
    const validateForm = () => {
        const newErrors = {};

        if (!formData.userName.trim()) {
            newErrors.userName = 'Full name is required.';
        } else if (formData.userName.trim().length < 3) {
            newErrors.userName = 'Name must be at least 3 characters.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required.';
        } else if (!mobileRegex.test(formData.mobile.replace(/\s+/g, ''))) {
            newErrors.mobile = 'Enter a valid 10-digit mobile number.';
        }

        if (!formData.role) {
            newErrors.role = 'Please select a user role.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setErrorMessage('');

        // Prepare database payload
        const payload = {
            user_name: formData.userName.trim(),
            email_id: formData.email.trim(),
            mobile_number: Number(formData.mobile.trim()),
            password: Number(formData.password.trim()),
            role: roleMapping[formData.role] || 1,
            status: formData.isActive ? 1 : 0,
            created_by: 1,
        };

        try {
            const response = await Base_Url.post('/', payload);

            if (response.data && response.data.success) {
                setSuccessMessage(true);
                handleCancel();
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 4000);
            } else {
                setErrorMessage(response.data.message || 'Failed to save user.');
            }
        } catch (err) {
            console.error('API Error:', err);
            const serverError = err.response?.data?.error || err.response?.data?.message;
            setErrorMessage(serverError || 'Network error: Unable to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialForm);
        setErrors({});
    };

    return (
        <div className="um-master-wrapper">
            <div className="um-master-box">
                {/* Header */}
                <div className="um-header">
                    <div className="um-header-left">
                        <div className="um-header-avatar">
                            <i className="fa-solid fa-user-shield"></i>
                        </div>
                        <div className="um-header-titles">
                            <h2>User Master</h2>
                            <p>Create and manage system user accounts, privileges & credentials</p>
                        </div>
                    </div>
                    <div className="um-brand-badge">
                        <i className="fa-solid fa-gem"></i>
                        <span>Vaibhav Diamond ERP</span>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="um-success-banner">
                        <i className="fa-solid fa-circle-check"></i>
                        <span>User details saved successfully!</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="um-form">
                        {/* Row 1: Full Name & Email */}
                        <div className="um-grid-2">
                            {/* Full Name */}
                            <div className="um-field-group">
                                <label className="um-label" htmlFor="userName">
                                    <span>Full Name <span className="um-req">*</span></span>
                                </label>
                                <div className={`um-input-container ${errors.userName ? 'input-error' : ''}`}>
                                    <div className="um-input-icon">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                    <input
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        placeholder="e.g. Ramesh Patel"
                                        value={formData.userName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.userName && (
                                    <span className="um-error-msg">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {errors.userName}
                                    </span>
                                )}
                            </div>

                            {/* Email Address */}
                            <div className="um-field-group">
                                <label className="um-label" htmlFor="email">
                                    <span>Email Address <span className="um-req">*</span></span>
                                </label>
                                <div className={`um-input-container ${errors.email ? 'input-error' : ''}`}>
                                    <div className="um-input-icon">
                                        <i className="fa-regular fa-envelope"></i>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="user@vaibhavdiamond.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="um-error-msg">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 2: Mobile Number & User Role */}
                        <div className="um-grid-2">
                            {/* Mobile Number */}
                            <div className="um-field-group">
                                <label className="um-label" htmlFor="mobile">
                                    <span>Mobile Number <span className="um-req">*</span></span>
                                </label>
                                <div className={`um-input-container ${errors.mobile ? 'input-error' : ''}`}>
                                    <div className="um-input-icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="9876543210"
                                        maxLength="10"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.mobile && (
                                    <span className="um-error-msg">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {errors.mobile}
                                    </span>
                                )}
                            </div>

                            {/* User Role */}
                            <div className="um-field-group">
                                <label className="um-label" htmlFor="role">
                                    <span>User Role <span className="um-req">*</span></span>
                                </label>
                                <div className={`um-input-container ${errors.role ? 'input-error' : ''}`}>
                                    <div className="um-input-icon">
                                        <i className="fa-solid fa-shield-halved"></i>
                                    </div>
                                    <select
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select User Role</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Staff">Staff</option>
                                        <option value="Broker">Broker</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down um-select-arrow"></i>
                                </div>
                                {errors.role && (
                                    <span className="um-error-msg">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {errors.role}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 3: Password & Account Status */}
                        <div className="um-grid-2">
                            {/* Password */}
                            <div className="um-field-group">
                                <label className="um-label" htmlFor="password">
                                    <span>Password <span className="um-req">*</span></span>
                                </label>
                                <div className={`um-input-container ${errors.password ? 'input-error' : ''}`}>
                                    <div className="um-input-icon">
                                        <i className="fa-solid fa-lock"></i>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="••••••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="um-toggle-btn"
                                        title={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="um-error-msg">
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            {/* Account Status Switch */}
                            <div className="um-field-group">
                                <label className="um-label">
                                    <span>Account Status</span>
                                </label>
                                <label className="um-status-card" htmlFor="isActive">
                                    <div className="um-status-left">
                                        <span className={`um-status-dot ${formData.isActive ? 'active' : ''}`}></span>
                                        <div>
                                            <div className="um-status-text">
                                                {formData.isActive ? 'Active Account' : 'Inactive Account'}
                                            </div>
                                            <div className="um-status-subtext">
                                                {formData.isActive ? 'User can log in & access ERP' : 'Access suspended'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="um-switch">
                                        <input
                                            type="checkbox"
                                            id="isActive"
                                            name="isActive"
                                            checked={formData.isActive}
                                            onChange={handleChange}
                                        />
                                        <span className="um-slider"></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="um-footer">
                        <div className="um-footer-hint">
                            <i className="fa-solid fa-circle-info"></i>
                            <span>All fields marked with <b style={{ color: '#ef4444' }}>*</b> are mandatory</span>
                        </div>
                        <div className="um-footer-actions">
                            <button type="button" className="um-btn-cancel" onClick={handleCancel}>
                                <i className="fa-solid fa-rotate-left"></i>
                                <span>Reset</span>
                            </button>
                            <button type="submit" className="um-btn-save">
                                <i className="fa-solid fa-check"></i>
                                <span>Save User</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default User_Master;