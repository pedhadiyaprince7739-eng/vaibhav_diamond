// src/app/components/Sidebar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const pathname = usePathname();

    // Diamond Business Specific Navigation Menus with FontAwesome icons
    const menuItems = [
        { label: 'Dashboard', icon: 'fa-solid fa-chart-pie', path: '/admin/Sidebar_Navbar' },
        { label: 'User Master', icon: 'fa-solid fa-user-gear', path: '/admin/User_master' },
        { label: 'Diamond Inventory', icon: 'fa-solid fa-gem', path: '/inventory' },
        { label: 'Rough Diamonds', icon: 'fa-solid fa-shapes', path: '/rough' },
        { label: 'Polished Goods', icon: 'fa-solid fa-ring', path: '/polished' },
        { label: 'Certificates (GIA/IGI)', icon: 'fa-solid fa-certificate', path: '/certificates' },
        { label: 'B2B Sales & Orders', icon: 'fa-solid fa-cart-flatbed', path: '/orders' },
        { label: 'Customers / Parties', icon: 'fa-solid fa-users', path: '/parties' },
        { label: 'Pricing & Rapaport', icon: 'fa-solid fa-scale-balanced', path: '/pricing' },
        { label: 'Settings', icon: 'fa-solid fa-sliders', path: '/settings' },
    ];

    return (
        <aside className={styles.sidebarContainer}>
            {/* Logo & Brand Header */}
            <div className={styles.logoSection}>
                <Image
                    src="/vd-logo.png"
                    alt="Vaibhav Diamond Logo"
                    width={40}
                    height={40}
                    className={styles.logoImg}
                />
                <div className={styles.brandInfo}>
                    <h2>VAIBHAV</h2>
                    <span>DIAMOND HUB</span>
                </div>
            </div>

            {/* Navigation List */}
            <ul className={styles.menuList}>
                {menuItems.map((item, index) => {
                    const isActive = pathname === item.path;
                    return (
                        <li key={index} className={styles.menuItem}>
                            <Link
                                href={item.path}
                                className={`${styles.menuLink} ${isActive ? styles.activeMenu : ''}`}
                            >
                                <i className={`${item.icon} ${styles.menuIcon}`}></i>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Bottom Status / Footer */}
            <div className={styles.sidebarFooter}>
                <span><i className="fa-solid fa-shield-halved"></i> Certified Portal</span>
                <span>v1.0</span>
            </div>
        </aside>
    );
}