import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

type Page = 'home' | 'about' | 'form' | 'results' | 'methodology';

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onRunSimulation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onRunSimulation }) => {
    const navLinks = [
        { label: 'How it Works', page: 'about' as Page },
        { label: 'Methodology', page: 'methodology' as Page },
        { label: 'FAQ', page: 'about' as Page },
    ];

    // Show Results tab only when on results page
    if (currentPage === 'results') {
        navLinks.push({ label: 'Results', page: 'results' as Page });
    }

    return (
        <motion.nav
            className="navbar"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <button
                        onClick={() => onNavigate('home')}
                        className="logo-button"
                    >
                        <div className="logo-icon">
                            <Zap size={24} strokeWidth={2.5} />
                        </div>
                        <h1 className="logo-text">
                            <span className="logo-startup">Startup</span>
                            <span className="logo-reality"> Reality Engine</span>
                        </h1>
                    </button>

                    {/* Nav Links */}
                    <div className="nav-links">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => onNavigate(link.page)}
                                className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
                            >
                                {link.label}
                                <span className="nav-underline"></span>
                            </button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        className="btn btn-primary btn-cta"
                        onClick={onRunSimulation}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Zap size={18} />
                        Run Simulation
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};
