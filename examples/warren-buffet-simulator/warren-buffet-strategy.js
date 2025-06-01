// warren-buffett-strategy.js - Modular Investment Simulator with Hypernum

import { createHypernum } from '@obinexuscomputing/hypernum';

// Configuration loader for different environments
class ConfigLoader {
    static async loadConfig() {
        try {
            // Try to load from JSON file (works in Node.js and modern browsers)
            const response = await fetch('./hypernum.json');
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn('Could not load hypernum.json, using default config:', error.message);
        }
        
        // Fallback to default configuration
        return {
            precision: 10,
            roundingMode: "HALF_EVEN",
            checkOverflow: true,
            maxSteps: 2000,
            debug: false,
            investment: {
                riskTolerance: "conservative",
                decisionThreshold: 0.7,
                maxPositionSize: 10000,
                diversificationFactor: 0.3
            }
        };
    }
}

// DGT Dimensional Analysis (Enhanced with Hypernum precision)
const StrategyDimensions = {
    GROWTH_RISK: 'growth-risk',
    VOLATILITY_SPIKE: 'volatility-spike', 
    TREND_MOMENTUM: 'trend-momentum',
    MARKET_SENTIMENT: 'market-sentiment',
    PRECISION_TENSION: 'precision-tension'
};

class DimensionalGameTheory {
    constructor(hypernum, config) {
        this.hypernum = hypernum;
        this.config = config;
        this.thresholds = {
            volatility_safe: 0.25,
            volatility_risky: 0.40,
            trend_days_required: 3,
            risk_conservative: config.investment?.riskTolerance === 'conservative' ? 0.30 : 0.50,
            risk_aggressive: config.investment?.riskTolerance === 'conservative' ? 0.60 : 0.80
        };
    }
    
    analyzeDay(dayData, previousDays = []) {
        const dimensions = [];
        const { price, volatility, trend, risk, momentum, dimensional_tags } = dayData;
        
        // Use Hypernum for precise calculations
        const priceBigInt = this.hypernum.multiply(BigInt(Math.floor(price * 100)), BigInt(1));
        const volatilityPrecise = this.hypernum.multiply(BigInt(Math.floor(volatility * 10000)), BigInt(1));
        
        // Growth Risk Analysis with Hypernum precision
        if (dimensional_tags.growth_risk > 0.4) {
            dimensions.push({
                type: StrategyDimensions.GROWTH_RISK,
                activation: dimensional_tags.growth_risk,
                evidence: [`High growth risk: ${(dimensional_tags.growth_risk * 100).toFixed(1)}%`],
                preciseValue: this.hypernum.multiply(BigInt(Math.floor(dimensional_tags.growth_risk * 10000)), BigInt(1))
            });
        }
        
        // Volatility Spike Detection
        if (volatility > this.thresholds.volatility_risky) {
            dimensions.push({
                type: StrategyDimensions.VOLATILITY_SPIKE,
                activation: volatility,
                evidence: [`Volatility spike: ${(volatility * 100).toFixed(1)}%`],
                preciseValue: volatilityPrecise
            });
        }
        
        // Trend Momentum Analysis
        const recentTrend = this.analyzeTrend(dayData, previousDays);
        if (recentTrend.strength > 0.6) {
            dimensions.push({
                type: StrategyDimensions.TREND_MOMENTUM,
                activation: recentTrend.strength,
                evidence: [`${recentTrend.direction} trend for ${recentTrend.days} days`],
                preciseValue: this.hypernum.multiply(BigInt(Math.floor(recentTrend.strength * 10000)), BigInt(1))
            });
        }
        
        // Market Sentiment
        const sentimentScore = this.analyzeSentiment(dimensional_tags.market_sentiment);
        if (sentimentScore.activation > 0.5) {
            dimensions.push({
                type: StrategyDimensions.MARKET_SENTIMENT,
                activation: sentimentScore.activation,
                evidence: [`Market sentiment: ${dimensional_tags.market_sentiment}`],
                preciseValue: this.hypernum.multiply(BigInt(Math.floor(sentimentScore.activation * 10000)), BigInt(1))
            });
        }
        
        return {
            dimensions,
            overall_risk: risk,
            precisePrice: priceBigInt,
            recommendation: this.generateRecommendation(dimensions, risk, trend, volatility)
        };
    }
    
