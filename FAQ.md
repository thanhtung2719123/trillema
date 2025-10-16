# Frequently Asked Questions (FAQ)
## Câu Hỏi Thường Gặp

---

## 🔑 API & Setup Questions

### Q1: Do I need a Gemini API key to use the app?
**A:** No! The simulation works perfectly without an API key. The API key is only needed for the **AI-powered explanations** feature. All core simulation functionality (exchange rate calculations, visualizations, results) works without it.

### Q2: How do I get a Gemini API key?
**A:** 
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into the app
5. It's **free** with generous usage limits!

### Q3: Is my API key secure?
**A:** Yes! Your API key is:
- Stored only in your browser's memory (not on any server)
- Never logged or saved permanently
- Only sent to Google's Gemini API (encrypted HTTPS)
- Cleared when you refresh the page or close the browser

### Q4: Can I use this app offline?
**A:** Partially:
- ✅ The simulation engine works offline
- ✅ All calculations are client-side
- ❌ AI explanations require internet (Gemini API)

---

## 📊 Simulation Questions

### Q5: What does "Impossible Trinity" mean?
**A:** The Impossible Trinity (also called the Trilemma) states that a country cannot simultaneously have:
1. **Monetary Independence** (set own interest rates)
2. **Exchange Rate Stability** (fixed/stable currency)
3. **Financial Integration** (free capital flows)

You can only pick **2 out of 3**. The simulation shows what happens when you try to balance all three.

### Q6: Why is the KAOPEN index negative?
**A:** The Chinn-Ito KAOPEN index ranges from about -2 (very restricted) to +2 (very open):
- **Negative values** = Capital controls, restrictions on foreign investment
- **Positive values** = Open capital account, free flows
- Vietnam's **-0.166** indicates **restricted** capital flows (controls in place)

### Q7: What does "VND depreciation" mean for me?
**A:** 
- **If you're traveling abroad:** Your VND buys less foreign currency (travel is more expensive)
- **If you're exporting goods:** Your products become cheaper for foreigners (good for business!)
- **If you're importing:** Foreign goods become more expensive
- **If you have USD savings:** Your wealth increases in VND terms

### Q8: Why do capital flows matter?
**A:** Capital flows (money moving in/out of Vietnam) affect:
- **Exchange rate**: Inflows → VND strengthens, Outflows → VND weakens
- **Interest rates**: SBV may adjust rates to control flows
- **Economic stability**: Sudden outflows can trigger crises
- **Investment**: Openness attracts foreign investment

---

## 🎓 Educational Questions

### Q9: Is this simulation accurate for real policy decisions?
**A:** **No!** This is an **educational simplification**. Real-world factors not included:
- Inflation expectations
- Trade balances
- Political stability
- Commodity prices
- Global risk sentiment
- Banking sector health
- Fiscal policy
- Structural reforms

**Use it to learn concepts, not to make actual investment decisions.**

### Q10: What economic level is this suitable for?
**A:** 
- ✅ **Undergraduate Economics** (Macro, International Finance)
- ✅ **High School (Advanced)** with teacher guidance
- ✅ **General Public** interested in economics
- ✅ **Policymakers** for intuition building
- ❌ PhD research (too simplified)
- ❌ Trading/investment decisions

### Q11: Why does Vietnam restrict capital flows?
**A:** Vietnam restricts capital (KAOPEN = -0.166) to:
1. **Prevent currency volatility** (maintain export competitiveness)
2. **Keep monetary independence** (set rates based on domestic needs, not US Fed)
3. **Avoid hot money** (speculative flows that suddenly reverse)
4. **Protect from crises** (learned from 1997 Asian Financial Crisis)

This is a policy choice to prioritize **MI + ERS** over **KAO**.

---

## 🛠️ Technical Questions

### Q12: Why are some packages showing deprecation warnings during install?
**A:** These warnings come from `react-scripts` (Create React App) dependencies. They are:
- Normal and expected
- Not affecting app functionality
- Addressed in future React/CRA updates
- Safe to ignore for this project

### Q13: Can I customize the simulation parameters?
**A:** Yes! Advanced users can edit:
- `src/config/economicData.js` - Change baseline data
- `src/utils/simulationEngine.js` - Modify calculation formulas
- `src/components/ControlPanel.js` - Add new parameter sliders

### Q14: How are exchange rates calculated in the simulation?
**A:** The simplified formula:
1. **Interest Rate Differential** = Vietnam Rate - US Rate
2. **Capital Flow Pressure** = Differential × Capital Openness × 10
3. **Exchange Rate Change** = -Flow × 50 (inflow appreciates VND)
4. **New Rate** = 25,186 + Change

This is based on Uncovered Interest Parity (UIP) theory.

### Q15: What determines if the status is "Crisis" vs "Warning"?
**A:** 
- **Stable**: Volatility < 10%, Reserves > $50B, Rate differential < 2%
- **Warning**: Volatility 10-15%, Reserves $20-50B, OR rate differential 2-3%
- **Crisis**: Volatility > 15%, Reserves < $20B, OR rate differential > 3%

