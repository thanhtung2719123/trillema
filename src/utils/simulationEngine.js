import { ECONOMIC_DATA } from '../config/economicData';

/**
 * Simulation Engine for the Impossible Trinity
 * Models the trade-off between MI, ERS, and KAO
 */

export class ImpossibleTrinitySimulation {
  constructor(params) {
    this.params = {
      vietnamRate: params.vietnamRate || ECONOMIC_DATA.monetaryIndependence.vietnamPolicyRate,
      usRate: params.usRate || ECONOMIC_DATA.monetaryIndependence.usFedRate,
      capitalOpenness: params.capitalOpenness || ECONOMIC_DATA.financialIntegration.kaopenIndex,
      foreignReserves: params.foreignReserves || ECONOMIC_DATA.exchangeRateStability.foreignReserves,
      centralRate: params.centralRate || ECONOMIC_DATA.exchangeRateStability.centralRate,
    };
  }

  /**
   * Calculate interest rate differential
   */
  calculateRateDifferential() {
    return this.params.vietnamRate - this.params.usRate;
  }

  /**
   * Calculate capital flow pressure based on rate differential and openness
   * Positive = inflow, Negative = outflow
   */
  calculateCapitalFlowPressure() {
    const rateDiff = this.calculateRateDifferential();
    const opennessMultiplier = (this.params.capitalOpenness + 2) / 2; // Normalize to 0-1 range
    
    // Higher rate differential + more openness = more capital flow
    const flowPressure = rateDiff * opennessMultiplier * 10; // Scale factor
    
    return flowPressure;
  }

  /**
   * Calculate exchange rate impact
   * Capital inflows appreciate currency (lower VND/USD)
   * Capital outflows depreciate currency (higher VND/USD)
   */
  calculateExchangeRateImpact() {
    const capitalFlow = this.calculateCapitalFlowPressure();
    const baseRate = this.params.centralRate;
    
    // Impact factor (scaled)
    const impactFactor = -capitalFlow * 50; // Negative because inflow appreciates (lowers VND/USD)
    
    const newRate = baseRate + impactFactor;
    
    return {
      newRate: Math.max(20000, Math.min(30000, newRate)), // Bounds checking
      change: impactFactor,
      percentChange: (impactFactor / baseRate) * 100
    };
  }

  /**
   * Calculate volatility based on capital openness and rate differential
   */
  calculateVolatility() {
    const rateDiff = Math.abs(this.calculateRateDifferential());
    const openness = (this.params.capitalOpenness + 2) / 2; // Normalize
    
    // More openness + larger rate differential = more volatility
    const baseVolatility = ECONOMIC_DATA.exchangeRateStability.volatilityBand;
    const additionalVolatility = rateDiff * openness * 2;
    
    return Math.min(20, baseVolatility + additionalVolatility);
  }

  /**
   * Calculate foreign reserve depletion from intervention
   */
  calculateReserveDepletion() {
    const capitalFlow = this.calculateCapitalFlowPressure();
    
    // If capital outflow (negative), reserves are used to defend currency
    if (capitalFlow < 0) {
      const depletion = Math.abs(capitalFlow) * 0.5; // Depletion rate
      const newReserves = this.params.foreignReserves - depletion;
      
      return {
        newReserves: Math.max(0, newReserves),
        depletion: depletion,
        percentDepletion: (depletion / this.params.foreignReserves) * 100
      };
    }
    
    // Capital inflow builds reserves
    const accumulation = capitalFlow * 0.3;
    return {
      newReserves: this.params.foreignReserves + accumulation,
      depletion: -accumulation,
      percentDepletion: -(accumulation / this.params.foreignReserves) * 100
    };
  }

  /**
   * Determine which constraint is violated (the "impossible" third leg)
   */
  determineViolatedConstraint() {
    const rateDiff = Math.abs(this.calculateRateDifferential());
    const volatility = this.calculateVolatility();
    const reserves = this.calculateReserveDepletion();
    
    const constraints = ECONOMIC_DATA.constraints;
    
    // Check which constraint is most violated
    const violations = {
      mi: rateDiff > constraints.maxRateDifferential,
      ers: volatility > constraints.maxVolatility || reserves.newReserves < constraints.minReserves,
      kao: false // This is typically the policy choice
    };
    
    // Determine severity
    let mostViolated = 'none';
    let severity = 'stable';
    
    if (violations.mi) {
      mostViolated = 'mi';
      severity = rateDiff > constraints.maxRateDifferential * 2 ? 'crisis' : 'warning';
    }
    
    if (violations.ers) {
      mostViolated = 'ers';
      if (reserves.newReserves < constraints.minReserves) {
        severity = 'crisis';
      } else if (volatility > constraints.maxVolatility * 1.5) {
        severity = 'crisis';
      } else {
        severity = 'warning';
      }
    }
    
    return { mostViolated, severity, violations };
  }

  /**
   * Run complete simulation
   */
  simulate() {
    const rateDifferential = this.calculateRateDifferential();
    const capitalFlow = this.calculateCapitalFlowPressure();
    const exchangeRate = this.calculateExchangeRateImpact();
    const volatility = this.calculateVolatility();
    const reserves = this.calculateReserveDepletion();
    const constraint = this.determineViolatedConstraint();
    
    return {
      inputs: {
        vietnamRate: this.params.vietnamRate,
        usRate: this.params.usRate,
        capitalOpenness: this.params.capitalOpenness,
        foreignReserves: this.params.foreignReserves,
        centralRate: this.params.centralRate,
      },
      outputs: {
        rateDifferential,
        capitalFlow,
        exchangeRate,
        volatility,
        reserves,
        constraint,
      },
      summary: this.generateSummary({
        rateDifferential,
        capitalFlow,
        exchangeRate,
        volatility,
        reserves,
        constraint,
      })
    };
  }

  /**
   * Generate text summary for AI explanation
   */
  generateSummary(outputs) {
    const flowDirection = outputs.capitalFlow > 0 ? 'inflow' : 'outflow';
    const rateDirection = outputs.exchangeRate.change > 0 ? 'depreciation' : 'appreciation';
    
    return `
Interest Rate Differential: ${outputs.rateDifferential.toFixed(2)}%
Capital Flow: ${Math.abs(outputs.capitalFlow).toFixed(2)} billion (${flowDirection})
Exchange Rate: ${outputs.exchangeRate.newRate.toFixed(0)} VND/USD (${rateDirection} of ${Math.abs(outputs.exchangeRate.percentChange).toFixed(2)}%)
Volatility: ${outputs.volatility.toFixed(2)}%
Foreign Reserves: $${outputs.reserves.newReserves.toFixed(2)} billion (${outputs.reserves.depletion > 0 ? 'depletion' : 'accumulation'} of ${Math.abs(outputs.reserves.percentDepletion).toFixed(2)}%)
Constraint Violated: ${outputs.constraint.mostViolated.toUpperCase()}
Severity: ${outputs.constraint.severity.toUpperCase()}
    `.trim();
  }
}

export function createSimulation(params) {
  const sim = new ImpossibleTrinitySimulation(params);
  return sim.simulate();
}

