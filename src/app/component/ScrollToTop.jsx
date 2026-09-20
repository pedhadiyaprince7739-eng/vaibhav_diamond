"use client";
import React, { useState, useEffect } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 280) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        // Initial check in case page loads scrolled down
        toggleVisibility();

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            className={`vd-scroll-to-top ${isVisible ? "is-visible" : ""}`}
            onClick={handleScrollToTop}
            aria-label="Scroll to top of page"
            title="Scroll to top"
        >
            <span className="vd-scroll-glow" aria-hidden="true" />
            <svg
                className="vd-scroll-icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
            </svg>
            <span className="vd-scroll-tooltip">Back to Top</span>
        </button>
    );
}