    analyzeTrend(currentDay, previousDays) {
        const recentDays = previousDays.slice(-3);
        if (recentDays.length < 2) return { strength: 0, direction: 'neutral', days: 0 };
        
        let upDays = 0;
        let downDays = 0;
        
        for (let i = 1; i < recentDays.length; i++) {
            const currentPrice = this.hypernum.multiply(BigInt(Math.floor(recentDays[i].price * 100)), BigInt(1));
            const prevPrice = this.hypernum.multiply(BigInt(Math.floor(recentDays[i-1].price * 100)), BigInt(1));
            
            if (this.hypernum.greaterThan && this.hypernum.greaterThan(currentPrice, prevPrice)) {
                upDays++;
            } else if (this.hypernum.lessThan && this.hypernum.lessThan(currentPrice, prevPrice)) {
                downDays++;
            }
        }
        
        const direction = upDays > downDays ? 'upward' : downDays > upDays ? 'downward' : 'neutral';
        const strength = Math.max(upDays, downDays) / recentDays.length;
        
        return { strength, direction, days: Math.max(upDays, downDays) };
    }
    
    analyzeSentiment(sentiment) {
        const sentimentMap = {
            'very_bullish': 0.9,
            'bullish': 0.8,
            'euphoric': 0.95,
            'strong': 0.7,
            'positive': 0.6,
            'optimistic': 0.5,
            'neutral': 0.3,
            'cautious': 0.4,
            'uncertain': 0.6,
            'volatile': 0.8,
            'panic': 0.9,
            'fearful': 0.8,
            'correction': 0.7
        };
        
        return {
            activation: sentimentMap[sentiment] || 0.3,
            sentiment
        };
    }
    
    generateRecommendation(dimensions, risk, trend, volatility) {
        let recommendation = {
            action: 'HOLD',
            confidence: this.config.investment?.decisionThreshold || 0.5,
            reasoning: [],
            risk_level: 'MEDIUM'
        };
        
        // Conservative Buffett-style rules with configurable thresholds
        const hasVolatilitySpike = dimensions.some(d => d.type === StrategyDimensions.VOLATILITY_SPIKE);
        const hasPositiveMomentum = dimensions.some(d => 
            d.type === StrategyDimensions.TREND_MOMENTUM && d.evidence[0].includes('upward')
        );
        const hasGrowthRisk = dimensions.some(d => d.type === StrategyDimensions.GROWTH_RISK);
        
        const decisionThreshold = this.config.investment?.decisionThreshold || 0.7;
        
        if (volatility < this.thresholds.volatility_safe && trend === 'upward' && risk < this.thresholds.risk_conservative) {
            recommendation.action = 'BUY';
            recommendation.confidence = Math.min(0.9, decisionThreshold + 0.1);
            recommendation.risk_level = 'LOW';
            recommendation.reasoning.push('Low volatility + upward trend + acceptable risk');
        } else if (hasVolatilitySpike || risk > this.thresholds.risk_aggressive) {
            recommendation.action = 'AVOID';
            recommendation.confidence = Math.min(0.8, decisionThreshold);
            recommendation.risk_level = 'HIGH';
            recommendation.reasoning.push('High volatility or excessive risk detected');
        } else if (hasPositiveMomentum && !hasGrowthRisk) {
            recommendation.action = 'CONSIDER';
            recommendation.confidence = decisionThreshold - 0.1;
            recommendation.risk_level = 'MEDIUM';
            recommendation.reasoning.push('Positive momentum but monitor closely');
        }
        
        return recommendation;
    }
}

