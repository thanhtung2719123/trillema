import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini AI Service for generating explanations
 */
class GeminiService {
  constructor() {
    this.apiKey = null;
    this.genAI = null;
    this.model = null;
  }

  /**
   * Initialize the Gemini API with user's API key
   */
  initialize(apiKey) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  /**
   * Check if the service is initialized
   */
  isInitialized() {
    return this.apiKey !== null && this.genAI !== null;
  }

  /**
   * Generate explanation for simulation results
   */
  async generateExplanation(simulationData, userChanges, language = 'vi') {
    if (!this.isInitialized()) {
      throw new Error('Gemini API not initialized. Please provide an API key.');
    }

    const prompt = this.buildPrompt(simulationData, userChanges, language);

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Failed to generate explanation: ${error.message}`);
    }
  }

  /**
   * Build the prompt for Gemini
   */
  buildPrompt(simulationData, userChanges, language) {
    const { inputs, outputs, summary } = simulationData;

    const languageInstruction = language === 'vi' 
      ? 'Vui lòng trả lời bằng tiếng Việt.'
      : 'Please respond in English.';

    const prompt = `
You are an expert economist specializing in international finance and the Impossible Trinity (Trilemma) model.

CONTEXT:
Vietnam operates under a managed float exchange rate regime, traditionally prioritizing Exchange Rate Stability (ERS) and Monetary Independence (MI), while maintaining capital controls (restricted Financial Integration/KAO).

CURRENT SIMULATION DATA:
${summary}

USER CHANGES:
${this.formatUserChanges(userChanges)}

BASELINE DATA (Vietnam, 2025):
- Vietnam Policy Rate: 4.50%
- US Fed Rate: 4.25%
- Central Exchange Rate: 25,186 VND/USD
- Foreign Reserves: $83.08 billion
- Capital Openness (KAOPEN): -0.166 (restricted)

TASK:
Explain in detail (200-300 words):

1. **How the user's changes affect the exchange rate**: Analyze the specific impact of the parameter changes on VND/USD.

2. **Capital flow dynamics**: Explain whether capital flows in or out, and why (interest rate arbitrage, risk factors).

3. **Impact on the Impossible Trinity**: Which of the three goals (MI, ERS, KAO) is being compromised? Why can't all three be maintained simultaneously?

4. **Policy implications**: What would the State Bank of Vietnam (SBV) need to do to manage this scenario? (e.g., intervention, rate adjustments, capital controls)

5. **Real-world consequences**: What are the practical effects on the Vietnamese economy, businesses, and citizens?

${languageInstruction}

Use clear, accessible language suitable for students and policymakers. Include specific numbers from the simulation results.
    `.trim();

    return prompt;
  }

  /**
   * Format user changes for the prompt
   */
  formatUserChanges(userChanges) {
    if (!userChanges || Object.keys(userChanges).length === 0) {
      return 'No changes from baseline.';
    }

    const changes = [];
    if (userChanges.vietnamRate !== undefined) {
      changes.push(`- Vietnam Policy Rate changed to ${userChanges.vietnamRate}%`);
    }
    if (userChanges.usRate !== undefined) {
      changes.push(`- US Fed Rate changed to ${userChanges.usRate}%`);
    }
    if (userChanges.capitalOpenness !== undefined) {
      changes.push(`- Capital Openness (KAOPEN) changed to ${userChanges.capitalOpenness}`);
    }
    if (userChanges.foreignReserves !== undefined) {
      changes.push(`- Foreign Reserves changed to $${userChanges.foreignReserves} billion`);
    }

    return changes.join('\n');
  }

  /**
   * Generate a quick insight (shorter explanation)
   */
  async generateQuickInsight(simulationData, language = 'vi') {
    if (!this.isInitialized()) {
      throw new Error('Gemini API not initialized. Please provide an API key.');
    }

    const { outputs } = simulationData;
    const languageInstruction = language === 'vi' 
      ? 'Trả lời bằng tiếng Việt trong 2-3 câu ngắn gọn.'
      : 'Respond in English in 2-3 brief sentences.';

    const prompt = `
Based on this Vietnam exchange rate simulation:
- Exchange Rate: ${outputs.exchangeRate.newRate.toFixed(0)} VND/USD (${outputs.exchangeRate.percentChange.toFixed(2)}% change)
- Volatility: ${outputs.volatility.toFixed(2)}%
- Foreign Reserves: $${outputs.reserves.newReserves.toFixed(2)} billion
- Constraint Violated: ${outputs.constraint.mostViolated}
- Severity: ${outputs.constraint.severity}

Provide a brief summary of the key risk or opportunity in this scenario.

${languageInstruction}
    `.trim();

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error(`Failed to generate insight: ${error.message}`);
    }
  }
}

// Singleton instance
const geminiService = new GeminiService();

export default geminiService;


