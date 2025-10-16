# Vietnam Exchange Rate Simulation
## Mô Phỏng Tỷ Giá Hối Đoái Việt Nam

A sophisticated React-based web application that simulates Vietnam's exchange rate dynamics using the **Impossible Trinity** (Trilemma) model, integrated with Google's Gemini AI for intelligent economic explanations.

![Vietnam Exchange Rate Simulation](https://img.shields.io/badge/React-18.2-blue) ![Gemini AI](https://img.shields.io/badge/Gemini-2.0--flash--exp-orange) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🌟 Features

### Core Functionality
- **Interactive Simulation**: Adjust monetary policy, capital openness, and foreign reserves to see real-time impacts on Vietnam's exchange rate
- **Impossible Trinity Model**: Visualizes the fundamental trade-off between:
  - **Monetary Independence (MI)**: Vietnam's policy rate vs. US Fed rate
  - **Exchange Rate Stability (ERS)**: VND/USD volatility and foreign reserves
  - **Financial Integration (KAO)**: Capital account openness (Chinn-Ito Index)

### Real Vietnam Data (2023-2025)
- Vietnam Policy Rate: **4.50%**
- US Federal Funds Rate: **4.00-4.25%**
- VND/USD Central Rate: **25,186**
- Foreign Reserves: **$83.08 Billion**
- Capital Openness (KAOPEN): **-0.166** (restricted)

### AI-Powered Explanations
- **Gemini AI Integration**: Generate detailed, context-aware explanations in Vietnamese or English
- Explains how parameter changes affect:
  - Exchange rate movements
  - Capital flow dynamics
  - Policy implications for the State Bank of Vietnam (SBV)
  - Real-world economic consequences

### Beautiful UI/UX
- **Bilingual Support**: Vietnamese 🇻🇳 and English 🇬🇧
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Visualizations**: 
  - Animated Trinity Triangle
  - Real-time metrics dashboard
  - Color-coded severity indicators (Stable/Warning/Crisis)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Gemini API Key (free from [Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanhtung2719123/trillema.git
   cd trillema
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start (Windows)
Simply double-click `run.bat` to start the app automatically!

---

## 🔑 Gemini API Configuration

### Option 1: Auto-configured (Default)
The app comes with a demo API key pre-configured. Just open the app and it works!

### Option 2: Use Your Own Key
1. Get a **free API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. In the app, click "Change" next to the API key status
3. Enter your key and click "Save"

### Option 3: For Developers
Edit `src/config/apiConfig.js` to change the default key:
```javascript
export const DEFAULT_GEMINI_API_KEY = 'your_key_here';
```

**Note**: API keys are stored in browser localStorage for convenience.

---

## 📊 How to Use

### Basic Simulation

1. **Adjust Parameters**:
   - **Vietnam Policy Rate**: Move the slider to change Vietnam's interest rate (0-10%)
   - **US Fed Rate**: Adjust the US reference rate (0-8%)
   - **Capital Openness**: Change capital account restrictions (-2 to +2, where negative = restricted)
   - **Foreign Reserves**: Set the reserve buffer ($20B - $150B)

2. **Run Simulation**:
   - Click the **"Mô Phỏng"** (Simulate) button
   - View the results in the dashboard below

3. **Interpret Results**:
   - **Exchange Rate**: See if VND appreciates (↓) or depreciates (↑)
   - **Foreign Reserves**: Check if reserves are depleted or accumulated
   - **Volatility**: Monitor market instability
   - **Capital Flow**: Observe inflow or outflow pressure

4. **Get AI Explanation**:
   - Click **"Tạo Giải Thích"** (Generate Explanation)
   - Read detailed analysis of your scenario

### Example Scenarios

#### Scenario 1: Capital Account Liberalization
- **Setup**: Increase Capital Openness from -0.166 to +1.0
- **Expected Result**: Increased volatility, potential capital outflow if rate differential is negative
- **Trinity Impact**: Financial Integration achieved, but ERS or MI may be compromised

#### Scenario 2: Interest Rate Hike
- **Setup**: Raise Vietnam Policy Rate from 4.5% to 7.0%
- **Expected Result**: Capital inflow, VND appreciation, reserve accumulation
- **Trinity Impact**: MI maintained, ERS improved, but KAO becomes more constrained

#### Scenario 3: Reserve Depletion Crisis
- **Setup**: Lower Foreign Reserves to $25B, keep Capital Openness high
- **Expected Result**: Crisis warning, inability to defend exchange rate
- **Trinity Impact**: Critical ERS violation

---

## 📁 Project Structure

```
vmqtt/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── ControlPanel.js     # Parameter adjustment controls
│   │   ├── ControlPanel.css
│   │   ├── ResultsDisplay.js   # Simulation results dashboard
│   │   ├── ResultsDisplay.css
│   │   ├── TriangleVisualization.js   # Impossible Trinity diagram
│   │   ├── TriangleVisualization.css
│   │   ├── AIExplanation.js    # Gemini AI integration
│   │   ├── AIExplanation.css
│   │   ├── APIKeyInput.js      # API key configuration
│   │   └── APIKeyInput.css
│   ├── config/
│   │   └── economicData.js     # Real Vietnam economic data
│   ├── services/
│   │   └── geminiService.js    # Gemini AI service wrapper
│   ├── utils/
│   │   └── simulationEngine.js # Core simulation logic
│   ├── App.js                  # Main application component
│   ├── App.css
│   ├── index.js                # React entry point
│   └── index.css
├── package.json
└── README.md
```

---

## 🧮 The Impossible Trinity Model

The simulation is based on the **Mundell-Fleming Trilemma**, which states that a country cannot simultaneously achieve:

1. **Monetary Independence**: Ability to set interest rates independently
2. **Exchange Rate Stability**: Fixed or stable currency value
3. **Financial Integration**: Free cross-border capital flows

### Vietnam's Current Stance
Vietnam traditionally prioritizes **MI + ERS**, maintaining:
- Independent monetary policy (4.5% refinancing rate)
- Managed float exchange rate (±5% band around 25,186 VND/USD)
- **Restricted capital flows** (KAOPEN = -0.166)

The simulation shows what happens when you alter this balance.

---

## 🔬 Technical Details

### Simulation Algorithm

The simulation calculates:

1. **Interest Rate Differential**: `Δi = i_Vietnam - i_US`
2. **Capital Flow Pressure**: `Flow = Δi × (KAOPEN + 2) / 2 × 10`
3. **Exchange Rate Impact**: `ΔE = -Flow × 50` (negative because inflow appreciates VND)
4. **Volatility**: `σ = 5% + |Δi| × (KAOPEN + 2) / 2 × 2`
5. **Reserve Depletion**: `ΔR = |Flow| × 0.5` (if outflow)

### Constraint Violation Detection

- **MI Violation**: Rate differential > 3%
- **ERS Violation**: Volatility > 15% OR Reserves < $20B
- **Severity Levels**:
  - **Stable**: All constraints met
  - **Warning**: Minor violation
  - **Crisis**: Critical violation (reserves critically low or extreme volatility)

---

## 🌐 Internationalization

The app supports:
- **Vietnamese (vi)**: Default language
- **English (en)**: Toggle with the language button

All UI elements, explanations, and error messages are fully bilingual.

---

## 🛠️ Built With

- **React 18.2**: Modern UI framework
- **Recharts**: Data visualization (installed but can be extended)
- **Lucide React**: Beautiful icon library
- **Google Generative AI SDK**: Gemini 2.0-flash-exp integration
- **CSS3**: Custom styling with gradients and animations

---

## 📚 Data Sources

- **Vietnam Policy Rate**: State Bank of Vietnam (SBV)
- **US Fed Rate**: U.S. Federal Reserve
- **Exchange Rate**: SBV Central Rate (Sep 2025)
- **Foreign Reserves**: IMF/World Bank (2024)
- **KAOPEN Index**: Chinn-Ito Index (2021)
- **Capital Flow Data**: Market news (Jan-Aug 2025)

---

## 🎓 Educational Use

This tool is designed for:
- **Students**: Learning international macroeconomics
- **Policymakers**: Understanding trade-offs in monetary policy
- **Researchers**: Exploring capital account liberalization scenarios
- **General Public**: Understanding Vietnam's economic policies

**Disclaimer**: This is an educational simulation. It simplifies complex economic dynamics and should not be used for actual financial or policy decisions.

---

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Add more economic indicators (inflation, GDP growth)
- Implement time-series simulation (dynamic over months/years)
- Add historical data comparison
- Enhance visualizations with charts
- Add more AI insights

---

## 🚀 Deployment

### Deploy to Vercel (Free & Easy!)

1. **Push to GitHub** (if not already):
   ```bash
   # Windows users: just run
   push-to-github.bat
   
   # Or manually:
   git init
   git remote add origin https://github.com/thanhtung2719123/trillema.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository
   - Click Deploy (zero configuration needed!)
   - Done! Your app is live in 2-3 minutes

**Live Demo**: Coming soon at `https://trillema.vercel.app`

For detailed instructions, see:
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Push to GitHub
- [DEPLOY.md](./DEPLOY.md) - Deploy to Vercel

---

## 📄 License

MIT License - feel free to use this for educational purposes.

---

## 🙏 Acknowledgments

- State Bank of Vietnam for public economic data
- Chinn-Ito for the Capital Account Openness Index
- Google for the Gemini AI API
- The open-source React community

---

## 📞 Support

- **GitHub Issues**: [Report bugs](https://github.com/thanhtung2719123/trillema/issues)
- **Documentation**: Check the comprehensive guides in this repo
- **AI Explanations**: Use the in-app Gemini AI feature

---

## 🌟 Star This Project

If you find this useful, please ⭐ star the repo at:
**https://github.com/thanhtung2719123/trillema**

---

**Made with ❤️ for Vietnam's Economic Education**

*Được tạo ra với ❤️ cho Giáo dục Kinh tế Việt Nam*


#   t r i l l e m a 
 
 