class HypernumInvestmentSimulator {
    constructor() {
        this.hypernum = null;
        this.config = null;
        this.dgt = null;
        this.portfolio = {
            totalInvested: BigInt(0),
            shares: BigInt(0),
            investments: []
        };
        this.stockData = [];
        this.currentDay = 1;
        this.investmentAmount = 1000;
        this.chart = null;
        this.autoTrading = false;
        
        this.initialize();
    }
    
    async initialize() {
        try {
            // Load configuration
            this.config = await ConfigLoader.loadConfig();
            console.log('Loaded Hypernum config:', this.config);
            
            // Create Hypernum instance with loaded config
            this.hypernum = createHypernum(this.config);
            
            // Initialize DGT with Hypernum instance
            this.dgt = new DimensionalGameTheory(this.hypernum, this.config);
            
            // Load stock data and initialize UI
            await this.loadStockData();
            this.initializeUI();
            this.setupEventListeners();
            
            console.log('? Hypernum Investment Simulator initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize simulator:', error);
            this.fallbackToBasicMode();
        }
    }
    
    fallbackToBasicMode() {
        console.warn('Falling back to basic mode without Hypernum');
        // Provide basic math operations as fallback
        this.hypernum = {
            add: (a, b) => BigInt(a) + BigInt(b),
            subtract: (a, b) => BigInt(a) - BigInt(b),
            multiply: (a, b) => BigInt(a) * BigInt(b),
            divide: (a, b) => BigInt(a) / BigInt(b)
        };
    }
    
    async loadStockData() {
        try {
            const response = await fetch('./prices.json');
            this.stockData = await response.json();
        } catch (error) {
            console.warn('Failed to load stock data, generating fallback:', error);
            this.stockData = this.generateFallbackData();
        }
        this.initializeChart();
        this.updateDisplay();
    }
    
    generateFallbackData() {
        const data = [];
        let price = 120.50;
        for (let day = 1; day <= 30; day++) {
            const volatility = 0.1 + Math.random() * 0.4;
            const trend = Math.random() > 0.5 ? 'upward' : 'downward';
            const change = (Math.random() - 0.5) * volatility * price;
            price = Math.max(price + change, 50);
            
            data.push({
                day,
                price: Number(price.toFixed(2)),
                volume: Math.floor(3000 + Math.random() * 3000),
                volatility: Number(volatility.toFixed(2)),
                trend,
                risk: Math.random() * 0.8,
                momentum: (Math.random() - 0.5) * 2,
                dimensional_tags: {
                    growth_risk: Math.random() * 0.7,
                    precision_tension: Math.random() * 0.5,
                    market_sentiment: ['bullish', 'bearish', 'neutral', 'volatile', 'cautious'][Math.floor(Math.random() * 5)]
                }
            });
        }
        return data;
    }
    
    makeInvestment(dayData) {
        try {
            // Use Hypernum for precise calculations
            const investmentCents = this.hypernum.multiply(BigInt(this.investmentAmount), BigInt(100));
            const priceCents = this.hypernum.multiply(BigInt(Math.floor(dayData.price * 100)), BigInt(1));
            
            // Calculate shares with precision
            const newShares = this.hypernum.divide(investmentCents, priceCents);
            
            // Update portfolio with Hypernum operations
            this.portfolio.totalInvested = this.hypernum.add(this.portfolio.totalInvested, investmentCents);
            this.portfolio.shares = this.hypernum.add(this.portfolio.shares, newShares);
            
            const investment = {
                day: this.currentDay,
                amount: this.investmentAmount,
                price: dayData.price,
                shares: Number(newShares) / 1000, // Convert back for display
                preciseShares: newShares
            };
            
            this.portfolio.investments.push(investment);
            
            this.logAction(
                `Day ${this.currentDay}: Invested $${this.investmentAmount} @ $${dayData.price.toFixed(2)} = ${investment.shares.toFixed(6)} shares`,
                'investment'
            );
        } catch (error) {
            console.error('Investment calculation error:', error);
            this.logAction(`Day ${this.currentDay}: Investment failed - calculation error`, 'warning');
        }
    }
    
