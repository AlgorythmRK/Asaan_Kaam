import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/main.css';
import '../styles/landing.css';

const LandingPage = () => {
    const { theme } = useAuth();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { icon: '📦', value: '10K+', label: 'Items Tracked', trend: '+24%' },
        { icon: '⚡', value: '99.9%', label: 'Uptime', trend: 'Stable' },
        { icon: '🏪', value: '500+', label: 'Restaurants', trend: '+18%' },
        { icon: '💰', value: '$2M+', label: 'Saved Annually', trend: '+32%' }
    ];

    const features = [
        {
            icon: '📊',
            title: 'Real-Time Analytics',
            description: 'Monitor your inventory levels with live updates and intelligent forecasting.',
            color: '#667eea'
        },
        {
            icon: '🔔',
            title: 'Smart Alerts',
            description: 'Automated notifications when stock reaches critical levels to prevent shortages.',
            color: '#f093fb'
        },
        {
            icon: '📈',
            title: 'Trend Analysis',
            description: 'Visualize consumption patterns and optimize your purchasing decisions.',
            color: '#764ba2'
        },
        {
            icon: '🔐',
            title: 'Role-Based Access',
            description: 'Secure admin and staff roles with granular permission controls.',
            color: '#10b981'
        },
        {
            icon: '☁️',
            title: 'Cloud Sync',
            description: 'Access your inventory from anywhere with real-time cloud synchronization.',
            color: '#3b82f6'
        },
        {
            icon: '📱',
            title: 'Mobile Ready',
            description: 'Fully responsive design works seamlessly on all your devices.',
            color: '#ec4899'
        }
    ];

    return (
        <div className={`landing-page ${theme}`}>
            {/* Animated Background Orbs */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>

            {/* Navigation */}
            <nav className="landing-nav glass">
                <div className="landing-nav-content">
                    <div className="landing-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>Restaurant Hub</span>
                    </div>
                    <div className="landing-nav-actions">
                        <ThemeToggle />
                        <Link to="/login" className="btn btn-secondary">Sign In</Link>
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="landing-hero-content animate-fadeInUp">
                    <div className="hero-badge">
                        <span className="badge-dot"></span>
                        <span>Trusted by 500+ Restaurants</span>
                    </div>
                    <h1 className="landing-hero-title">
                        Smart Inventory
                        <span className="gradient-text"> Management</span>
                        <br />for Modern Restaurants
                    </h1>
                    <p className="landing-hero-subtitle">
                        Track stock levels in real-time, automate reordering, and gain actionable insights
                        into your consumption patterns with our intelligent inventory system.
                    </p>
                    <div className="landing-hero-cta">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                            Start Free Trial
                        </Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Watch Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="landing-stats">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card glass-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="stat-card-header">
                                <div className="stat-card-icon">{stat.icon}</div>
                                <div className="stat-card-trend up">
                                    <span>{stat.trend}</span>
                                </div>
                            </div>
                            <div className="stat-card-value">{stat.value}</div>
                            <div className="stat-card-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="landing-features">
                <div className="landing-section-header animate-fadeInUp">
                    <h2 className="landing-section-title">Everything You Need to Succeed</h2>
                    <p className="landing-section-subtitle">
                        Powerful features designed to streamline your restaurant operations
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="feature-icon" style={{ background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}11 100%)` }}>
                                <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="landing-cta">
                <div className="landing-cta-content glass-card animate-fadeInUp">
                    <h2 className="landing-cta-title">Ready to Transform Your Inventory?</h2>
                    <p className="landing-cta-subtitle">
                        Join hundreds of restaurants already saving time and money with Restaurant Hub
                    </p>
                    <div className="landing-cta-actions">
                        <Link to="/signup" className="btn btn-primary btn-lg">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-content">
                    <div className="landing-footer-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <span>Restaurant Hub</span>
                    </div>
                    <p className="landing-footer-text">
                        &copy; {new Date().getFullYear()} Restaurant Hub. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
