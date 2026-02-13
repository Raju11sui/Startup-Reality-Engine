import type { StartupData } from '../App';

// Cache to ensure same inputs always return same results
const analysisCache = new Map<string, any>();

// Generate a deterministic hash from startup data
function generateDataHash(data: StartupData): string {
    const relevantData = {
        problem_statement: data.problem_statement.trim().toLowerCase(),
        target_audience: data.target_audience.trim().toLowerCase(),
        unique_differentiation: data.unique_differentiation.trim().toLowerCase(),
        business_model_type: data.business_model_type,
        revenue_model: data.revenue_model.trim().toLowerCase(),
        starting_budget: data.starting_budget,
        monthly_expenses: data.monthly_expenses,
        team_size: data.team_size,
        tech_skill: data.tech_skill,
        marketing_skill: data.marketing_skill,
        business_skill: data.business_skill,
        weekly_hours: data.weekly_hours,
        first_startup: data.first_startup,
        country: data.country.trim().toLowerCase(),
        industry: data.industry.trim().toLowerCase(),
        competitors: (data.competitors || '').trim().toLowerCase(),
    };

    return JSON.stringify(relevantData);
}

// Parse AI response into structured format
function parseAIResponse(aiText: string) {

    const extractValue = (pattern: RegExp, defaultValue: any = '') => {
        const match = aiText.match(pattern);
        return match ? match[1].trim() : defaultValue;
    };

    const extractNumber = (pattern: RegExp, defaultValue: number = 0) => {
        const value = extractValue(pattern);
        const num = parseFloat(value.replace(/[^\d.]/g, ''));
        return isNaN(num) ? defaultValue : num;
    };

    // Extract main metrics
    const survivalOdds = extractNumber(/SURVIVAL_ODDS:\s*(\d+)%?/i, 30);
    const failureProb = extractNumber(/FAILURE_PROBABILITY:\s*(\d+)%?/i, 100 - survivalOdds);
    const competitionDensity = extractValue(/COMPETITION_DENSITY:\s*(\w+)/i, 'Medium');
    const estimatedRunway = extractValue(/ESTIMATED_RUNWAY:\s*([\d.]+)/i, '0');
    const scalability = extractNumber(/SCALABILITY_SCORE:\s*(\d+)/i, 40);

    // Extract breakdown points
    const breakdownSection = aiText.match(/REALITY_BREAKDOWN:(.*?)(?:MOST_LIKELY_FAILURE_CAUSE:|$)/is);
    const breakdown: Array<{ icon: string; text: string }> = [];

    if (breakdownSection) {
        const points = breakdownSection[1].match(/[-•]\s*(.+)/g) || [];
        points.slice(0, 3).forEach((point, index) => {
            const text = point.replace(/^[-•]\s*/, '').trim();
            const icons = ['zap', 'users', 'alert'];
            breakdown.push({
                icon: icons[index] || 'alert',
                text: text
            });
        });
    }

    // Fill with defaults if needed
    while (breakdown.length < 3) {
        const defaultBreakdowns = [
            { icon: 'zap', text: 'Limited market differentiation may impact growth potential.' },
            { icon: 'users', text: 'Competitive market landscape requires strategic positioning.' },
            { icon: 'alert', text: 'Resource constraints may affect execution velocity.' }
        ];
        breakdown.push(defaultBreakdowns[breakdown.length]);
    }

    // Extract improvements
    const improvementsSection = aiText.match(/HOW_TO_IMPROVE_SURVIVAL_ODDS:(.*?)$/is);
    const improvements: string[] = [];

    if (improvementsSection) {
        const points = improvementsSection[1].match(/[-•]\s*(.+)/g) || [];
        points.forEach(point => {
            improvements.push(point.replace(/^[-•]\s*/, '').trim());
        });
    }

    // Fill with defaults if needed
    while (improvements.length < 4) {
        const defaultImprovements = [
            'Validate product-market fit with early customer interviews.',
            'Build a minimum viable product (MVP) to test core assumptions.',
            'Develop a clear go-to-market strategy with measurable milestones.',
            'Consider strategic partnerships to accelerate market entry.'
        ];
        improvements.push(defaultImprovements[improvements.length]);
    }

    // Determine risk level
    let riskLevel = 'High Collapse Risk';
    if (survivalOdds >= 60) {
        riskLevel = 'Moderate Risk';
    } else if (survivalOdds >= 40) {
        riskLevel = 'Elevated Risk';
    }

    return {
        survivalOdds,
        failureProb,
        riskLevel,
        metrics: {
            competitionDensity,
            estimatedRunway,
            scalability,
        },
        breakdown,
        improvements,
    };
}