    calculateCurrentValue() {
        if (this.portfolio.investments.length === 0) return BigInt(0);
        
        const currentPrice = this.currentDay <= this.stockData.length ? 
            this.stockData[this.currentDay - 1].price : 
            this.stockData[this.stockData.length - 1].price;
            
        const currentPriceCents = this.hypernum.multiply(BigInt(Math.floor(currentPrice * 100)), BigInt(1));
        return this.hypernum.multiply(this.portfolio.shares, currentPriceCents);
    }
    
    updatePortfolioDisplay() {
        const currentValue = this.calculateCurrentValue();
        const gainLoss = this.hypernum.subtract(currentValue, this.portfolio.totalInvested);
        
        const totalInvestedDollars = Number(this.portfolio.totalInvested) / 10000;
        const currentValueDollars = Number(currentValue) / 10000;
        const gainLossDollars = Number(gainLoss) / 10000;
        const gainLossPercent = totalInvestedDollars > 0 ? (gainLossDollars / totalInvestedDollars * 100) : 0;
        
        const sharesOwned = Number(this.portfolio.shares) / 1000;
        const avgCost = sharesOwned > 0 ? totalInvestedDollars / sharesOwned : 0;
        
        // Update DOM elements
        if (document.getElementById('totalInvested')) {
            document.getElementById('totalInvested').textContent = `$${totalInvestedDollars.toFixed(2)}`;
            document.getElementById('sharesOwned').textContent = sharesOwned.toFixed(6);
            document.getElementById('averageCost').textContent = `$${avgCost.toFixed(2)}`;
            document.getElementById('currentValue').textContent = `$${currentValueDollars.toFixed(2)}`;
            
            const gainLossElement = document.getElementById('gainLoss');
            gainLossElement.textContent = `$${gainLossDollars.toFixed(2)} (${gainLossPercent.toFixed(1)}%)`;
            gainLossElement.parentElement.className = `metric-card ${gainLossDollars >= 0 ? 'positive' : 'negative'}`;
        }
    }
    
    // ... (rest of the methods remain similar but with Hypernum integration)
    
    initializeUI() {
        if (document.getElementById('currentDay')) {
            document.getElementById('currentDay').textContent = this.currentDay;
        }
        this.updatePortfolioDisplay();
        this.updateDimensionalInsights();
        this.updateInvestmentRecommendations();
    }
    
    setupEventListeners() {
        // Add configuration display
        this.displayConfiguration();
    }
    
    displayConfiguration() {
        const configDisplay = document.getElementById('configDisplay');
        if (configDisplay && this.config) {
            configDisplay.innerHTML = `
                <h4>Active Configuration</h4>
                <p><strong>Precision:</strong> ${this.config.precision}</p>
                <p><strong>Rounding:</strong> ${this.config.roundingMode}</p>
                <p><strong>Risk Tolerance:</strong> ${this.config.investment?.riskTolerance || 'default'}</p>
                <p><strong>Decision Threshold:</strong> ${this.config.investment?.decisionThreshold || 0.7}</p>
            `;
        }
    }
    
    logAction(message, type) {
        console.log(`[${type.toUpperCase()}] ${message}`);
        const logContainer = document.getElementById('investmentLog');
        if (logContainer) {
            const logEntry = document.createElement('div');
            logEntry.className = `log-entry ${type}`;
            logEntry.innerHTML = `
                <span>${message}</span>
                <span>${new Date().toLocaleTimeString()}</span>
            `;
            logContainer.insertBefore(logEntry, logContainer.firstChild);
        }
    }
}

// Export for different module systems
export { HypernumInvestmentSimulator, ConfigLoader, DimensionalGameTheory };

// Initialize if running in browser
if (typeof window !== 'undefined') {
    window.HypernumInvestmentSimulator = HypernumInvestmentSimulator;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new HypernumInvestmentSimulator();
        });
    } else {
        new HypernumInvestmentSimulator();
    }
}
