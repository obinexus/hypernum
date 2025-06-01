// strategy.js - Warren Buffett Investment Simulator with DGT

// Mock Hypernum implementation for browser compatibility
class MockHypernum {
    add(a, b) {
        return BigInt(a) + BigInt(b);
    }
    
    subtract(a, b) {
        return BigInt(a) - BigInt(b);
    }
    
    multiply(a, b) {
        return BigInt(a) * BigInt(b);
    }
    
    divide(a, b) {
        const result = (BigInt(a) * 1000n) / BigInt(b);
        return result;
    }
    
    precision(value, decimals = 2) {
        return Number(value) / Math.pow(10, decimals);
    }
}

const hypernum = new MockHypernum();

// DGT Dimensional Analysis
const StrategyDimensions = {
    GROWTH_RISK: 'growth-risk',
    VOLATILITY_SPIKE: 'volatility-spike', 
    TREND_MOMENTUM: 'trend-momentum',
    MARKET_SENTIMENT: 'market-sentiment',
    PRECISION_TENSION: 'precision-tension'
};

class DimensionalGameTheory {
    constructor() {
        this.thresholds = {
            volatility_safe: 0.25,
            volatility_risky: 0.40,
            trend_days_required: 3,
            risk_conservative: 0.30,
            risk_aggressive: 0.60
        };
    }
    
    analyzeDay(dayData, previousDays = []) {
        const dimensions = [];
        const { price, volatility, trend, risk, momentum, dimensional_tags } = dayData;
        
        // Growth Risk Analysis
        if (dimensional_tags.growth_risk > 0.4) {
            dimensions.push({
                type: StrategyDimensions.GROWTH_RISK,
                activation: dimensional_tags.growth_risk,
                evidence: [`High growth risk: ${(dimensional_tags.growth_risk * 100).toFixed(1)}%`]
            });
        }
        
        // Volatility Spike Detection
        if (volatility > this.thresholds.volatility_risky) {
            dimensions.push({
                type: StrategyDimensions.VOLATILITY_SPIKE,
                activation: volatility,
                evidence: [`Volatility spike: ${(volatility * 100).toFixed(1)}%`]
            });
        }
        
        // Trend Momentum Analysis
        const recentTrend = this.analyzeTrend(dayData, previousDays);
        if (recentTrend.strength > 0.6) {
            dimensions.push({
                type: StrategyDimensions.TREND_MOMENTUM,
                activation: recentTrend.strength,
                evidence: [`${recentTrend.direction} trend for ${recentTrend.days} days`]
            });
        }
        
        // Market Sentiment
        const sentimentScore = this.analyzeSentiment(dimensional_tags.market_sentiment);
        if (sentimentScore.activation > 0.5) {
            dimensions.push({
                type: StrategyDimensions.MARKET_SENTIMENT,
                activation: sentimentScore.activation,
                evidence: [`Market sentiment: ${dimensional_tags.market_sentiment}`]
            });
        }
        
        return {
            dimensions,
            overall_risk: risk,
            recommendation: this.generateRecommendation(dimensions, risk, trend, volatility)
        };
    }
    
    analyzeTrend(currentDay, previousDays) {
        const recentDays = previousDays.slice(-3);
        if (recentDays.length < 2) return { strength: 0, direction: 'neutral', days: 0 };
        
        let upDays = 0;
        let downDays = 0;
        
        for (let i = 1; i < recentDays.length; i++) {
            if (recentDays[i].price > recentDays[i-1].price) upDays++;
            else if (recentDays[i].price < recentDays[i-1].price) downDays++;
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
            confidence: 0.5,
            reasoning: [],
            risk_level: 'MEDIUM'
        };
        
        // Conservative Buffett-style rules
        const hasVolatilitySpike = dimensions.some(d => d.type === StrategyDimensions.VOLATILITY_SPIKE);
        const hasPositiveMomentum = dimensions.some(d => 
            d.type === StrategyDimensions.TREND_MOMENTUM && d.evidence[0].includes('upward')
        );
        const hasGrowthRisk = dimensions.some(d => d.type === StrategyDimensions.GROWTH_RISK);
        
        if (volatility < this.thresholds.volatility_safe && trend === 'upward' && risk < this.thresholds.risk_conservative) {
            recommendation.action = 'BUY';
            recommendation.confidence = 0.8;
            recommendation.risk_level = 'LOW';
            recommendation.reasoning.push('Low volatility + upward trend + acceptable risk');
        } else if (hasVolatilitySpike || risk > this.thresholds.risk_aggressive) {
            recommendation.action = 'AVOID';
            recommendation.confidence = 0.7;
            recommendation.risk_level = 'HIGH';
            recommendation.reasoning.push('High volatility or excessive risk detected');
        } else if (hasPositiveMomentum && !hasGrowthRisk) {
            recommendation.action = 'CONSIDER';
            recommendation.confidence = 0.6;
            recommendation.risk_level = 'MEDIUM';
            recommendation.reasoning.push('Positive momentum but monitor closely');
        }
        
        return recommendation;
    }
}