// Fallback analyzer for when AI is unavailable
function fallbackAnalyzer(data: StartupData) {
    // Calculate runway
    const runway = data.starting_budget / (data.monthly_expenses || 1);

    // Calculate base survival odds
    let survivalScore = 50;

    // Factor in skills (0-30 points)
    const avgSkill = (data.tech_skill + data.marketing_skill + data.business_skill) / 3;
    survivalScore += (avgSkill - 5) * 3;

    // Factor in commitment (0-10 points)
    if (data.weekly_hours >= 40) survivalScore += 10;
    else if (data.weekly_hours >= 20) survivalScore += 5;

    // Factor in runway (-20 to +10 points)
    if (runway < 3) survivalScore -= 20;
    else if (runway < 6) survivalScore -= 10;
    else if (runway > 12) survivalScore += 10;

    // Factor in team size (0-10 points)
    if (data.team_size > 1) survivalScore += 5;
    if (data.team_size >= 3) survivalScore += 5;

    // Factor in experience (-10 points for first startup)
    if (data.first_startup) survivalScore -= 10;

    // Ensure score is within bounds
    const survivalOdds = Math.max(15, Math.min(85, Math.round(survivalScore)));
    const failureProb = 100 - survivalOdds;

    // Determine competition density
    let competitionDensity = 'Medium';
    if (data.industry.toLowerCase().includes('saas') ||
        data.industry.toLowerCase().includes('fintech') ||
        data.industry.toLowerCase().includes('e-commerce')) {
        competitionDensity = 'High';
    } else if (data.industry.toLowerCase().includes('healthcare') ||
        data.industry.toLowerCase().includes('biotech')) {
        competitionDensity = 'Low';
    }

    // Calculate scalability
    let scalability = 50;
    if (data.business_model_type === 'B2B' || data.business_model_type === 'Marketplace') {
        scalability += 10;
    }
    if (avgSkill > 7) scalability += 15;
    if (data.team_size > 2) scalability += 10;

    // Generate breakdown
    const breakdown = [];

    if (data.marketing_skill < 5) {
        breakdown.push({
            icon: 'zap',
            text: `Low marketing skill (${data.marketing_skill}/10) may hinder customer acquisition.`
        });
    }

    if (runway < 6) {
        breakdown.push({
            icon: 'alert',
            text: `Limited runway of ${runway.toFixed(1)} months creates execution pressure.`
        });
    }

    if (competitionDensity === 'High') {
        breakdown.push({
            icon: 'users',
            text: 'Entering a highly saturated market with established competitors.'
        });
    }

    // Fill with generic points if needed
    while (breakdown.length < 3) {
        const defaults = [
            { icon: 'zap', text: 'Market differentiation requires clearer positioning.' },
            { icon: 'users', text: 'Customer acquisition strategy needs refinement.' },
            { icon: 'alert', text: 'Resource allocation should be optimized for growth.' }
        ];
        breakdown.push(defaults[breakdown.length]);
    }

    // Generate improvements
    const improvements = [
        'Validate product-market fit through customer discovery interviews.',
        `Extend runway to 12+ months by reducing burn rate or securing additional funding.`,
        `${data.marketing_skill < 6 ? 'Consider hiring a growth/marketing co-founder or consultant.' : 'Develop a systematic growth experimentation process.'}`,
        'Build strategic partnerships to reduce customer acquisition costs.',
    ];

    let riskLevel = 'High Collapse Risk';
    if (survivalOdds >= 60) {
        riskLevel = 'Moderate Risk';
    } else if (survivalOdds >= 40) {
        riskLevel = 'Elevated Risk';
    }

    return {
        survivalOdds,
        failureProb,
        riskLevel,
        metrics: {
            competitionDensity,
            estimatedRunway: runway.toFixed(1),
            scalability: Math.min(100, scalability),
        },
        breakdown,
        improvements,
    };
}

export async function analyzeStartup(data: StartupData) {
    // Generate hash for caching
    const dataHash = generateDataHash(data);

    // Check cache first
    if (analysisCache.has(dataHash)) {
        console.log('📦 Returning cached analysis');
        return analysisCache.get(dataHash);
    }

    try {
        // Try to call the AI API
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('AI API unavailable');
        }

        const aiText = await response.text();
        const result = parseAIResponse(aiText);

        // Cache the result
        analysisCache.set(dataHash, result);

        return result;
    } catch (error) {
        console.log('⚠️ AI unavailable, using fallback analyzer');

        // Use fallback analyzer
        const result = fallbackAnalyzer(data);

        // Cache the fallback result too
        analysisCache.set(dataHash, result);

        return result;
    }
}