These thresholds are adjustable in `src/utils/simulationEngine.js`.

---

## 🌐 Usage Questions

### Q16: Can I switch between Vietnamese and English?
**A:** Yes! Click the language toggle button (🌐) in the top-right corner. The entire interface, including AI explanations, will switch languages.

### Q17: Why is the AI explanation in English when I selected Vietnamese?
**A:** Possible causes:
1. Gemini API might occasionally default to English
2. Try generating the explanation again
3. The AI is instructed to use Vietnamese, but may need a second attempt

### Q18: How long does it take to generate an explanation?
**A:** Typically **3-10 seconds**, depending on:
- Your internet speed
- Gemini API server load
- Complexity of the scenario

---

## 🔬 Advanced Questions

### Q19: How does this relate to the Mundell-Fleming model?
**A:** The Impossible Trinity is the core constraint of the Mundell-Fleming model:
- **IS-LM-BP framework** analyzes open economy macroeconomics
- **Mundell-Fleming** extends this with capital mobility
- **Impossible Trinity** is the policy implication

This simulation focuses specifically on the Trinity constraint.

### Q20: What's the difference between KAOPEN and actual capital flows?
**A:**
- **KAOPEN** = *De jure* (legal) capital openness (rules/laws)
- **Actual Flows** = *De facto* (real) capital movements (market reality)

Example: Vietnam has restricted KAOPEN (-0.166) but still experiences significant actual flows through various channels.

### Q21: Can this model predict actual VND/USD movements?
**A:** **No!** Real exchange rates depend on:
- Trade balances (exports vs imports)
- FDI (Samsung, Apple factories in Vietnam)
- Remittances (overseas Vietnamese sending money home)
- Central bank intervention
- Market sentiment
- Political events

This simulation isolates **only** the monetary policy trilemma.

---

## 🐛 Troubleshooting

### Q22: The simulation results seem extreme/unrealistic
**A:** This is expected! The model is **highly simplified** and **amplifies effects** for educational clarity. Real-world interventions (e.g., SBV buying/selling USD) smooth out these extremes.

### Q23: I changed a parameter but nothing happened
**A:** Make sure to click the **"MÔ PHỎNG"** (Simulate) button after changing parameters. The results don't update automatically.

### Q24: The app is slow or laggy
**A:** 
- AI explanations require internet and may take a few seconds
- The simulation itself is instant
- Try closing other browser tabs
- Check your internet connection

### Q25: Can I save/export my simulation results?
**A:** Not currently, but you can:
- Take screenshots
- Copy the AI explanation text
- Record parameters manually
- *Future feature:* Export to PDF/CSV

---

## 📚 Learning Resources

### Q26: Where can I learn more about the Impossible Trinity?
**Recommended Resources:**
- **Books:**
  - *International Economics* by Krugman & Obstfeld
  - *Foundations of International Macroeconomics* by Obstfeld & Rogoff
- **Online:**
  - IMF Working Papers on Capital Controls
  - Federal Reserve Economic Education (FRED)
  - Vietnam's State Bank (SBV) publications
- **Videos:**
  - Khan Academy - International Finance
  - Marginal Revolution University - Macro

### Q27: Where is the Vietnam economic data from?
**Sources:**
- **State Bank of Vietnam (SBV):** Policy rates, exchange rates
- **U.S. Federal Reserve:** Fed funds rate
- **IMF/World Bank:** Foreign reserves data
- **Chinn-Ito Index (Academic):** KAOPEN index
- **Market News:** Recent capital flow data (2025)

All data is cited in `README.md`.

---

## 🚀 Future Features

### Q28: Will there be more features added?
**Potential additions:**
- 📈 Time-series simulation (show changes over months/years)
- 📊 Advanced charts (Recharts integration)
- 💾 Export results to PDF/CSV
- 🔄 Compare multiple scenarios side-by-side
- 📉 Historical data replay (1997 crisis, 2008 crisis)
- 🌏 Other countries (Thailand, Indonesia, China)

**Want to contribute?** This is open-source - PRs welcome!

### Q29: Can I suggest improvements?
**A:** Absolutely! This is an educational tool meant to evolve. Suggestions welcome for:
- Additional economic indicators
- Better visualizations
- More example scenarios
- Improved AI prompts
- UI/UX enhancements

---

## 🤝 Contributing

### Q30: Can I use this for my class/research?
**A:** Yes! This project is open-source (MIT License). You can:
- ✅ Use in classroom teaching
- ✅ Modify for your needs
- ✅ Cite in academic work
- ✅ Share with students
- ✅ Fork and improve

**Just provide attribution and don't use for actual financial advice.**

---

## Contact & Support

**For technical issues:**
- Check this FAQ first
- Review the `README.md` and `QUICK_START.md`
- Examine the code (it's all commented!)

**For economic questions:**
- Use the AI explanation feature
- Consult academic resources (see Q26)
- Discuss with economics teachers/professors

---

**Last Updated:** October 2025  
**Version:** 1.0.0

**Happy Learning! / Học vui vẻ!** 🎓📊

