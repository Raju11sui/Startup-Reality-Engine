import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import type { StartupData } from '../App';

interface MultiStepFormProps {
    initialData: StartupData;
    onSubmit: (data: StartupData) => void;
    onCancel: () => void;
}

const TOTAL_STEPS = 4;

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
    initialData,
    onSubmit,
    onCancel: _onCancel,
}) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<StartupData>(initialData);
    const [charCounts, setCharCounts] = useState({
        problem: 0,
        audience: 0,
        differentiation: 0,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Update character counts
        if (name === 'problem_statement') {
            setCharCounts(prev => ({ ...prev, problem: value.length }));
        } else if (name === 'target_audience') {
            setCharCounts(prev => ({ ...prev, audience: value.length }));
        } else if (name === 'unique_differentiation') {
            setCharCounts(prev => ({ ...prev, differentiation: value.length }));
        }
    };

    const handleSliderChange = (name: string, value: number) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => {
        if (step < TOTAL_STEPS) {
            setStep((s) => s + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep((s) => s - 1);
        }
    };

    const handleSubmit = () => {
        onSubmit(data);
    };

    const isStepValid = () => {
        if (step === 1) {
            return data.problem_statement.length > 10 && data.target_audience.length > 5;
        }
        return true;
    };

    return (
        <section className="form-section">
            <div className="container">
                <div className="form-container">
                    {/* Progress Indicator */}
                    <div className="form-progress">
                        {[1, 2, 3, 4].map((num) => (
                            <div key={num} className="progress-step-wrapper">
                                <motion.div
                                    className={`progress-circle ${step >= num ? 'active' : ''}`}
                                    animate={{
                                        scale: step === num ? [1, 1.1, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: step === num ? Infinity : 0,
                                        repeatDelay: 2,
                                    }}
                                >
                                    {num}
                                </motion.div>
                                <span className="progress-label">
                                    {num === 1 && 'Idea & Problem'}
                                    {num === 2 && 'Business Model & Money'}
                                    {num === 3 && 'Founder Profile'}
                                    {num === 4 && 'Market Context'}
                                </span>
                                {num < 4 && (
                                    <div className={`progress-line ${step > num ? 'filled' : ''}`}>
                                        <motion.div
                                            className="progress-line-fill"
                                            initial={{ width: '0%' }}
                                            animate={{ width: step > num ? '100%' : '0%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form Title */}
                    <div className="form-header">
                        <h2 className="form-title">Let's Simulate Your Startup</h2>
                        <p className="form-subtitle">
                            Give us the basics of your startup idea to start the simulation.
                        </p>
                    </div>

                    {/* Form Steps */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className="form-step"
                            initial={{ x: 24, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -24, opacity: 0 }}
                            transition={{ duration: 0.32 }}
                        >
                            {step === 1 && (
                                <div className="step-content">
                                    <h3 className="step-title">Step 1: Idea & Problem</h3>

                                    <div className="input-group">
                                        <label className="label">What problem are you solving?</label>
                                        <textarea
                                            name="problem_statement"
                                            value={data.problem_statement}
                                            onChange={handleInputChange}
                                            placeholder="Describe the pain you're solving..."
                                            rows={4}
                                            maxLength={250}
                                        />
                                        <span className="char-counter">{charCounts.problem}/250</span>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">Who is your target audience?</label>
                                        <input
                                            name="target_audience"
                                            value={data.target_audience}
                                            onChange={handleInputChange}
                                            placeholder="E.g., college students, working mothers"
                                            maxLength={100}
                                        />
                                        <span className="char-counter">{charCounts.audience}/100</span>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">What makes you different?</label>
                                        <input
                                            name="unique_differentiation"
                                            value={data.unique_differentiation}
                                            onChange={handleInputChange}
                                            placeholder="E.g., unique solution, market advantage"
                                            maxLength={100}
                                        />
                                        <span className="char-counter">{charCounts.differentiation}/100</span>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="step-content">
                                    <h3 className="step-title">Step 2: Business Model & Money</h3>

                                    <div className="grid-2">
                                        <div className="input-group">
                                            <label className="label">Business Model</label>
                                            <select
                                                name="business_model_type"
                                                value={data.business_model_type}
                                                onChange={handleInputChange}
                                            >
                                                <option value="B2B">B2B (SaaS / Services)</option>
                                                <option value="B2C">B2C (Consumer App / Brand)</option>
                                                <option value="D2C">D2C (Physical Products)</option>
                                                <option value="Marketplace">Marketplace</option>
                                            </select>
                                        </div>

                                        <div className="input-group">
                                            <label className="label">Revenue Model</label>
                                            <input
                                                name="revenue_model"
                                                value={data.revenue_model}
                                                onChange={handleInputChange}
                                                placeholder="E.g., Monthly Subscription"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid-2">
                                        <div className="input-group">
                                            <label className="label">Starting Budget ($)</label>
                                            <input
                                                type="number"
                                                name="starting_budget"
                                                value={data.starting_budget}
                                                onChange={handleInputChange}
                                                min="0"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label className="label">Monthly Expenses ($)</label>
                                            <input
                                                type="number"
                                                name="monthly_expenses"
                                                value={data.monthly_expenses}
                                                onChange={handleInputChange}
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="step-content">
                                    <h3 className="step-title">Step 3: Founder Profile</h3>

                                    <div className="input-group">
                                        <label className="label">
                                            Tech Skill ({data.tech_skill}/10)
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={data.tech_skill}
                                            onChange={(e) => handleSliderChange('tech_skill', parseInt(e.target.value))}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>Beginner</span>
                                            <span>Expert</span>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">
                                            Marketing Skill ({data.marketing_skill}/10)
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={data.marketing_skill}
                                            onChange={(e) => handleSliderChange('marketing_skill', parseInt(e.target.value))}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>Beginner</span>
                                            <span>Expert</span>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">
                                            Business Knowledge ({data.business_skill}/10)
                                        </label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={data.business_skill}
                                            onChange={(e) => handleSliderChange('business_skill', parseInt(e.target.value))}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>Beginner</span>
                                            <span>Expert</span>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">
                                            Weekly Commitment ({data.weekly_hours} hours)
                                        </label>
                                        <input
                                            type="range"
                                            min="5"
                                            max="100"
                                            step="5"
                                            value={data.weekly_hours}
                                            onChange={(e) => handleSliderChange('weekly_hours', parseInt(e.target.value))}
                                            className="slider"
                                        />
                                        <div className="slider-labels">
                                            <span>Part-time</span>
                                            <span>All-in</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="step-content">
                                    <h3 className="step-title">Step 4: Market Context</h3>

                                    <div className="grid-2">
                                        <div className="input-group">
                                            <label className="label">Industry</label>
                                            <input
                                                name="industry"
                                                value={data.industry}
                                                onChange={handleInputChange}
                                                placeholder="E.g., FinTech, HealthTech"
                                            />
                                        </div>

                                        <div className="input-group">
                                            <label className="label">Country</label>
                                            <input
                                                name="country"
                                                value={data.country}
                                                onChange={handleInputChange}
                                                placeholder="E.g., USA, India"
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label className="label">Main Competitors (Optional)</label>
                                        <input
                                            name="competitors"
                                            value={data.competitors}
                                            onChange={handleInputChange}
                                            placeholder="E.g., Stripe, PayPal"
                                        />
                                    </div>

                                    <div className="input-group">
                                        <label className="label">Team Size</label>
                                        <input
                                            type="number"
                                            name="team_size"
                                            value={data.team_size}
                                            onChange={handleInputChange}
                                            min="1"
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="form-actions">
                        <div className="step-indicator">
                            {[...Array(TOTAL_STEPS)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`step-dot ${i + 1 === step ? 'active' : ''} ${i + 1 < step ? 'completed' : ''
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="action-buttons">
                            {step > 1 && (
                                <button className="btn btn-secondary" onClick={prevStep}>
                                    <ChevronLeft size={20} />
                                    Back
                                </button>
                            )}

                            {step < TOTAL_STEPS ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={nextStep}
                                    disabled={!isStepValid()}
                                >
                                    Next
                                    <ChevronRight size={20} />
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Run Simulation
                                    <Zap size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
