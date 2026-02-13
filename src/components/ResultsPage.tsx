import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Flame,
    Swords,
    Gauge,
    TrendingUp,
    Zap,
    Users,
    AlertTriangle,
    Share2,
    GitCompare,
    RotateCcw
} from 'lucide-react';

interface ResultsPageProps {
    results: {
        survivalOdds: number;
        failureProb: number;
        riskLevel: string;
        metrics: {
            competitionDensity: string;
            estimatedRunway: string;
            scalability: number;
        };
        breakdown: Array<{ icon: string; text: string }>;
        improvements: string[];
    };
    onNewSimulation: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ results, onNewSimulation }) => {
    const [displayedOdds, setDisplayedOdds] = useState(0);

    // Count-up animation for survival odds
    useEffect(() => {
        const duration = 900;
        const steps = 60;
        const increment = results.survivalOdds / steps;
        const stepDuration = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= results.survivalOdds) {
                setDisplayedOdds(results.survivalOdds);
                clearInterval(timer);
            } else {
                setDisplayedOdds(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [results.survivalOdds]);

    const handleShare = async () => {
        const shareData = {
            title: 'Startup Reality Engine Results',
            text: `My startup has a ${results.survivalOdds}% survival probability! Check yours at Startup Reality Engine.`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                await navigator.clipboard.writeText(
                    `${shareData.text}\n${shareData.url}`
                );
                alert('Results copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    const handleCompare = () => {
        alert('Compare feature coming soon! Save this result and run another simulation to compare.');
    };

    const getRiskColor = () => {
        if (results.survivalOdds < 30) return 'var(--danger)';
        if (results.survivalOdds < 50) return 'var(--warning)';
        return 'var(--success)';
    };

    return (
        <section className="results-section">
            <div className="container">
                <div className="results-container">
                    {/* Header */}
                    <motion.div
                        className="results-header"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button className="btn btn-ghost" onClick={onNewSimulation}>
                            <RotateCcw size={18} />
                            New Simulation
                        </button>
                    </motion.div>

                    {/* Main Survival Percentage */}
                    <motion.div
                        className="survival-reveal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="survival-header">
                            <h2>Survival Odds</h2>
                        </div>

                        <div className="survival-percentage-container">
                            {/* Circular Arc */}
                            <div className="survival-circle">
                                <svg className="circle-svg" viewBox="0 0 200 200">
                                    {/* Background Circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="transparent"
                                        stroke="var(--border)"
                                        strokeWidth="12"
                                    />
                                    {/* Animated Arc */}
                                    <motion.circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="transparent"
                                        stroke={getRiskColor()}
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        strokeDasharray={502.65} // 2 * PI * 80
                                        strokeDashoffset={502.65}
                                        initial={{ strokeDashoffset: 502.65 }}
                                        animate={{
                                            strokeDashoffset: 502.65 - (502.65 * results.survivalOdds) / 100,
                                        }}
                                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                                        style={{
                                            transform: 'rotate(-90deg)',
                                            transformOrigin: '100px 100px',
                                        }}
                                    />
                                </svg>

                                {/* Percentage Number */}
                                <motion.div
                                    className="survival-number"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {displayedOdds}%
                                </motion.div>
                            </div>

                            {/* Risk Label */}
                            <motion.div
                                className="risk-label"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4, delay: 1.1 }}
                                style={{ color: getRiskColor() }}
                            >
                                {results.riskLevel}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Metric Cards Grid */}
                    <div className="metrics-grid">
                        {[
                            {
                                icon: Flame,
                                label: 'Failure Probability',
                                value: `${results.failureProb}%`,
                                progress: results.failureProb,
                                color: 'danger',
                                subtitle: 'High Risk',
                                delay: 0.1,
                            },
                            {
                                icon: Swords,
                                label: 'Competition Density',
                                value: results.metrics.competitionDensity,
                                progress: results.metrics.competitionDensity === 'High' ? 85 : 50,
                                color: 'warning',
                                delay: 0.2,
                            },
                            {
                                icon: Gauge,
                                label: 'Estimated Runway',
                                value: `${results.metrics.estimatedRunway} months`,
                                progress: parseFloat(results.metrics.estimatedRunway) * 8,
                                color: parseFloat(results.metrics.estimatedRunway) < 6 ? 'danger' : 'warning',
                                subtitle:
                                    parseFloat(results.metrics.estimatedRunway) < 6 ? 'Danger Zone' : undefined,
                                delay: 0.3,
                            },
                            {
                                icon: TrendingUp,
                                label: 'Scalability Score',
                                value: `${results.metrics.scalability} / 100`,
                                progress: results.metrics.scalability,
                                color: 'primary',
                                delay: 0.4,
                            },
                        ].map((metric, index) => (
                            <motion.div
                                key={index}
                                className="metric-card"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 + metric.delay }}
                            >
                                <div className="metric-header">
                                    <metric.icon size={24} className={`metric-icon icon-${metric.color}`} />
                                    <span className="metric-label">{metric.label}</span>
                                </div>
                                <div className="metric-value">{metric.value}</div>
                                {metric.subtitle && <div className="metric-subtitle">{metric.subtitle}</div>}
                                <div className="metric-progress">
                                    <motion.div
                                        className={`metric-progress-fill fill-${metric.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(metric.progress, 100)}%` }}
                                        transition={{ duration: 0.6, delay: 1.4 + metric.delay }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reality Breakdown */}
                    <motion.div
                        className="breakdown-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.8 }}
                    >
                        <h3 className="section-heading">
                            <AlertTriangle size={24} className="section-icon" />
                            Compare Your Startups
                            <span className="subtitle">Why You're Likely to Fail</span>
                        </h3>

                        <div className="breakdown-list">
                            {results.breakdown.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="breakdown-item"
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 2.0 + index * 0.12,
                                    }}
                                >
                                    <div className="breakdown-icon">
                                        {item.icon === 'zap' && <Zap size={18} />}
                                        {item.icon === 'users' && <Users size={18} />}
                                        {item.icon === 'alert' && <AlertTriangle size={18} />}
                                    </div>
                                    <p className="breakdown-text">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        className="results-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.4 }}
                    >
                        <button className="btn btn-secondary btn-large" onClick={handleShare}>
                            <Share2 size={20} />
                            Share Result
                        </button>
                        <button className="btn btn-secondary btn-large" onClick={handleCompare}>
                            <GitCompare size={20} />
                            Compare Startups
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
