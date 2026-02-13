/**
 * Test file to verify AI analyzer produces consistent results
 * Run with: npm test (if test setup exists) or run in browser console
 */

import { analyzeStartup } from './utils/aiAnalyzer';
import type { StartupData } from './App';

const testStartup: StartupData = {
    problem_statement: "Small businesses struggle to manage inventory across multiple sales channels",
    target_audience: "E-commerce sellers doing $10k-$100k monthly",
    unique_differentiation: "AI-powered demand forecasting that learns from your sales patterns",
    business_model_type: "B2B",
    revenue_model: "Monthly SaaS subscription",
    starting_budget: 50000,
    monthly_expenses: 5000,
    team_size: 2,
    tech_skill: 7,
    marketing_skill: 4,
    business_skill: 6,
    weekly_hours: 60,
    first_startup: true,
    country: "USA",
    industry: "SaaS",
    competitors: "TradeGecko, Cin7, Inventory Planner"
};

export async function testConsistency() {
    console.log('🧪 Testing AI Analyzer Consistency...\n');

    // Run analysis 3 times with same input
    console.log('Running analysis #1...');
    const result1 = await analyzeStartup(testStartup);

    console.log('Running analysis #2...');
    const result2 = await analyzeStartup(testStartup);

    console.log('Running analysis #3...');
    const result3 = await analyzeStartup(testStartup);

    // Compare results
    const match12 = JSON.stringify(result1) === JSON.stringify(result2);
    const match23 = JSON.stringify(result2) === JSON.stringify(result3);
    const match13 = JSON.stringify(result1) === JSON.stringify(result3);

    console.log('\n📊 Results Comparison:');
    console.log('─────────────────────────────────');
    console.log(`Result 1 vs Result 2: ${match12 ? '✅ MATCH' : '❌ DIFFERENT'}`);
    console.log(`Result 2 vs Result 3: ${match23 ? '✅ MATCH' : '❌ DIFFERENT'}`);
    console.log(`Result 1 vs Result 3: ${match13 ? '✅ MATCH' : '❌ DIFFERENT'}`);
    console.log('─────────────────────────────────\n');

    // Display the results
    console.log('📈 Analysis Results:');
    console.log(`Survival Odds: ${result1.survivalOdds}%`);
    console.log(`Failure Probability: ${result1.failureProb}%`);
    console.log(`Risk Level: ${result1.riskLevel}`);
    console.log(`Competition Density: ${result1.metrics.competitionDensity}`);
    console.log(`Estimated Runway: ${result1.metrics.estimatedRunway} months`);
    console.log(`Scalability Score: ${result1.metrics.scalability}/100`);

    console.log('\n🔍 Breakdown:');
    result1.breakdown.forEach((item: any, i: number) => {
        console.log(`  ${i + 1}. ${item.text}`);
    });

    console.log('\n💡 Improvements:');
    result1.improvements.forEach((item: string, i: number) => {
        console.log(`  ${i + 1}. ${item}`);
    });

    // Test with slightly different input (should give different results)
    console.log('\n\n🔄 Testing with different input...');
    const differentStartup = { ...testStartup, tech_skill: 9, marketing_skill: 8 };
    const result4 = await analyzeStartup(differentStartup);

    const isDifferent = JSON.stringify(result1) !== JSON.stringify(result4);
    console.log(`Different inputs produce different results: ${isDifferent ? '✅ YES' : '❌ NO'}`);

    if (isDifferent) {
        console.log(`\nOriginal survival odds: ${result1.survivalOdds}%`);
        console.log(`Improved startup survival odds: ${result4.survivalOdds}%`);
        console.log(`Difference: ${result4.survivalOdds - result1.survivalOdds > 0 ? '+' : ''}${result4.survivalOdds - result1.survivalOdds}%`);
    }

    return {
        consistent: match12 && match23 && match13,
        differentInputsDifferentResults: isDifferent,
        sampleResult: result1
    };
}

// Auto-run test if in development
if (import.meta.env.DEV) {
    console.log('💡 Tip: Run testConsistency() in the console to verify AI consistency');
    // Expose to window for manual testing
    (window as any).testAIConsistency = testConsistency;
}
