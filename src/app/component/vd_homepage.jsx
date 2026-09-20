"use client";
import React, { useState, useEffect } from "react";
import "./vd_Homepage.css";

// Vaibhav Diamond Official 3D Logo Component
function VaibhavLogo({ className = "vd-logo-img" }) {
  return (
    <img
      src="/vd-logo.png"
      alt="Vaibhav Diamond Logo"
      className={className}
    />
  );
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/About_Us" },
  // { label: "Working", href: "/Working" },
  { label: "Contact Us", href: "/Contact_Us" },
];

const SHAPES = ["Oval", "Pear", "Marquise", "Cushion", "Emerald", "Heart", "Radiant"];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
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

          {/* Desktop Navigation */}
          <nav className="vd-nav vd-desktop-nav" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveTab(link.href)}
                className={`vd-nav-link ${activeTab === link.href ? "is-active" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
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
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveTab(link.href);
                setMobileMenuOpen(false);
              }}
              className={`vd-drawer-link ${activeTab === link.href ? "is-active" : ""}`}
            >
              <span className="vd-drawer-bullet">✦</span>
              <span className="vd-drawer-link-label">{link.label}</span>
            </a>
          ))}
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
            <span className="vd-drawer-sub">Natural Fancy Diamond Atelier</span>
          </div>
        </div>
      </aside>

      <main>
        {/* Hero Section */}
        <section className="vd-hero" id="home">
          <div className="vd-hero-glow-1" />
          <div className="vd-hero-glow-2" />
          <div className="vd-hero-inner">
            <div className="vd-badge">Master Diamond Craftsmanship</div>
            <h1>
              Elegance Cut to <span className="vd-grad-text">Pure</span>{" "}
              <span className="vd-grad-blue">Perfection</span>
            </h1>
            <p>
              Welcome to <strong>Vaibhav Diamond</strong>. We specialize in precision diamond cutting, ethical sourcing, and delivering high-grade brilliance crafted with uncompromising mastery.
            </p>

            <div className="vd-hero-actions">
              <a href="#process" className="vd-btn-primary">
                Discover Our Work
              </a>
              <a href="#about" className="vd-btn-secondary">
                About The Maison
              </a>
            </div>
          </div>
        </section>

        {/* Specializations & Diamond Cuts Showcase */}
        <section className="vd-section vd-container" id="specializations">
          <div className="vd-section-head">
            <span className="vd-kicker">Atelier Specialization</span>
            <h2>Mastering the Geometry of Light</h2>
            <p>From custom fancy shapes to high-precision facet angles, explore our diamond cutting capabilities.</p>
          </div>

          <div className="vd-specs-grid">
            <div className="vd-spec-card">
              <div className="vd-spec-icon-box">
                <span className="vd-spec-icon">💎</span>
                <span className="vd-spec-tag">Signature Cut</span>
              </div>
              <h3>Fancy Shape Expertise</h3>
              <p>Specialized cutting across Ovals, Pears, Marquises, Cushions, and Emerald cuts, planned individually to eliminate bowtie darkness.</p>
              <div className="vd-spec-features">
                <span>✦ Custom Facet Diagrams</span>
                <span>✦ Zero Light Leakage</span>
              </div>
            </div>

            <div className="vd-spec-card">
              <div className="vd-spec-icon-box">
                <span className="vd-spec-icon">🔬</span>
                <span className="vd-spec-tag">Micron Precision</span>
              </div>
              <h3>Triple Excellent Standard</h3>
              <p>Achieving ideal cut symmetry, optimal table percentages, and mirror polish finishing verified with advanced optical profiling.</p>
              <div className="vd-spec-features">
                <span>✦ 3X Polish & Symmetry</span>
                <span>✦ Calibrated Proportions</span>
              </div>
            </div>

            <div className="vd-spec-card">
              <div className="vd-spec-icon-box">
                <span className="vd-spec-icon">⚖️</span>
                <span className="vd-spec-tag">100% Certified</span>
              </div>
              <h3>Ethical & Calibrated Parcels</h3>
              <p>Consistent sorting, color, clarity matching, and 100% Kimberley Process certified sourcing direct from verified rough suppliers.</p>
              <div className="vd-spec-features">
                <span>✦ Wholesale Parcel Lots</span>
                <span>✦ Sieve-Size Precision</span>
              </div>
            </div>
          </div>

          {/* Quick Shape Specs Ribbon */}
          <div className="vd-shapes-ribbon">
            <div className="vd-shapes-ribbon-title">Cut Profiles In High Demand</div>
            <div className="vd-shapes-ribbon-list">
              <div className="vd-shape-pill"><span>Oval Cut</span><small>58 Facets</small></div>
              <div className="vd-shape-pill"><span>Pear Shape</span><small>58 Facets</small></div>
              <div className="vd-shape-pill"><span>Marquise</span><small>57 Facets</small></div>
              <div className="vd-shape-pill"><span>Cushion Modified</span><small>64 Facets</small></div>
              <div className="vd-shape-pill"><span>Emerald Step-Cut</span><small>57 Facets</small></div>
              <div className="vd-shape-pill"><span>Radiant Brilliant</span><small>70 Facets</small></div>
            </div>
          </div>
        </section>
        <section className="vd-about" id="about">
          <div className="vd-container vd-about-grid">
            <div className="vd-about-copy">
              <span className="vd-kicker">Artisanal Mastery</span>
              <h2>The Rare Craft of Fancy Diamond Polishing</h2>
              <p>
                A round diamond follows one well-known pattern. A fancy-shape diamond does not. Every oval, pear, marquise, or emerald cut has its own proportions, requiring custom facet planning for every single piece.
              </p>
              <ul className="vd-chips">
                {SHAPES.map((shape) => (
                  <li key={shape}>{shape}</li>
                ))}
              </ul>
            </div>

            <div className="vd-diamond-visual">
              <VaibhavLogo className="vd-center-logo" />
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="vd-section vd-container" id="process">
          <div className="vd-section-head">
            <span className="vd-kicker">Mastery in Action</span>
            <h2>How We Work</h2>
            <p>From rough mineral to a fiery polished gem, in four careful stages.</p>
          </div>

          <div className="vd-steps">
            <div className="vd-step">
              <div className="vd-step-num">01</div>
              <div>
                <h3>Rough Sourcing & Ethical Verification</h3>
                <p>Selecting conflict-free rough diamonds from accredited mines, verified against Kimberley Process accords.</p>
              </div>
            </div>

            <div className="vd-step">
              <div className="vd-step-num">02</div>
              <div>
                <h3>3D Laser Scanning & Planning</h3>
                <p>3D computer tomography maps the internal grain to calculate optimal cut proportions for supreme brilliance.</p>
              </div>
            </div>

            <div className="vd-step">
              <div className="vd-step-num">03</div>
              <div>
                <h3>Precision Cleaving & Facet Polishing</h3>
                <p>Master polishers hand-tune each facet on diamond-charged wheels to reflect light directly through the crown.</p>
              </div>
            </div>

            <div className="vd-step">
              <div className="vd-step-num">04</div>
              <div>
                <h3>Quality Grading & Final Certification</h3>
                <p>Optical scrutiny under high magnification to confirm Triple Excellent grade, polish sheen, and symmetry.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="vd-footer" id="contact">
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