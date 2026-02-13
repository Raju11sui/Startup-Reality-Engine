import { motion } from 'framer-motion';
import { Brain, Layers, TrendingUp, ClipboardCheck, Rocket } from 'lucide-react';

interface AboutPageProps {
    onRunSimulation: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRunSimulation }) => {
    return (
        <section className="about-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="about-content"
                >
                    <h1 className="about-title">About the Startup Reality Engine</h1>
                    <p className="about-subtitle">How it works, explained.</p>

                    <div className="about-grid">
                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="about-icon">
                                <Brain size={40} />
                            </div>
                            <h3>AI-Powered Analysis</h3>
                            <p>
                                We analyze your startup's inputs using a proprietary AI algorithm trained on
                                thousands of past startup outcomes.
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="about-icon">
                                <Layers size={40} />
                            </div>
                            <h3>Four Key Factors</h3>
                            <p>
                                Success is examined through four lenses: differentiation, market saturation,
                                founder profile, and financials.
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="about-icon">
                                <TrendingUp size={40} />
                            </div>
                            <h3>Data-Driven Forecast</h3>
                            <p>
                                Combining your inputs with market data, we generate a survival score
                                indicating your chances of long-term success.
                            </p>
                        </motion.div>

                        <motion.div
                            className="about-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className="about-icon">
                                <ClipboardCheck size={40} />
                            </div>
                            <h3>Deep Insights Delivered</h3>
                            <p>
                                You'll receive a detailed breakdown of your risks and actionable steps to
                                improve.
                            </p>
                        </motion.div>
                    </div>

                    <div className="methodology-section">
                        <h2 className="section-title">Turning Startup Realities</h2>
                        <p className="section-subtitle">into Predictive Insights.</p>

                        <div className="methodology-content">
                            <h4>How is this possible?</h4>
                            <p>
                                We've collaborated with serial entrepreneurs who have scaled companies past $1M
                                ARR, collapsed in failure, swam in red oceans of doom and investment. The #1
                                question they ask: <strong>Why do most startups fail and can we predict who's
                                    next?</strong>
                            </p>
                        </div>
                    </div>

                    <motion.button
                        className="btn btn-primary btn-large"
                        onClick={onRunSimulation}
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
