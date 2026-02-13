import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MultiStepForm } from './components/MultiStepForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsPage } from './components/ResultsPage';
import { AboutPage } from './components/AboutPage';
import './App.css';

export interface StartupData {
  problem_statement: string;
  target_audience: string;
  unique_differentiation: string;
  business_model_type: string;
  revenue_model: string;
  starting_budget: number;
  monthly_expenses: number;
  team_size: number;
  tech_skill: number;
  marketing_skill: number;
  business_skill: number;
  weekly_hours: number;
  first_startup: boolean;
  country: string;
  industry: string;
  competitors: string;
}

export const initialData: StartupData = {
  problem_statement: '',
  target_audience: '',
  unique_differentiation: '',
  business_model_type: 'B2B',
  revenue_model: '',
  starting_budget: 10000,
  monthly_expenses: 1000,
  team_size: 1,
  tech_skill: 5,
  marketing_skill: 5,
  business_skill: 5,
  weekly_hours: 40,
  first_startup: true,
  country: '',
  industry: '',
  competitors: '',
};

type Page = 'home' | 'about' | 'form' | 'results' | 'methodology';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [data, setData] = useState<StartupData>(initialData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleStartSimulation = () => {
    setCurrentPage('form');
  };

  const handleRunSimulation = async (formData: StartupData) => {
    setData(formData);
    setIsAnalyzing(true);

    try {
      // Import the AI analyzer
      const { analyzeStartup } = await import('./utils/aiAnalyzer');

      // Run AI analysis (automatically cached for same inputs)
      const analysis = await analyzeStartup(formData);

      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);

      // Fallback to deterministic calculation if AI fails
      const runway = formData.starting_budget / formData.monthly_expenses;
      const avgSkill = (formData.tech_skill + formData.marketing_skill + formData.business_skill) / 3;
      const baseScore = 30 + (avgSkill - 5) * 3;
      const survivalOdds = Math.max(15, Math.min(75, Math.round(baseScore)));

      setResults({
        survivalOdds,
        failureProb: 100 - survivalOdds,
        riskLevel: survivalOdds < 40 ? 'High Collapse Risk' : 'Elevated Risk',
        metrics: {
          competitionDensity: 'Medium',
          estimatedRunway: runway.toFixed(1),
          scalability: 45,
        },
        breakdown: [
          { icon: 'zap', text: 'Analysis requires more detailed market research.' },
          { icon: 'users', text: 'Customer validation is recommended before launch.' },
          { icon: 'alert', text: 'Consider optimizing your resource allocation strategy.' }
        ],
        improvements: [
          'Conduct thorough market validation with target customers.',
          'Build a minimum viable product to test core assumptions.',
          'Develop a systematic approach to customer acquisition.',
          'Consider extending runway through cost optimization.',
        ]
      });
    } finally {
      setIsAnalyzing(false);
      setCurrentPage('results');
    }
  };

  const handleNewSimulation = () => {
    setResults(null);
    setData(initialData);
    setCurrentPage('home');
  };

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onRunSimulation={handleStartSimulation}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onStartSimulation={handleStartSimulation} />
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AboutPage onRunSimulation={handleStartSimulation} />
          </motion.div>
        )}

        {currentPage === 'methodology' && (
          <motion.div
            key="methodology"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AboutPage onRunSimulation={handleStartSimulation} />
          </motion.div>
        )}

        {currentPage === 'form' && !isAnalyzing && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MultiStepForm
              initialData={data}
              onSubmit={handleRunSimulation}
              onCancel={() => setCurrentPage('home')}
            />
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen />
          </motion.div>
        )}

        {currentPage === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResultsPage
              results={results}
              onNewSimulation={handleNewSimulation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        <div className="container">
          <p className="text-muted text-center" style={{ fontSize: '0.875rem' }}>
            Free to use. Takes 60 seconds. No login required.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
