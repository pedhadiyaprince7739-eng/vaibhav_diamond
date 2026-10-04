// src/app/components/TopNav.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './TopNav.module.css';
import { useRouter } from 'next/navigation';

export default function TopNav() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Remove logged-in user information
        localStorage.removeItem('user');

        // Go to admin/login page
        router.push('/admin');
    };

    return (
        <header className={styles.topNavWrapper}>
            {/* Search Input */}
            <div className={styles.searchBar}>
                <i
                    className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}
                ></i>

                <input
                    type="text"
                    placeholder="Search Diamond Lot No, Certificate, Shape..."
                />
            </div>

            {/* Right Controls & Profile */}
            <div
                className={styles.rightSection}
                ref={dropdownRef}
            >
                <button
                    className={styles.actionBtn}
                    title="Notifications"
                >
                    <i className="fa-regular fa-bell"></i>
                </button>

                {/* User Button */}
                <div
                    className={styles.userTrigger}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <div className={styles.userAvatar}>
                        <i className="fa-solid fa-user"></i>
                    </div>

                    <span className={styles.userName}>
                        Vaibhav Gems
                    </span>

                    <i
                        className="fa-solid fa-chevron-down"
                        style={{
                            fontSize: '11px',
                            transition: 'transform 0.2s',
                            transform: isOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
                        }}
                    ></i>
                </div>

                {/* Popup Dropdown */}
                {isOpen && (
                    <div className={styles.userDropdown}>
                        <div className={styles.dropdownHeader}>
                            <strong>Vaibhav Admin</strong>
                            <small>
                                admin@vaibhavdiamond.com
                            </small>
                        </div>

                        <ul className={styles.dropdownMenu}>
                            <li className={styles.dropdownItem}>
                                <i className="fa-regular fa-id-badge"></i>
                                <span>My Profile</span>
                            </li>

                            <li className={styles.dropdownItem}>
                                <i className="fa-solid fa-sliders"></i>
                                <span>Account Settings</span>
                            </li>

                            <li className={styles.dropdownItem}>
                                <i className="fa-solid fa-clock-rotate-left"></i>
                                <span>Activity Logs</span>
                            </li>

                            <li
                                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                                onClick={handleLogout}
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <span>Sign Out / Logout</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}