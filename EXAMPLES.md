# Usage Examples & Scenarios
## Ví Dụ Sử Dụng & Kịch Bản

---

## 📚 Educational Scenarios

### 1. Understanding the Baseline (Vietnam's Current Policy)

**Setup:**
- Vietnam Policy Rate: **4.50%**
- US Fed Rate: **4.25%**
- Capital Openness: **-0.166** (restricted)
- Foreign Reserves: **$83.08B**

**Click "Simulate"**

**Expected Results:**
- Exchange Rate: ~25,186 VND/USD (stable)
- Volatility: ~5-6% (low, within the ±5% band)
- Foreign Reserves: Relatively stable
- Status: **Stable** ✅

**What This Shows:**
Vietnam's current policy maintains both **Monetary Independence** (MI) and **Exchange Rate Stability** (ERS) by restricting **Financial Integration** (KAO). The small positive rate differential attracts modest capital inflow, keeping reserves stable.

---

### 2. Interest Rate Defense Against Capital Outflow

**Scenario:** US Fed raises rates sharply, creating outflow pressure

**Setup:**
1. Change **US Fed Rate** to **6.00%** (↑ from 4.25%)
2. Keep all other parameters at baseline
3. Click "Simulate"

**Expected Results:**
- Interest Rate Differential: **-1.50%** (negative!)
- Capital Flow: **Outflow** (investors prefer USD)
- Exchange Rate: **Depreciates** to ~25,900+ VND/USD
- Foreign Reserves: **Depletion** 
- Status: **Warning** ⚠️ or **Crisis** 🚨

**Policy Implications:**
The State Bank of Vietnam faces three choices:
1. **Raise Vietnam Rate** to match/exceed US rate → Maintains MI but may hurt domestic economy
2. **Defend the peg** using reserves → Depletes reserves, unsustainable
3. **Allow depreciation** → Loses ERS goal

**AI Explanation Will Show:**
- Why arbitrage incentivizes capital outflow
- Impact on importers/exporters
- How this illustrates the Impossible Trinity

---

### 3. Capital Account Liberalization Experiment

**Scenario:** Vietnam opens capital account (hypothetical policy change)

**Setup:**
1. Keep Vietnam Rate at **4.50%**
2. Keep US Fed Rate at **4.25%**
3. Change **Capital Openness** to **+1.0** (↑ from -0.166)
4. Click "Simulate"

**Expected Results:**
- Capital Flow: **Large Inflow** (positive rate differential + open capital)
- Exchange Rate: **Strong Appreciation** to ~24,500 VND/USD
- Volatility: **High** (~12-15%)
- Foreign Reserves: **Accumulation** (from intervention to slow appreciation)
- Status: **Warning** ⚠️ (high volatility)

**What This Shows:**
Opening the capital account amplifies both positive and negative effects:
- **Benefit:** Capital inflow when rates are attractive
- **Risk:** Extreme volatility, potential for sudden reversals
- **Trade-off:** Gained KAO, but lost ERS (stability)

---

### 4. Reserve Crisis Simulation

**Scenario:** Foreign reserves critically low

**Setup:**
1. Set **Foreign Reserves** to **$25B** (↓ from 83.08B)
2. Set **Capital Openness** to **0.5** (more open)
3. Set **US Fed Rate** to **5.5%** (higher than Vietnam)
4. Click "Simulate"

**Expected Results:**
- Capital Flow: **Massive Outflow**
- Exchange Rate: **Severe Depreciation** to 26,000+ VND/USD
- Foreign Reserves: **Near zero** after intervention
- Volatility: **Extremely High** (>15%)
- Status: **CRISIS** 🚨

**Real-World Context:**
This resembles the 1997 Asian Financial Crisis scenario:
- Low reserves + open capital + rate differential = crisis
- Central bank cannot defend currency
- May require IMF intervention, capital controls, or float

**AI Explanation Will Discuss:**
- Historical parallels (Thailand 1997, Argentina 2001)
- Emergency policy measures
- Long-term recovery strategies

---

### 5. Optimal Policy Mix (Balanced Approach)

**Scenario:** Finding a sustainable equilibrium

**Setup:**
1. Vietnam Rate: **5.50%** (moderate hike)
2. US Fed Rate: **4.25%**
3. Capital Openness: **-0.05** (slightly relaxed from -0.166)
4. Foreign Reserves: **$90B** (stronger buffer)
5. Click "Simulate"

**Expected Results:**
- Interest Rate Differential: **+1.25%** (attractive but not extreme)
- Capital Flow: **Moderate Inflow**
- Exchange Rate: **Slight Appreciation** to ~25,000 VND/USD
- Volatility: **Moderate** (~7-8%)
- Foreign Reserves: **Building**
- Status: **Stable** ✅ or **Warning** (mild)

