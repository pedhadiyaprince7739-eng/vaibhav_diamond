"use client";
import React, { useState, useEffect } from "react";
import "../component/vd_ContactPage.css";

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

export default function ContactPage() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [downloading, setDownloading] = useState(null); // 'front' | 'back' | 'both' | null
    const [downloadStatus, setDownloadStatus] = useState("");

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

    const googleMapsUrl =
        "https://www.google.com/maps/search/?api=1&query=Shop+No.+3,+First+Floor,+Sub+Plot+No.+B-3,+Opp.+Dholakiya+School,+Near+Dream+Land,+Old+Morbi+Road,+Bedipara,+Rajkot,+Gujarat+360003";
    const googleMapsDirUrl =
        "https://www.google.com/maps/dir/?api=1&destination=Shop+No.+3,+First+Floor,+Sub+Plot+No.+B-3,+Opp.+Dholakiya+School,+Near+Dream+Land,+Old+Morbi+Road,+Bedipara,+Rajkot,+Gujarat+360003";

    const handleLocationClick = (e) => {
        e.stopPropagation();
        window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    };

    const handlePhoneClick = (e, phone) => {
        e.stopPropagation();
        window.location.href = `tel:${phone}`;
    };

    // Helper to load image for canvas
    const loadCanvasImage = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
        });
    };

    // Rounded rectangle path helper
    const drawRoundedCard = (ctx, x, y, width, height, radius) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
    };

    // Draw Front Side onto a Canvas Context
    const drawFrontFaceCanvas = (ctx, x, y, w, h, logoImg) => {
        ctx.save();
        // Card Background
        drawRoundedCard(ctx, x, y, w, h, 28);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(226, 232, 240, 0.9)";
        ctx.stroke();
        ctx.clip(); // Keep wave ribbons neatly within card

        // Top Left Royal Blue Wave
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 400, y);
        ctx.bezierCurveTo(x + 360, y + 170, x + 200, y + 260, x, y + 250);
        ctx.closePath();
        const topGrad = ctx.createLinearGradient(x, y, x + 350, y + 240);
        topGrad.addColorStop(0, "#0284c7");
        topGrad.addColorStop(0.4, "#0369a1");
        topGrad.addColorStop(1, "#0c4a6e");
        ctx.fillStyle = topGrad;
        ctx.fill();

        // Top Left Cyan Accent Trim
        ctx.beginPath();
        ctx.moveTo(x, y + 250);
        ctx.bezierCurveTo(x + 200, y + 260, x + 360, y + 170, x + 400, y);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#38bdf8";
        ctx.stroke();

        // Bottom Right Royal Blue Wave
        ctx.beginPath();
        ctx.moveTo(x + w, y + h);
        ctx.lineTo(x + w - 420, y + h);
        ctx.bezierCurveTo(x + w - 370, y + h - 190, x + w - 180, y + h - 270, x + w, y + h - 250);
        ctx.closePath();
        const btmGrad = ctx.createLinearGradient(x + w - 380, y + h, x + w, y + h - 220);
        btmGrad.addColorStop(0, "#38bdf8");
        btmGrad.addColorStop(0.5, "#0284c7");
        btmGrad.addColorStop(1, "#075985");
        ctx.fillStyle = btmGrad;
        ctx.fill();

        // Bottom Right White Inner Trim
        ctx.beginPath();
        ctx.moveTo(x + w - 420, y + h);
        ctx.bezierCurveTo(x + w - 370, y + h - 190, x + w - 180, y + h - 270, x + w, y + h - 250);
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        // Top Right ESTD. Badge
        ctx.fillStyle = "#64748b";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText("ESTD. 2012 • RAJKOT, GUJARAT", x + w - 40, y + 45);

        // Center Content
        const cx = x + w / 2;

        // Logo
        if (logoImg) {
            const logoW = 100;
            const logoH = 100;
            const logoY = y + 120;
            // Badge background for logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, logoY + logoH / 2, 58, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
            ctx.stroke();
            ctx.drawImage(logoImg, cx - logoW / 2, logoY, logoW, logoH);
            ctx.restore();
        }

        // Brand Title
        ctx.textAlign = "center";
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 44px 'Cinzel', Georgia, serif";
        ctx.fillText("VAIBHAV DIAMOND", cx, y + 295);

        // Brand Subtitle
        ctx.fillStyle = "#475569";
        ctx.font = "bold 15px system-ui, sans-serif";
        ctx.fillText("NATURAL FANCY DIAMOND ATELIER", cx, y + 338);

        // Cuts Pill
        ctx.save();
        const pillW = 520;
        const pillH = 38;
        const pillX = cx - pillW / 2;
        const pillY = y + 368;
        drawRoundedCard(ctx, pillX, pillY, pillW, pillH, 19);
        ctx.fillStyle = "rgba(2, 132, 199, 0.08)";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
        ctx.stroke();

        ctx.fillStyle = "#0369a1";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillText("MARQUISE  •  PEAR  •  EMERALD  •  OVAL  •  HEART", cx, pillY + 24);
        ctx.restore();

        // Directors Line
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 19px system-ui, sans-serif";
        ctx.fillText("Bharatbhai Pipaliya   •   Ramjibhai Rokad", cx, y + 460);

        // Craftsmanship Tagline
        ctx.fillStyle = "#64748b";
        ctx.font = "14px system-ui, sans-serif";
        ctx.fillText("Fancy Diamond Cutting & Polishing", cx, y + 495);

        // Website
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.fillText("www.vaibhavdiamond.com", cx, y + 610);

        ctx.restore();
    };

    // Draw Back Side onto a Canvas Context
    const drawBackFaceCanvas = (ctx, x, y, w, h, logoImg) => {
        ctx.save();
        // Card Background
        drawRoundedCard(ctx, x, y, w, h, 28);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(226, 232, 240, 0.9)";
        ctx.stroke();
        ctx.clip(); // Keep wave ribbons inside card

        // Subtle Top Left Wave
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 280, y);
        ctx.bezierCurveTo(x + 240, y + 90, x + 120, y + 140, x, y + 130);
        ctx.closePath();
        ctx.fillStyle = "rgba(2, 132, 199, 0.12)";
        ctx.fill();

        // Top Left Cyan Accent Line
        ctx.beginPath();
        ctx.moveTo(x, y + 130);
        ctx.bezierCurveTo(x + 120, y + 140, x + 240, y + 90, x + 280, y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
        ctx.stroke();

        // Bottom Right Royal Blue Wave
        ctx.beginPath();
        ctx.moveTo(x + w, y + h);
        ctx.lineTo(x + w - 380, y + h);
        ctx.bezierCurveTo(x + w - 320, y + h - 160, x + w - 160, y + h - 230, x + w, y + h - 210);
        ctx.closePath();
        const btmGrad = ctx.createLinearGradient(x + w - 360, y + h, x + w, y + h - 190);
        btmGrad.addColorStop(0, "#38bdf8");
        btmGrad.addColorStop(0.5, "#0284c7");
        btmGrad.addColorStop(1, "#075985");
        ctx.fillStyle = btmGrad;
        ctx.fill();

        // Bottom Right White Trim
        ctx.beginPath();
        ctx.moveTo(x + w - 380, y + h);
        ctx.bezierCurveTo(x + w - 320, y + h - 160, x + w - 160, y + h - 230, x + w, y + h - 210);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        // Top Header
        if (logoImg) {
            ctx.drawImage(logoImg, x + 50, y + 42, 46, 46);
        }
        ctx.textAlign = "left";
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 26px 'Cinzel', Georgia, serif";
        ctx.fillText("VAIBHAV DIAMOND", x + 110, y + 66);

        ctx.fillStyle = "#64748b";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.fillText("NATURAL FANCY DIAMOND ATELIER", x + 110, y + 88);

        // ESTD badge top right
        ctx.textAlign = "right";
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillText("ESTD. 2012  •  RAJKOT, GUJARAT", x + w - 50, y + 68);

        // Divider
        ctx.beginPath();
        ctx.moveTo(x + 50, y + 112);
        ctx.lineTo(x + w - 50, y + 112);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(2, 132, 199, 0.2)";
        ctx.stroke();

        // Partner 1: Bharatbhai Pipaliya
        const boxW = (w - 130) / 2;
        const boxH = 135;
        const p1X = x + 50;
        const p1Y = y + 135;
        drawRoundedCard(ctx, p1X, p1Y, boxW, boxH, 16);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#cbd5e1";
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.fillText("OWNER", p1X + 22, p1Y + 34);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 23px 'Cinzel', Georgia, serif";
        ctx.fillText("Bharatbhai Pipaliya", p1X + 22, p1Y + 74);

        ctx.fillStyle = "#0369a1";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText("📞  +91 99047 30345", p1X + 22, p1Y + 112);

        // Partner 2: Ramjibhai Rokad
        const p2X = p1X + boxW + 30;
        const p2Y = y + 135;
        drawRoundedCard(ctx, p2X, p2Y, boxW, boxH, 16);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#cbd5e1";
        ctx.stroke();

        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 11px system-ui, sans-serif";
        ctx.fillText("OWNER", p2X + 22, p2Y + 34);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 23px 'Cinzel', Georgia, serif";
        ctx.fillText("Ramjibhai Rokad", p2X + 22, p2Y + 74);

        ctx.fillStyle = "#0369a1";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText("📞  +91 96245 57303", p2X + 22, p2Y + 112);

        // 1. Atelier Address Box
        const addrX = x + 50;
        const addrY = y + 295;
        const addrW = w - 100;
        const addrH = 120;
        drawRoundedCard(ctx, addrX, addrY, addrW, addrH, 14);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#38bdf8";
        ctx.stroke();

        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 12px system-ui, sans-serif";
        ctx.fillText("📍  ATELIER WORKSHOP & OFFICE ADDRESS:", addrX + 24, addrY + 30);

        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText("Shop No. 3, First Floor, Sub Plot No. B-3,", addrX + 24, addrY + 64);

        ctx.fillStyle = "#334155";
        ctx.font = "15px system-ui, sans-serif";
        ctx.fillText("Opp. Dholakiya School, Near Dream Land, Old Morbi Road, Bedipara, Rajkot, Gujarat - 360003", addrX + 24, addrY + 95);

        // 2. Separate Email ID Box
        const emailX = x + 50;
        const emailY = y + 430;
        const emailW = 340;
        const emailH = 44;
        drawRoundedCard(ctx, emailX, emailY, emailW, emailH, 10);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#38bdf8";
        ctx.stroke();

        ctx.fillStyle = "#0284c7";
        ctx.font = "bold 16px system-ui, sans-serif";
        ctx.fillText("✉️   info@vaibhavdiamond.com", emailX + 18, emailY + 28);

        // Footer Section
        ctx.fillStyle = "#64748b";
        ctx.font = "bold 13px system-ui, sans-serif";
        ctx.fillText("Natural Fancy Diamond Cutting & Polishing Atelier  •  Rajkot", x + 50, y + 610);

        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff"; // on the blue bottom-right wave
        ctx.font = "bold 18px system-ui, sans-serif";
        ctx.fillText("www.vaibhavdiamond.com", x + w - 40, y + 610);

        ctx.restore();
    };

    // Download Handler for Front, Back, or Both Sides
    const handleDownloadCard = async (side) => {
        try {
            setDownloading(side);
            setDownloadStatus(
                "Generating High-Resolution Full Card..."
            );

            // Preload logo
            const logoImg = await loadCanvasImage("/vd-logo.png");

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (side === "front") {
                canvas.width = 1200;
                canvas.height = 700;
                drawFrontFaceCanvas(ctx, 0, 0, 1200, 700, logoImg);
            } else if (side === "back") {
                canvas.width = 1200;
                canvas.height = 700;
                drawBackFaceCanvas(ctx, 0, 0, 1200, 700, logoImg);
            } else {
                // Both Sides Composite Sheet
                canvas.width = 1320;
                canvas.height = 1620;

                // Luxury Dark Background
                const bgGrad = ctx.createLinearGradient(0, 0, 0, 1620);
                bgGrad.addColorStop(0, "#030812");
                bgGrad.addColorStop(0.5, "#07172e");
                bgGrad.addColorStop(1, "#030812");
                ctx.fillStyle = bgGrad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Header in composite
                ctx.textAlign = "center";
                ctx.fillStyle = "#38bdf8";
                ctx.font = "bold 15px system-ui, sans-serif";
                ctx.fillText("OFFICIAL VISITING CARD  •  VAIBHAV DIAMOND ATELIER", 660, 48);

                // Badge: FRONT SIDE
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.font = "bold 13px system-ui, sans-serif";
                ctx.fillText("✦ FRONT SIDE ✦", 660, 80);

                // Draw Front Card
                drawFrontFaceCanvas(ctx, 60, 100, 1200, 700, logoImg);

                // Badge: BACK SIDE
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.font = "bold 13px system-ui, sans-serif";
                ctx.fillText("✦ BACK SIDE ✦", 660, 845);

                // Draw Back Card
                drawBackFaceCanvas(ctx, 60, 865, 1200, 700, logoImg);

                // Footer note in composite
                ctx.fillStyle = "#94a3b8";
                ctx.font = "14px system-ui, sans-serif";
                ctx.fillText("Vaibhav Diamond  •  Old Morbi Road, Bedipara, Rajkot - 360003  •  www.vaibhavdiamond.com", 660, 1595);
            }

            // Trigger Download
            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            const filename =
                side === "front"
                    ? "vaibhav-diamond-card-front.png"
                    : side === "back"
                        ? "vaibhav-diamond-card-back.png"
                        : "vaibhav-diamond-visiting-card-full.png";
            link.download = filename;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadStatus(`Downloaded ${filename} successfully!`);
            setTimeout(() => {
                setDownloadStatus("");
            }, 3500);
        } catch (err) {
            console.error("Card download failed:", err);
            setDownloadStatus("Failed to generate card image. Please try again.");
            setTimeout(() => setDownloadStatus(""), 4000);
        } finally {
            setDownloading(null);
        }
    };

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
                        <a href="/About_Us" className="vd-nav-link">About Us</a>
                        {/* <a href="/Working" className="vd-nav-link">Working</a> */}
                        <a href="/Contact_Us" className="vd-nav-link is-active">Contact Us</a>
                    </nav>

                    <a href="#card" className="vd-contact-btn vd-desktop-btn">
                        View Visiting Card
                    </a>

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

            {/* Mobile Left-Sliding Drawer */}
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
                    <a href="/" className="vd-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Home</span>
                    </a>
                    <a href="/About_Us" className="vd-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">About Us</span>
                    </a>
                    {/* <a href="/Working" className="vd-drawer-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Working</span>
                    </a> */}
                    <a href="/Contact_Us" className="vd-drawer-link is-active" onClick={() => setMobileMenuOpen(false)}>
                        <span className="vd-drawer-bullet">✦</span>
                        <span className="vd-drawer-link-label">Contact Us</span>
                    </a>
                </nav>

                <div className="vd-drawer-footer">
                    <a
                        href="#card"
                        className="vd-contact-btn vd-drawer-cta"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        View Visiting Card
                    </a>
                    <div className="vd-drawer-tagline">
                        <span className="vd-drawer-loc">📍 Rajkot, Gujarat</span>
                        <span className="vd-drawer-sub">Natural Fancy Diamond Atelier</span>
                    </div>
                </div>
            </aside>

            <main>
                <section className="vd-contact-hero">
                    <div className="vd-container">
                        <span className="vd-kicker">Get In Touch</span>
                        <h1>Contact Us</h1>
                        <p>
                            Connect Directly With Vaibhav Diamond For Fancy Diamond Cutting & Polishing, Custom Shapes, Parcel Inquiries, Or Visit Our Rajkot Workshop.
                        </p>
                    </div>
                </section>

                {/* 3D Visiting Card & Form Grid */}
                <section className="vd-contact-wrapper vd-container" id="card">
                    <div className="vd-contact-grid">

                        {/* Modern Blue Wave 3D Flip Card */}
                        <div>
                            <div className="vd-card-scene" onClick={() => setIsFlipped(!isFlipped)}>
                                <div className={`vd-visiting-card ${isFlipped ? "is-flipped" : ""}`}>

                                    {/* FRONT SIDE */}
                                    <div className="vd-card-face vd-card-front">
                                        <div className="vd-wave-decor vd-wave-top-left" />
                                        <div className="vd-wave-decor vd-wave-bottom-right" />
                                        <div className="vd-front-estd-badge">ESTD. 2012 • RAJKOT, GUJARAT</div>

                                        <div className="vd-front-center">
                                            {/* Official Logo Badge */}
                                            <div className="vd-front-logo-wrap">
                                                <img src="/vd-logo.png" alt="Vaibhav Diamond Logo" className="vd-front-logo-img" />
                                            </div>

                                            <h2 className="vd-front-brand-title">VAIBHAV DIAMOND</h2>
                                            <span className="vd-front-brand-subtitle">NATURAL FANCY DIAMOND ATELIER</span>

                                            <div className="vd-front-cuts-chip">
                                                <span>MARQUISE  •  PEAR  •  EMERALD  •  OVAL  •  HEART</span>
                                            </div>

                                            <div className="vd-front-directors">
                                                <span>Bharatbhai Pipaliya</span>
                                                <span className="vd-dot">•</span>
                                                <span>Ramjibhai Rokad</span>
                                            </div>

                                            <div className="vd-front-craft-tagline">
                                                Fancy Diamond Cutting & Polishing
                                            </div>

                                            <span className="vd-front-web">www.vaibhavdiamond.com</span>
                                        </div>
                                    </div>

                                    {/* BACK SIDE */}
                                    <div className="vd-card-face vd-card-back">
                                        <div className="vd-wave-decor vd-wave-top-left" />
                                        <div className="vd-wave-decor vd-wave-bottom-right" />

                                        <div className="vd-back-content">
                                            {/* Header */}
                                            <div className="vd-back-header">
                                                <div className="vd-back-brand-row">
                                                    <img src="/vd-logo.png" alt="VD Logo" className="vd-back-mini-logo" />
                                                    <div>
                                                        <div className="vd-back-brand-name">VAIBHAV DIAMOND</div>
                                                        <div className="vd-back-tagline">Fancy Diamond Cutting & Polishing</div>
                                                    </div>
                                                </div>
                                                <div className="vd-back-estd-tag">ESTD. 2012 • RAJKOT, GUJARAT</div>
                                            </div>

                                            {/* Partners Row */}
                                            <div className="vd-back-partners-row">
                                                <div className="vd-partner-card" onClick={(e) => handlePhoneClick(e, "9904730345")}>
                                                    <div className="vd-partner-role">OWNER</div>
                                                    <div className="vd-partner-name">Bharatbhai Pipaliya</div>
                                                    <div className="vd-partner-phone">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                        </svg>
                                                        +91 99047 30345
                                                    </div>
                                                </div>

                                                <div className="vd-partner-card" onClick={(e) => handlePhoneClick(e, "9624557303")}>
                                                    <div className="vd-partner-role">OWNER</div>
                                                    <div className="vd-partner-name">Ramjibhai Rokad</div>
                                                    <div className="vd-partner-phone">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                                        </svg>
                                                        +91 96245 57303
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Atelier Address Box */}
                                            <div className="vd-back-address-box" onClick={handleLocationClick} title="Click to open Google Maps directions">
                                                <div className="vd-back-address-heading">📍 ATELIER WORKSHOP & OFFICE ADDRESS:</div>
                                                <div className="vd-back-address-main">
                                                    Shop No. 3, First Floor, Sub Plot No. B-3,
                                                </div>
                                                <div className="vd-back-address-sub">
                                                    Opp. Dholakiya School, Near Dream Land, Old Morbi Road, Bedipara,<br /> Rajkot, Gujarat - 360003
                                                </div>
                                            </div>

                                            {/* Separate Email ID Box */}
                                            <div
                                                className="vd-back-email-box"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.location.href = "mailto:info@vaibhavdiamond.com";
                                                }}
                                                title="Click to send email"
                                            >
                                                <span className="vd-back-email-icon">✉️</span>
                                                <span className="vd-back-email-val">info@vaibhavdiamond.com</span>
                                            </div>

                                            {/* Footer */}
                                            <div className="vd-back-footer">
                                                <span className="vd-back-footer-note">Fancy Diamond Cutting & Polishing • Rajkot</span>
                                                <span className="vd-back-footer-url">www.vaibhavdiamond.com</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <p className="vd-flip-hint">⟲ Click Card to Flip (Front / Back)</p>

                            {/* Visiting Card Action Toolbar (Downloads & Flip) */}
                            <div className="vd-card-toolbar">
                                <button
                                    type="button"
                                    className="vd-toolbar-btn vd-btn-flip"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                    title="Flip to the other side of the visiting card"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                                    </svg>
                                    {isFlipped ? "Show Front Side" : "Show Back Side"}
                                </button>

                                <button
                                    type="button"
                                    className="vd-toolbar-btn vd-btn-download-all"
                                    onClick={() => handleDownloadCard("both")}
                                    disabled={downloading !== null}
                                    title="Download print-ready composite showing both Front and Back sides"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <line x1="3" y1="9" x2="21" y2="9" />
                                        <line x1="9" y1="21" x2="9" y2="9" />
                                    </svg>
                                    {downloading === "both" ? "Generating..." : "Download Both (HD)"}
                                </button>
                            </div>

                            {downloadStatus && (
                                <div className="vd-download-toast">
                                    <span>✓ {downloadStatus}</span>
                                </div>
                            )}
                        </div>

                        {/* Inquiry Form */}
                        <div className="vd-contact-form-box">
                            <h3>Send An Inquiry</h3>
                            <p>Leave a message and our team will get back to you promptly.</p>

                            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
                                <div className="vd-form-group">
                                    <label>Full Name</label>
                                    <input type="text" required placeholder="Your Name" className="vd-form-input" />
                                </div>

                                <div className="vd-form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" required placeholder="+91 98765 43210" className="vd-form-input" />
                                </div>

                                <div className="vd-form-group">
                                    <label>Message / Parcel Details</label>
                                    <textarea rows="4" required placeholder="Specify your diamond cut or parcel requirements..." className="vd-form-textarea" />
                                </div>

                                <button type="submit" className="vd-submit-btn">
                                    Submit Inquiry
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Google Map Section - Rajkot, Gujarat */}
                    <div className="vd-map-section">
                        <div className="vd-map-header">
                            <div className="vd-map-header-left">
                                <span className="vd-map-kicker">📍 Workshop & Office Location</span>
                                <h2 className="vd-map-title">Find Us On Google Maps</h2>
                                <p className="vd-map-subtitle">Shop No. 3, First Floor, Sub Plot No. B-3, Opp. Dholakiya School, Near Dream Land, Old Morbi Road, Bedipara, Rajkot, Gujarat - 360003</p>
                            </div>
                            <div className="vd-map-actions">
                                <a
                                    href={googleMapsDirUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="vd-map-btn vd-map-btn-primary"
                                    title="Get directions on Google Maps"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                                        <polygon points="3 11 22 2 13 21 11 13 3 11" />
                                    </svg>
                                    Get Directions
                                </a>
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="vd-map-btn vd-map-btn-secondary"
                                    title="Open in Google Maps"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                    View Larger Map
                                </a>
                            </div>
                        </div>

                        <div className="vd-map-frame-container">
                            {/* Floating Map Info Overlay */}
                            <div className="vd-map-info-card">
                                <div className="vd-map-info-main">
                                    <div className="vd-map-info-text">
                                        <h3 className="vd-map-info-name">Vaibhav Diamond</h3>
                                        <p className="vd-map-info-addr">Shop No. 3, First Floor, Sub Plot No. B-3,</p>
                                        <p className="vd-map-info-addr">Opp. Dholakiya School, Near Dream Land, Old Morbi Road,</p>
                                        <p className="vd-map-info-addr">Bedipara, Rajkot, Gujarat - 360003</p>
                                        <span className="vd-map-info-note">Workshop Location</span>
                                    </div>
                                    <div className="vd-map-info-btns">
                                        <a
                                            href={googleMapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="vd-map-card-icon-btn"
                                            title="Open in Google Maps"
                                            aria-label="Open larger map"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                <polyline points="15 3 21 3 21 9" />
                                                <line x1="10" y1="14" x2="21" y2="3" />
                                            </svg>
                                        </a>
                                        <a
                                            href={googleMapsDirUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="vd-map-card-icon-btn vd-map-card-dir-btn"
                                            title="Get directions"
                                            aria-label="Get directions"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21.71 11.29l-9-9a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42l9 9a1 1 0 0 0 1.42 0l9-9a1 1 0 0 0 0-1.42zm-8.71 4.71V13h-4v-2h4V8l4 4-4 4z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <iframe
                                src="https://maps.google.com/maps?q=Shop%20No.%203,%20First%20Floor,%20Sub%20Plot%20No.%20B-3,%20Opp.%20Dholakiya%20School,%20Near%20Dream%20Land,%20Old%20Morbi%20Road,%20Bedipara,%20Rajkot,%20Gujarat%20360003&t=&z=16&ie=UTF8&iwloc=&output=embed"
                                title="Google Map - Vaibhav Diamond, Rajkot, Gujarat"
                                className="vd-map-iframe"
                                loading="lazy"
                                allowFullScreen=""
                                referrerPolicy="no-referrer-when-downgrade"
                            />
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