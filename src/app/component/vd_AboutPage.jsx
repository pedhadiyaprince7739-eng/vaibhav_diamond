"use client";
import React, { useState, useEffect, useRef } from "react";
import "../component/vd_AboutPage.css";

function AnimatedCounter({ end, duration = 2200, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(ease * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

function VaibhavLogo({ className = "vd-logo-img" }) {
    return (
        <img
            src="/vd-logo.png"
            alt="Vaibhav Diamond Logo"
            className={className}
        />
    );
}

const STATS = [
    { value: 30, suffix: "+", label: "Years Experience" },
    { value: 100, suffix: "%", label: "Conflict Free" },
    { value: 10000, suffix: "+", label: "Polished Stones" },
    { value: 99, suffix: "%", label: "Triple Excellent Cut" },
];

export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <div className="vd-page-wrapper">
            {/* Top Navbar */}
            <header className="vd-header">
                <div className="vd-container vd-header-inner">
                    <a href="/" className="vd-brand">
                        <VaibhavLogo />
                        <div className="vd-brand-text">
                            <span className="vd-brand-name">VAIBHAV</span>
                            <span className="vd-brand-sub">DIAMOND</span>
                        </div>
                    </a>

                    <nav className="vd-nav vd-desktop-nav" aria-label="Main Navigation">
                        <a href="/" className="vd-nav-link">Home</a>
                        <a href="/About_Us" className="vd-nav-link is-active">About Us</a>
                        {/* <a href="/Working" className="vd-nav-link">Working</a> */}
                        <a href="/Contact_Us" className="vd-nav-link">Contact Us</a>
                    </nav>

                    <a href="/Contact_Us" className="vd-contact-btn vd-desktop-btn">
                        Get in Touch
                    </a>

                    {/* Mobile Hamburger Button (Exact design from user image) */}
                    <button
                        type="button"
                        className={`vd-mobile-menu-btn ${mobileMenuOpen ? "is-active" : ""}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className="vd-menu-bar"></span>
                        <span className="vd-menu-bar"></span>
                        <span className="vd-menu-bar"></span>
                    </button>
                </div>
            </header>

            {/* Mobile Drawer Overlay Backdrop */}
            <div
                className={`vd-drawer-overlay ${mobileMenuOpen ? "is-open" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Left-Sliding Navigation Drawer */}
            <aside
                className={`vd-mobile-drawer ${mobileMenuOpen ? "is-open" : ""}`}
                aria-label="Mobile Navigation"
            >
                <div className="vd-drawer-header">
                    <a
                        href="/"
                        className="vd-brand vd-drawer-brand"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <VaibhavLogo className="vd-drawer-logo" />
                        <div className="vd-brand-text">
                            <span className="vd-brand-name">VAIBHAV</span>
                            <span className="vd-brand-sub">DIAMOND</span>
                        </div>
                    </a>
                    <button
                        type="button"
                        className="vd-drawer-close-btn"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="Close navigation menu"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <nav className="vd-drawer-nav">
                    <a
                        href="/"
                        className="vd-drawer-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Home</span>
                    </a>
                    <a
                        href="/About_Us"
                        className="vd-drawer-link is-active"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">About Us</span>
                    </a>
                    {/* <a
                        href="/Working"
                        className="vd-drawer-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Working</span>
                    </a> */}
                    <a
                        href="/Contact_Us"
                        className="vd-drawer-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Contact Us</span>
                    </a>
                </nav>

                <div className="vd-drawer-footer">
                    <a
                        href="/Contact_Us"
                        className="vd-btn-primary vd-drawer-cta"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Get in Touch
                    </a>
                    <div className="vd-drawer-tagline">
                        <span className="vd-drawer-loc">📍 Rajkot, Gujarat</span>
                        <span className="vd-drawer-sub">Fancy Diamond Cutting & Polishing Workshop</span>
                    </div>
                </div>
            </aside>

            <main>
                {/* About Hero Section */}
                <section className="vd-about-hero">
                    <div className="vd-about-hero-glow" />
                    <div className="vd-container">
                        <span className="vd-kicker">Dedicated Workshop • Rajkot, Gujarat</span>
                        <h1>Fancy Diamond Cutting & Polishing</h1>
                        <p>
                            A premier workshop dedicated exclusively to the precision cutting, shaping, and polishing of natural fancy shape diamonds with supreme lapidary mastery and cutting-edge technology.
                        </p>
                    </div>
                </section>

                {/* Live Running Counter Bar */}
                <section className="vd-stats-section vd-container">
                    <div className="vd-stats-grid">
                        {STATS.map((item, idx) => (
                            <div className="vd-stat-item" key={idx}>
                                <div className="vd-stat-num">
                                    <AnimatedCounter end={item.value} suffix={item.suffix} />
                                </div>
                                <div className="vd-stat-label">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Detailed Story & Heritage Section */}
                <section className="vd-story-section vd-container">
                    <div className="vd-story-grid">
                        <div className="vd-story-text">
                            <span className="vd-kicker">Our Specialized Workshop</span>
                            <h2>Master Craftsmanship in Fancy Diamond Processing</h2>
                            <p>
                                Founded with an unyielding commitment to optical precision, <strong>Vaibhav Diamond</strong> is a specialized workshop in Rajkot, Gujarat, dedicated exclusively to <strong>Fancy Diamond Cutting & Polishing</strong>.
                            </p>
                            <p>
                                Unlike standard round brilliant cuts, fancy shapes — including Marquise, Pear, Oval, Emerald, Princess, Cushion, Radiant, and Heart cuts — demand bespoke mathematical geometry and individualized facet design for every single diamond. In our workshop, master lapidaries examine the internal grain structure and natural optical properties of each stone, meticulously refining facet angles to eradicate dark shadows, prevent light leakage, and maximize scintillation.
                            </p>
                            <p>
                                From precision 4P laser cutting, sawing, and computerized rough planning to final facet blocking and hand-polishing on diamond-powdered cast iron scaife wheels, our entire workshop workflow unites generations of artisan expertise with modern precision engineering.
                            </p>
                        </div>

                        <div className="vd-story-box">
                            <VaibhavLogo className="vd-center-logo" />
                            <h3 style={{ fontFamily: "Cinzel, serif", color: "#fff", marginBottom: "8px", textAlign: "center" }}>
                                Vaibhav Diamond Workshop
                            </h3>
                            <p style={{ fontSize: "14px", color: "var(--silver-dim)", textAlign: "center", lineHeight: "1.7" }}>
                                Located in Rajkot, Gujarat — dedicated exclusively to specialized Fancy Diamond Cutting & Polishing with certified Triple Excellent symmetry and flawless mirror finish.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3 Core Pillars Section with 3D Hover Cards */}
                <section className="vd-pillars-section vd-container">
                    <div className="vd-section-head">
                        <span className="vd-kicker">Workshop Standards</span>
                        <h2>Why Choose Our Workshop</h2>
                    </div>

                    <div className="vd-pillars-grid">
                        <div className="vd-pillar-card">
                            <div className="vd-pillar-icon">✧</div>
                            <h3>Fancy Cut Specialization</h3>
                            <p>
                                100% focused on fancy diamond cuts — Marquise, Pear, Oval, Emerald, Cushion, Radiant, and custom shapes — engineered for maximum brilliance and optical fire.
                            </p>
                        </div>

                        <div className="vd-pillar-card">
                            <div className="vd-pillar-icon">◈</div>
                            <h3>Advanced Workshop Technology</h3>
                            <p>
                                Equipped with state-of-the-art 4P laser sawing, 3D rough diamond planning, and precision bruting to achieve microscopic facet alignment and perfect symmetry.
                            </p>
                        </div>

                        <div className="vd-pillar-card">
                            <div className="vd-pillar-icon">❖</div>
                            <h3>Master Lapidary Polishing</h3>
                            <p>
                                Decades of hands-on expertise on cast iron scaife wheels, evaluating every individual facet under 10x to 50x magnification to guarantee Triple Excellent cut and polish.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="vd-footer">
                <div className="vd-container">
                    <div className="vd-footer-grid">
                        <div>
                            <div className="vd-footer-brand-wrap">
                                <VaibhavLogo className="vd-footer-logo-img" />
                                <div className="vd-footer-logo-text">
                                    <span className="vd-footer-brand-name">VAIBHAV</span>
                                    <span className="vd-footer-brand-sub">DIAMOND</span>
                                </div>
                            </div>
                            <p style={{ lineHeight: 1.8, fontSize: "14px" }}>
                                Specialized Fancy Diamond Cutting & Polishing workshop based in Rajkot, Gujarat. Built on craftsmanship, precision, and decades of mastery.
                            </p>
                        </div>

                        <div className="vd-footer-col">
                            <h4>Quick Links</h4>
                            <a href="/">Home</a>
                            <a href="/About_Us">About Us</a>
                            {/* <a href="/Working">Working Process</a> */}
                            <a href="/Contact_Us">Contact Workshop</a>
                        </div>

                        <div className="vd-footer-col">
                            <h4>Direct Contact</h4>
                            <a href="tel:+919904730345" title="Call Bharatbhai Pipaliya">
                                 Bharatbhai: +91 99047 30345
                            </a>
                            <a href="tel:+919624557303" title="Call Ramjibhai Rokad">
                                 Ramjibhai: +91 96245 57303
                            </a>
                            <a href="mailto:info@vaibhavdiamond.com" title="Email Vaibhav Diamond">
                                 info@vaibhavdiamond.com
                            </a>
                            <a href="/Contact_Us" style={{ color: "var(--brand-cyan)", marginTop: "6px" }}>
                                Inquire for Bulk Parcels &rarr;
                            </a>
                        </div>

                        <div className="vd-footer-col">
                            <h4>Our Workshop Address</h4>
                            <div className="vd-address-box">
                                <p>Shop No. 3, First Floor, Sub Plot No. B-3,</p>
                                <p>Opp. Dholakiya School, Near Dream Land,</p>
                                <p>Old Morbi Road, Bedipara,</p>
                                <p style={{ color: "var(--brand-cyan)", fontWeight: "600", marginTop: "4px" }}>
                                    Rajkot, Gujarat - 360003
                                </p>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Shop+No.+3,+First+Floor,+Sub+Plot+No.+B-3,+Opp.+Dholakiya+School,+Near+Dream+Land,+Old+Morbi+Road,+Bedipara,+Rajkot,+Gujarat+360003"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        marginTop: "10px",
                                        color: "var(--brand-cyan)",
                                        fontSize: "12.5px",
                                        fontWeight: "600",
                                        textDecoration: "underline",
                                    }}
                                >
                                    📍 Get Directions (Google Maps) ↗
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="vd-footer-bottom">
                        &copy; 2026 Vaibhav Diamond. All Rights Reserved. Elegance Cut to Perfection.
                    </div>
                </div>
            </footer>
        </div>
    );
}