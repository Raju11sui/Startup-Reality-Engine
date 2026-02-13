import { motion } from 'framer-motion';
import { Lightbulb, Gauge, Rocket } from 'lucide-react';

interface HeroProps {
    onStartSimulation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSimulation }) => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content">
                    {/* Left Side - Main Content */}
                    <motion.div
                        className="hero-left"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 className="hero-title">
                            90% of Startups Fail.
                            <br />
                            <span className="hero-title-highlight">Will Yours?</span>
                        </h1>
                        <motion.p
                            className="hero-subtitle"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                        >
                            Simulate your startup's survival odds before wasting 2 years.
                        </motion.p>

                        <motion.button
                            className="btn btn-primary btn-hero"
                            onClick={onStartSimulation}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Rocket size={20} />
                            Run Simulation
                        </motion.button>
                    </motion.div>

                    {/* Right Side - Preview Card */}
                    <motion.div
                        className="hero-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <motion.div
                            className="preview-card"
                            whileHover={{
                                scale: 1.02,
                                rotateY: 2,
                                rotateX: -2,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="preview-header">
                                <span className="preview-label">Survival Odds:</span>
                                <motion.div
                                    className="preview-percentage"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    29%
                                </motion.div>
                            </div>

                            <div className="preview-metrics">
                                <div className="preview-metric">
                                    <span className="metric-label">Failure Probability</span>
                                    <div className="metric-value-container">
                                        <span className="metric-value">68%</span>
                                        <div className="metric-bar">
                                            <motion.div
                                                className="metric-bar-fill danger"
                                                initial={{ width: 0 }}
                                                animate={{ width: '68%' }}
                                                transition={{ duration: 1, delay: 1 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="preview-metric">
                                    <span className="metric-label">Competition Density</span>
                                    <div className="metric-value-container">
                                        <span className="metric-value">High</span>
                                        <div className="metric-bar">
                                            <motion.div
                                                className="metric-bar-fill warning"
                                                initial={{ width: 0 }}
                                                animate={{ width: '85%' }}
                                                transition={{ duration: 1, delay: 1.1 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="preview-metric">
                                    <span className="metric-label">Estimated Runway</span>
                                    <div className="metric-value-container">
                                        <span className="metric-value">3.9 months 🚨</span>
                                        <div className="metric-bar danger-zone">
                                            <motion.div
                                                className="metric-bar-fill danger"
                                                initial={{ width: 0 }}
                                                animate={{ width: '32%' }}
                                                transition={{ duration: 1, delay: 1.2 }}
                                            />
                                        </div>
                                        <span className="danger-label">Danger Zone</span>
                                    </div>
                                </div>

                                <div className="preview-metric">
                                    <span className="metric-label">Scalability Score</span>
                                    <div className="metric-value-container">
                                        <span className="metric-value">38 / 100</span>
                                        <div className="metric-bar">
                                            <motion.div
                                                className="metric-bar-fill"
                                                initial={{ width: 0 }}
                                                animate={{ width: '38%' }}
                                                transition={{ duration: 1, delay: 1.3 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* How It Works Section */}
                <motion.div
                    className="how-it-works"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h2 className="section-title">How It Works</h2>
                    <div className="how-it-works-grid">
                        <div className="how-card">
                            <div className="how-icon">
                                <Lightbulb size={32} />
                            </div>
                            <h4>Enter your idea</h4>
                        </div>
                        <div className="how-card">
                            <div className="how-icon">
                                <Gauge size={32} />
                            </div>
                            <h4>AI runs simulation</h4>
                        </div>
                        <div className="how-card">
                            <div className="how-icon">
                                <Rocket size={32} />
                            </div>
                            <h4>Get survival score</h4>
                        </div>
                    </div>
                    <p className="how-it-works-footer">
                        Free to use. Takes 60 seconds. No login required.
                    </p>
                </motion.div>

                {/* Why Most Startups Fail */}
                <motion.div
                    className="why-fail-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <h2 className="section-title">Why Most Startups Fail</h2>
                    <div className="fail-reasons-grid">
                        <div className="fail-card">
                            <span className="fail-icon">⚡</span>
                            <h4>Weak Differentiation</h4>
                            <p>Your idea is not unique enough.</p>
                        </div>
                        <div className="fail-card">
                            <span className="fail-icon">❌</span>
                            <h4>Poor Marketing</h4>
                            <p>No budget for customer aquisition.</p>
                        </div>
                        <div className="fail-card">
                            <span className="fail-icon">💸</span>
                            <h4>Low Runway</h4>
                            <p>Burn rate too high. Funding too low.</p>
                        </div>
                        <div className="fail-card">
                            <span className="fail-icon">🌊</span>
                            <h4>Oversaturated Market</h4>
                            <p>Entering a competitive red ocean market.</p>
                        </div>
                    </div>

                    <p className="cta-text">
                        Think your startup can survive? <strong>Test before you fail.</strong>
                    </p>

                    <motion.button
                        className="btn btn-primary btn-large"
                        onClick={onStartSimulation}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <Rocket size={20} />
                        Run Simulation
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};