class InvestmentSimulator {
    constructor() {
        this.dgt = new DimensionalGameTheory();
        this.portfolio = {
            totalInvested: 0n,
            shares: 0n,
            investments: []
        };
        this.stockData = [];
        this.currentDay = 1;
        this.riskMode = 'conservative';
        this.investmentAmount = 1000;
        this.chart = null;
        this.autoTrading = false;
        
        this.loadStockData();
        this.initializeUI();
        this.setupEventListeners();
    }
    
    async loadStockData() {
        try {
            const response = await fetch('prices.json');
            this.stockData = await response.json();
            this.initializeChart();
            this.updateDisplay();
        } catch (error) {
            console.error('Failed to load stock data:', error);
            // Fallback to embedded data if file not found
            this.stockData = this.generateFallbackData();
            this.initializeChart();
            this.updateDisplay();
        }
    }
    
    generateFallbackData() {
        // Fallback data in case JSON file isn't available
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
                    market_sentiment: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)]
                }
            });
        }
        return data;
    }
    
    initializeChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        const chartData = this.stockData.map(d => d.price);
        const labels = this.stockData.map(d => `Day ${d.day}`);
        
        // Color code based on investment opportunities
        const backgroundColors = this.stockData.map(dayData => {
            const analysis = this.dgt.analyzeDay(dayData, this.stockData.slice(0, dayData.day - 1));
            switch (analysis.recommendation.action) {
                case 'BUY': return 'rgba(39, 174, 96, 0.2)';
                case 'AVOID': return 'rgba(231, 76, 60, 0.2)';
                default: return 'rgba(241, 196, 15, 0.2)';
            }
        });
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock Price ($)',
                    data: chartData,
                    borderColor: '#3498db',
                    backgroundColor: backgroundColors,
                    borderWidth: 2,
                    fill: false,
                    pointBackgroundColor: backgroundColors,
                    pointBorderColor: '#2c3e50',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Stock Price with DGT Investment Windows'
                    },
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Trading Day'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    initializeUI() {
        document.getElementById('currentDay').textContent = this.currentDay;
        this.updatePortfolioDisplay();
        this.updateDimensionalInsights();
        this.updateInvestmentRecommendations();
    }
    
    setupEventListeners() {
        document.getElementById('riskMode').addEventListener('change', (e) => {
            this.riskMode = e.target.value;
            this.updateDisplay();
        });
        
        document.getElementById('investmentAmount').addEventListener('change', (e) => {
            this.investmentAmount = parseInt(e.target.value);
        });
        
        document.getElementById('nextDay').addEventListener('click', () => {
            this.nextTradingDay();
        });
        
        document.getElementById('autoTrade').addEventListener('click', () => {
            this.toggleAutoTrading();
        });
        
        document.getElementById('resetSimulation').addEventListener('click', () => {
            this.resetSimulation();
        });
    }
    
    nextTradingDay() {
        if (this.currentDay >= this.stockData.length) {
            alert('Simulation complete! Check your final results.');
            return;
        }
        
        const dayData = this.stockData[this.currentDay - 1];
        const previousDays = this.stockData.slice(0, this.currentDay - 1);
        const analysis = this.dgt.analyzeDay(dayData, previousDays);
        
        // Make investment decision
        if (this.shouldInvest(analysis, dayData)) {
            this.makeInvestment(dayData);
        } else {
            this.logAction(`Day ${this.currentDay}: Skipped investment - ${analysis.recommendation.reasoning.join(', ')}`, 'skip');
        }
        
        this.currentDay++;
        document.getElementById('currentDay').textContent = this.currentDay;
        
        this.updateDisplay();
        
        if (this.autoTrading && this.currentDay <= this.stockData.length) {
            setTimeout(() => this.nextTradingDay(), 1000);
        }
    }
    
    shouldInvest(analysis, dayData) {
        const recommendation = analysis.recommendation;
        
        if (this.riskMode === 'conservative') {
            return recommendation.action === 'BUY' && recommendation.confidence >= 0.7;
        } else {
            return recommendation.action === 'BUY' || recommendation.action === 'CONSIDER';
        }
    }
    
    makeInvestment(dayData) {
        const investmentBigInt = BigInt(this.investmentAmount * 100); // Convert to cents
        const priceBigInt = BigInt(Math.floor(dayData.price * 100)); // Convert to cents
        const newShares = hypernum.divide(investmentBigInt, priceBigInt);
        
        this.portfolio.totalInvested = hypernum.add(this.portfolio.totalInvested, investmentBigInt);
        this.portfolio.shares = hypernum.add(this.portfolio.shares, newShares);
        
        const investment = {
            day: this.currentDay,
            amount: this.investmentAmount,
            price: dayData.price,
            shares: hypernum.precision(newShares, 3)
        };
        
        this.portfolio.investments.push(investment);
        
        this.logAction(
            `Day ${this.currentDay}: Invested $${this.investmentAmount} @ $${dayData.price.toFixed(2)} = ${investment.shares.toFixed(3)} shares`,
            'investment'
        );
    }
    
    toggleAutoTrading() {
        this.autoTrading = !this.autoTrading;
        const button = document.getElementById('autoTrade');
        button.textContent = this.autoTrading ? 'Stop Auto-Trade' : 'Auto-Trade (Watch Strategy)';
        
        if (this.autoTrading) {
            this.nextTradingDay();
        }
    }
    
    resetSimulation() {
        this.portfolio = {
            totalInvested: 0n,
            shares: 0n,
            investments: []
        };
        this.currentDay = 1;
        this.autoTrading = false;
        
        document.getElementById('currentDay').textContent = this.currentDay;
        document.getElementById('autoTrade').textContent = 'Auto-Trade (Watch Strategy)';
        document.getElementById('investmentLog').innerHTML = '';
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.updatePortfolioDisplay();
        this.updateDimensionalInsights();
        this.updateInvestmentRecommendations();
    }
    
    updatePortfolioDisplay() {
        const currentPrice = this.currentDay <= this.stockData.length ? 
            this.stockData[this.currentDay - 1].price : 
            this.stockData[this.stockData.length - 1].price;
            
        const totalInvestedDollars = hypernum.precision(this.portfolio.totalInvested, 2);
        const sharesOwned = hypernum.precision(this.portfolio.shares, 3);
        const currentValueCents = hypernum.multiply(this.portfolio.shares, BigInt(Math.floor(currentPrice * 100)));
        const currentValue = hypernum.precision(currentValueCents, 2);
        
        const gainLossCents = hypernum.subtract(currentValueCents, this.portfolio.totalInvested);
        const gainLoss = hypernum.precision(gainLossCents, 2);
        const gainLossPercent = totalInvestedDollars > 0 ? (gainLoss / totalInvestedDollars * 100) : 0;
        
        const avgCost = sharesOwned > 0 ? totalInvestedDollars / sharesOwned : 0;
        const riskReward = this.calculateRiskReward();
        
        document.getElementById('totalInvested').textContent = `$${totalInvestedDollars.toFixed(2)}`;
        document.getElementById('sharesOwned').textContent = sharesOwned.toFixed(3);
        document.getElementById('averageCost').textContent = `$${avgCost.toFixed(2)}`;
        document.getElementById('currentValue').textContent = `$${currentValue.toFixed(2)}`;
        
        const gainLossElement = document.getElementById('gainLoss');
        gainLossElement.textContent = `$${gainLoss.toFixed(2)} (${gainLossPercent.toFixed(1)}%)`;
        gainLossElement.parentElement.className = `metric-card ${gainLoss >= 0 ? 'positive' : 'negative'}`;
        
        document.getElementById('riskReward').textContent = riskReward.toFixed(2);
    }
    
    calculateRiskReward() {
        if (this.portfolio.investments.length === 0) return 0;
        
        const totalReturn = this.portfolio.investments.reduce((sum, inv) => {
            const currentPrice = this.currentDay <= this.stockData.length ? 
                this.stockData[this.currentDay - 1].price : 
                this.stockData[this.stockData.length - 1].price;
            return sum + (currentPrice - inv.price) * inv.shares;
        }, 0);
        
        const totalRisk = this.portfolio.investments.reduce((sum, inv) => {
            const dayData = this.stockData[inv.day - 1];
            return sum + (dayData.volatility * inv.amount);
        }, 0);
        
        return totalRisk > 0 ? totalReturn / totalRisk : 0;
    }
    
    updateDimensionalInsights() {
        if (this.currentDay > this.stockData.length) return;
        
        const dayData = this.stockData[this.currentDay - 1];
        const previousDays = this.stockData.slice(0, this.currentDay - 1);
        const analysis = this.dgt.analyzeDay(dayData, previousDays);
        
        const insightsContainer = document.getElementById('dimensionalInsights');
        insightsContainer.innerHTML = '';
        
        analysis.dimensions.forEach(dimension => {
            const insightDiv = document.createElement('div');
            insightDiv.className = 'dimension-insight';
            insightDiv.innerHTML = `
                <h4>${dimension.type.toUpperCase()} (${(dimension.activation * 100).toFixed(1)}%)</h4>
                <p>${dimension.evidence.join(', ')}</p>
            `;
            insightsContainer.appendChild(insightDiv);
        });
        
        if (analysis.dimensions.length === 0) {
            insightsContainer.innerHTML = '<p>No significant dimensional risks detected for current day.</p>';
        }
    }
    
    updateInvestmentRecommendations() {
        if (this.currentDay > this.stockData.length) return;
        
        const dayData = this.stockData[this.currentDay - 1];
        const previousDays = this.stockData.slice(0, this.currentDay - 1);
        const analysis = this.dgt.analyzeDay(dayData, previousDays);
        
        const recommendationsContainer = document.getElementById('investmentRecommendations');
        recommendationsContainer.innerHTML = '';
        
        const recommendation = analysis.recommendation;
        const card = document.createElement('div');
        card.className = `recommendation-card ${recommendation.risk_level.toLowerCase()}`;
        
        let actionColor = '#f39c12';
        if (recommendation.action === 'BUY') actionColor = '#27ae60';
        else if (recommendation.action === 'AVOID') actionColor = '#e74c3c';
        
        card.innerHTML = `
            <h4 style="color: ${actionColor}">Day ${this.currentDay}: ${recommendation.action}</h4>
            <p><strong>Confidence:</strong> ${(recommendation.confidence * 100).toFixed(1)}%</p>
            <p><strong>Risk Level:</strong> ${recommendation.risk_level}</p>
            <p><strong>Price:</strong> $${dayData.price.toFixed(2)}</p>
            <p><strong>Volatility:</strong> ${(dayData.volatility * 100).toFixed(1)}%</p>
            <p><strong>Reasoning:</strong> ${recommendation.reasoning.join(', ')}</p>
        `;
        
        recommendationsContainer.appendChild(card);
    }
    
    logAction(message, type) {
        const logContainer = document.getElementById('investmentLog');
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.innerHTML = `
            <span>${message}</span>
            <span>${new Date().toLocaleTimeString()}</span>
        `;
        logContainer.insertBefore(logEntry, logContainer.firstChild);
    }
}

// Initialize the simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    new InvestmentSimulator();
});