**What This Shows:**
With careful parameter tuning:
- Can achieve partial KAO (gradual liberalization)
- Maintain reasonable ERS (moderate volatility)
- Preserve MI (independent rate setting)
- Build reserve buffer for future shocks

---

## 🎓 Classroom Discussion Questions

### After Running Scenario 1 (Baseline):
**Q1:** Why does Vietnam restrict capital flows (KAOPEN = -0.166)?  
**A:** To maintain control over monetary policy and exchange rate stability

**Q2:** What happens to the exchange rate if capital suddenly flows out?  
**A:** VND depreciates (higher VND/USD number)

### After Running Scenario 2 (Rate Defense):
**Q3:** If the US Fed raises rates, why do investors prefer USD?  
**A:** Higher returns in USD (interest rate arbitrage)

**Q4:** Can Vietnam maintain both MI and ERS if capital is free to flow?  
**A:** No! This is the Impossible Trinity

### After Running Scenario 3 (Liberalization):
**Q5:** What are the benefits of capital openness?  
**A:** Access to foreign investment, financial market development

**Q6:** What are the risks?  
**A:** Volatility, hot money flows, vulnerability to global shocks

---

## 🔬 Advanced Experiments

### Experiment A: Gradual Liberalization Path
**Test the impact of slowly opening capital account:**
1. Run baseline (KAOPEN = -0.166)
2. Run with KAOPEN = 0 (neutral)
3. Run with KAOPEN = +0.5 (semi-open)
4. Run with KAOPEN = +2.0 (fully open)

**Observe:** How volatility increases with each step

---

### Experiment B: Interest Rate Corridor
**Find the "safe" rate differential range:**
1. Test rate differentials from -3% to +3%
2. Identify at what point status turns from Stable → Warning → Crisis
3. Discuss: What is the maximum sustainable differential?

---

### Experiment C: Reserve Adequacy
**Determine minimum safe reserve level:**
1. Start with $150B reserves
2. Decrease by $20B increments
3. Find the threshold where Crisis occurs
4. Compare to IMF reserve adequacy metrics (3-6 months of imports)

---

## 📊 Interpreting Results

### Exchange Rate Movements

| Result | Meaning | Impact on Vietnam |
|--------|---------|-------------------|
| VND/USD **decreases** (e.g., 25,186 → 24,500) | VND **appreciates** | ✅ Imports cheaper<br>❌ Exports more expensive<br>❌ Tourism less competitive |
| VND/USD **increases** (e.g., 25,186 → 26,500) | VND **depreciates** | ❌ Imports more expensive<br>✅ Exports cheaper<br>✅ Tourism more competitive |

### Capital Flow Implications

| Flow Direction | Drivers | Short-term Effect | Long-term Risk |
|----------------|---------|-------------------|----------------|
| **Inflow** (+) | Higher VN rates, optimism | Currency appreciation, reserve build | Asset bubbles, overvaluation |
| **Outflow** (-) | Lower VN rates, pessimism | Currency depreciation, reserve drain | Crisis if reserves depleted |

### Volatility Thresholds

- **< 8%**: Stable, manageable
- **8-12%**: Moderate, requires monitoring
- **12-15%**: High, concerning
- **> 15%**: Crisis level, intervention needed

---

## 🌍 Real-World Parallels

### Case Study 1: China
- **Policy Choice:** MI + ERS (like Vietnam)
- **Trade-off:** Strict capital controls (KAO restricted)
- **Challenge:** Pressure from international community to liberalize

### Case Study 2: Singapore
- **Policy Choice:** KAO + ERS
- **Trade-off:** No independent monetary policy (follows US Fed closely)
- **Success Factor:** Strong institutions, large reserves

### Case Study 3: Brazil
- **Policy Choice:** MI + KAO
- **Trade-off:** Floating exchange rate (ERS sacrificed)
- **Result:** High volatility but policy independence

---

## 💡 Tips for Best Learning Experience

1. **Start Simple:** Begin with baseline, change ONE parameter at a time
2. **Use AI Explanations:** Generate explanations for each scenario to deepen understanding
3. **Compare Scenarios:** Run multiple simulations and compare side-by-side
4. **Read the Numbers:** Pay attention to percentages and absolute values
5. **Think Long-term:** Consider sustainability, not just immediate effects
6. **Ask "What If?":** Experiment freely - it's a simulation!

---

## 🎯 Learning Objectives

After using this simulation, you should understand:

✅ The Impossible Trinity (Trilemma) constraint  
✅ Interest rate arbitrage and capital flows  
✅ Exchange rate determination mechanisms  
✅ Central bank policy tools (rates, intervention, controls)  
✅ Trade-offs between policy objectives  
✅ Vietnam's specific macroeconomic challenges  
✅ Historical financial crises (1997 Asia, 2008 Global)  

---

**Happy Simulating!** 🚀  
**Chúc bạn mô phỏng vui vẻ!** 🇻🇳


