import React from 'react';
import { motion } from 'framer-motion';
import {
    AlertTriangle,
    TrendingDown,
    Layers,
    Clock,
    CheckCircle2,
    XCircle,
    Lightbulb
} from 'lucide-react';

interface ResultsProps {
    data: any;
    onReset: () => void;
}

export const ResultsDisplay: React.FC<ResultsProps> = ({ data, onReset }) => {
    // Parsing logic for the AI output would go here.
    // For now, we'll use a data structure representing the parsed result.

    const mockResult = {
        survivalOdds: 35,
        failureProb: 65,
        competition: 'High',
        runway: data.starting_budget / (data.monthly_expenses || 1),
        scalability: 45,
        breakdown: [
            { type: 'weakness', text: 'Low marketing skill (4/10) in a red ocean market.' },
            { type: 'threat', text: 'Incumbent competitors have 10x the budget.' },
            { type: 'founder', text: 'Solo founder risk with limited technical bandwidth.' }
        ],
        failureCause: 'The most likely cause of failure is the inability to acquire customers at a cost (CAC) lower than the lifetime value (LTV), given the high competition and lack of a marketing strategy.',
        improvements: [
            'Find a co-founder with strong GTM (Go-To-Market) experience.',
            'Niche down further to a segment where incumbents are weak.',
            'Reduce monthly burn by 30% to extend runway to 12 months.',
            'Focus on organic community building before spending on ads.'
        ]
    };

    return (
        <div className="flex flex-col gap-8 animate-fade">
            <div className="grid-2">
                <div className="glass p-6 flex flex-col items-center gap-2">
                    <span className="text-dim text-sm uppercase tracking-wider">Survival Odds</span>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64" cy="64" r="58"
                                fill="transparent"
                                stroke="var(--border)"
                                strokeWidth="8"
                            />
                            <motion.circle
                                cx="64" cy="64" r="58"
                                fill="transparent"
                                stroke="var(--secondary)"
                                strokeWidth="8"
                                strokeDasharray={364.4}
                                initial={{ strokeDashoffset: 364.4 }}
                                animate={{ strokeDashoffset: 364.4 - (364.4 * mockResult.survivalOdds) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <span className="absolute text-3xl font-heading font-bold">{mockResult.survivalOdds}%</span>
                    </div>
                </div>

                <div className="glass p-6 flex flex-col justify-center gap-4">
                    <div className="flex justify-between items-center">
                        <span className="text-dim text-sm">Failure Probability</span>
                        <span className="text-error font-bold">{mockResult.failureProb}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${mockResult.failureProb}%` }}
                            className="h-full bg-error"
                        />
                    </div>
                    <div className="grid-2 mt-2">
                        <div>
                            <span className="text-dim text-xs block">Competition</span>
                            <span className="text-sm font-medium">{mockResult.competition}</span>
                        </div>
                        <div>
                            <span className="text-dim text-xs block">Est. Runway</span>
                            <span className="text-sm font-medium">{mockResult.runway.toFixed(1)} Months</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass p-6">
                <h4 className="text-lg mb-4 flex items-center gap-2">
                    <AlertTriangle className="text-secondary" size={20} /> Reality Breakdown
                </h4>
                <div className="flex flex-col gap-3">
                    {mockResult.breakdown.map((item, i) => (
                        <div key={i} className="flex gap-3 bg-white/5 p-3 rounded-lg">
                            {item.type === 'weakness' && <TrendingDown className="text-error shrink-0" size={18} />}
                            {item.type === 'threat' && <ShieldAlert className="text-secondary shrink-0" size={18} />}
                            {item.type === 'founder' && <Layers className="text-primary shrink-0" size={18} />}
                            <p className="text-sm text-muted">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass p-6 border-l-4 border-error">
                <h4 className="text-lg mb-2">Most Likely Failure Cause</h4>
                <p className="text-muted leading-relaxed">{mockResult.failureCause}</p>
            </div>

            <div className="grid-2">
                <div className="flex flex-col gap-4">
                    <h4 className="text-lg flex items-center gap-2">
                        <Lightbulb className="text-accent" size={20} /> Survival Strategy
                    </h4>
                    <div className="flex flex-col gap-2">
                        {mockResult.improvements.map((imp, i) => (
                            <div key={i} className="flex gap-2 items-start">
                                <CheckCircle2 className="text-accent shrink-0 mt-1" size={16} />
                                <span className="text-sm text-muted">{imp}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-end">
                    <button className="btn btn-secondary w-full" onClick={onReset}>
                        New Evaluation
                    </button>
                </div>
            </div>
        </div>
    );
};
