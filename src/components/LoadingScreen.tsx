import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const loadingMessages = [
    'Analyzing Market Saturation...',
    'Evaluating Founder Risk...',
    'Calculating Burn Rate...',
    'Finalizing Survival Odds...',
];

export const LoadingScreen: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="loading-section">
            <div className="container">
                <motion.div
                    className="loading-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Circular Loader */}
                    <motion.div
                        className="loading-spinner"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Loader2 className="spinner-icon" size={64} />
                    </motion.div>

                    {/* Status Text */}
                    <div className="loading-messages">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={messageIndex}
                                className="loading-message"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.4 }}
                            >
                                {loadingMessages[messageIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <p className="loading-subtitle">
                        This may take a few moments. Please wait...
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// Import at top
import { AnimatePresence } from 'framer-motion';
