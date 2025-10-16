import React, { useState, useEffect, useRef } from 'react';
import { Globe, Play, Pause, RotateCcw } from 'lucide-react';
import ScenarioPresets from './components/ScenarioPresets';
import TrilemmaSelector from './components/TrilemmaSelector';
import ControlPanel from './components/ControlPanel';
import TimeSeriesCharts from './components/TimeSeriesCharts';
import InterestRateDeviation from './components/InterestRateDeviation';
import ExchangeRateDashboard from './components/ExchangeRateDashboard';
import ResultsDisplay from './components/ResultsDisplay';
import TriangleVisualization from './components/TriangleVisualization';
import AIExplanation from './components/AIExplanation';
import APIKeyInput from './components/APIKeyInput';
import { ECONOMIC_DATA, TRANSLATIONS } from './config/economicData';
import { createSimulation } from './utils/simulationEngine';
import { createTimeSeriesSimulation } from './utils/timeSeriesSimulation';
import geminiService from './services/geminiService';
import './App.css';

function App() {
  // Language state
  const [language, setLanguage] = useState('vi');

  // Trilemma goals selection (Vietnam's current stance: MI + ERS)
  const [selectedGoals, setSelectedGoals] = useState(['mi', 'ers']);

  // Simulation parameters
  const [params, setParams] = useState({
    vietnamRate: ECONOMIC_DATA.monetaryIndependence.vietnamPolicyRate,
    usRate: ECONOMIC_DATA.monetaryIndependence.usFedRate,
    capitalOpenness: ECONOMIC_DATA.financialIntegration.kaopenIndex,
    foreignReserves: ECONOMIC_DATA.exchangeRateStability.foreignReserves,
    centralRate: ECONOMIC_DATA.exchangeRateStability.centralRate,
  });

  // Tracking user changes
  const [userChanges, setUserChanges] = useState({});

  // Simulation results
  const [results, setResults] = useState(null);
  
  // Time-series simulation
  const [timeline, setTimeline] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playIntervalRef = useRef(null);

  // AI explanation state
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState('');
  const [apiKey, setApiKey] = useState(null);

  const handleParamChange = (key, value) => {
    setParams(prev => ({
      ...prev,
      [key]: value
    }));

    // Track changes from baseline
    const baseline = {
      vietnamRate: ECONOMIC_DATA.monetaryIndependence.vietnamPolicyRate,
      usRate: ECONOMIC_DATA.monetaryIndependence.usFedRate,
      capitalOpenness: ECONOMIC_DATA.financialIntegration.kaopenIndex,
      foreignReserves: ECONOMIC_DATA.exchangeRateStability.foreignReserves,
    };

    setUserChanges(prev => ({
      ...prev,
      [key]: value !== baseline[key] ? value : undefined
    }));
  };

  const handleSimulate = () => {
    // Single snapshot simulation
    const simulationResults = createSimulation(params);
    setResults(simulationResults);
    
    // Time-series simulation (30 days)
    const timelineData = createTimeSeriesSimulation(params);
    setTimeline(timelineData);
    setCurrentDay(0);
    setIsPlaying(false);
    
    // Clear previous AI explanation when new simulation is run
    setAiExplanation('');
    setAiError('');
  };

  // Auto-play time-series
  useEffect(() => {
    if (isPlaying && timeline && currentDay < timeline.length - 1) {
      playIntervalRef.current = setInterval(() => {
        setCurrentDay(prev => {
          if (prev >= timeline.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 300); // 300ms per day = 9 seconds for 30 days
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, timeline, currentDay]);

  const handlePlayPause = () => {
    if (currentDay >= timeline.length - 1) {
      // Restart from beginning
      setCurrentDay(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    setCurrentDay(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setParams({
      vietnamRate: ECONOMIC_DATA.monetaryIndependence.vietnamPolicyRate,
      usRate: ECONOMIC_DATA.monetaryIndependence.usFedRate,
      capitalOpenness: ECONOMIC_DATA.financialIntegration.kaopenIndex,
      foreignReserves: ECONOMIC_DATA.exchangeRateStability.foreignReserves,
      centralRate: ECONOMIC_DATA.exchangeRateStability.centralRate,
    });
    setSelectedGoals(['mi', 'ers']); // Reset to Vietnam's current stance
    setUserChanges({});
    setResults(null);
    setTimeline(null);
    setCurrentDay(0);
    setIsPlaying(false);
    setAiExplanation('');
    setAiError('');
  };

  // Adjust parameters based on trilemma selection (ceteris paribus)
  const handleTrilemmaChange = (newGoals) => {
    setSelectedGoals(newGoals);
    
    // Auto-adjust parameters to demonstrate the chosen scenario
    const newParams = { ...params };
    
    if (newGoals.length === 2) {
      const sacrificed = ['mi', 'ers', 'kao'].find(g => !newGoals.includes(g));
      
      // MI + ERS (Sacrifice KAO) - Vietnam's current model
      if (newGoals.includes('mi') && newGoals.includes('ers')) {
        newParams.capitalOpenness = -0.5; // Strict capital controls
        newParams.vietnamRate = 4.5;
      }
      
      // ERS + KAO (Sacrifice MI) - Hong Kong/Singapore model
      else if (newGoals.includes('ers') && newGoals.includes('kao')) {
        newParams.capitalOpenness = 1.5; // Open capital account
        newParams.vietnamRate = newParams.usRate + 0.1; // Must follow US rate closely
      }
      
      // MI + KAO (Sacrifice ERS) - US/Brazil model
      else if (newGoals.includes('mi') && newGoals.includes('kao')) {
        newParams.capitalOpenness = 1.2; // Open capital account
        newParams.vietnamRate = 6.0; // Independent high rate
        // Exchange rate will float (high volatility expected)
      }
      
      setParams(newParams);
      
      // Track this as a user change
      setUserChanges({
        trilemmaChoice: sacrificed,
        ...newParams
      });
      
      // Clear previous results to encourage re-simulation
      setResults(null);
      setAiExplanation('');
    }
  };

  // Handle scenario selection
  const handleScenarioSelect = (scenario) => {
    // Set parameters
    setParams({
      ...params,
      ...scenario.params,
      centralRate: ECONOMIC_DATA.exchangeRateStability.centralRate,
    });

    // Set goals
    setSelectedGoals(scenario.goals);

    // Track changes
    setUserChanges({
      scenario: scenario.id,
      ...scenario.params
    });

    // Clear previous results
    setResults(null);
    setAiExplanation('');
    setAiError('');

    // Scroll to control panel
    setTimeout(() => {
      const controlPanel = document.querySelector('.control-panel');
      if (controlPanel) {
        controlPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Initialize Gemini on mount với key có sẵn
  useEffect(() => {
    const { getGeminiApiKey } = require('./config/apiConfig');
    const savedKey = getGeminiApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      geminiService.initialize(savedKey);
    }
  }, []);

  const handleAPIKeySubmit = (key) => {
    if (key) {
      const { saveGeminiApiKey } = require('./config/apiConfig');
      saveGeminiApiKey(key);
      setApiKey(key);
      geminiService.initialize(key);
      setAiError('');
    } else {
      const { saveGeminiApiKey } = require('./config/apiConfig');
      saveGeminiApiKey(null);
      setApiKey(null);
      setAiError('');
    }
  };

  const handleGenerateExplanation = async () => {
    if (!results) {
      setAiError(language === 'vi' 
        ? 'Vui lòng chạy mô phỏng trước khi tạo giải thích.'
        : 'Please run a simulation first before generating an explanation.');
      return;
    }

    if (!apiKey) {
      setAiError(language === 'vi' 
        ? 'Vui lòng cấu hình Gemini API Key trước.'
        : 'Please configure your Gemini API Key first.');
      return;
    }

    setIsLoadingAI(true);
    setAiError('');
    setAiExplanation('');

    try {
      const explanation = await geminiService.generateExplanation(
        results, 
        userChanges, 
        language
      );
      setAiExplanation(explanation);
    } catch (error) {
      console.error('Error generating explanation:', error);
      setAiError(language === 'vi' 
        ? `Lỗi: ${error.message}. Vui lòng kiểm tra API Key và thử lại.`
        : `Error: ${error.message}. Please check your API Key and try again.`);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <Globe size={40} className="logo-icon" />
            <div className="title-section">
              <h1 className="app-title">{t.title}</h1>
              <p className="app-subtitle">{t.subtitle}</p>
            </div>
          </div>
          
          <button onClick={toggleLanguage} className="language-toggle">
            <Globe size={20} />
            {language === 'vi' ? 'English' : 'Tiếng Việt'}
          </button>
        </div>

        <p className="app-description">{t.description}</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* API Key Configuration */}
          <APIKeyInput 
            onSubmit={handleAPIKeySubmit} 
            language={language}
          />

          {/* Scenario Presets */}
          <ScenarioPresets
            onSelectScenario={handleScenarioSelect}
            language={language}
          />

          {/* Trilemma Selector */}
          <TrilemmaSelector
            selectedGoals={selectedGoals}
            onChange={handleTrilemmaChange}
            language={language}
          />

          {/* Control Panel */}
          <ControlPanel
            values={params}
            onChange={handleParamChange}
            onSimulate={handleSimulate}
            onReset={handleReset}
            language={language}
            translations={TRANSLATIONS}
          />

          {/* Results Section */}
          {results && (
            <>
              {/* Time-Series Charts with Controls */}
              {timeline && (
                <div className="timeseries-container">
                  <div className="playback-controls">
                    <button 
                      className="control-btn"
                      onClick={handleRewind}
                      disabled={currentDay === 0}
                    >
                      <RotateCcw size={20} />
                      {language === 'vi' ? 'Đặt lại' : 'Rewind'}
                    </button>
                    <button 
                      className="control-btn primary"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      {isPlaying 
                        ? (language === 'vi' ? 'Tạm dừng' : 'Pause')
                        : (language === 'vi' ? 'Phát' : 'Play')}
                    </button>
                    <div className="speed-info">
                      {language === 'vi' ? '1 ngày ≈ 0.3s' : '1 day ≈ 0.3s'}
                    </div>
                  </div>
                  
                  <TimeSeriesCharts
                    timeline={timeline}
                    baseline={ECONOMIC_DATA.exchangeRateStability.centralRate}
                    language={language}
                    isPlaying={isPlaying}
                    currentDay={currentDay}
                  />

                  {/* Interest Rate Deviation Chart */}
                  <InterestRateDeviation
                    timeline={timeline}
                    currentDay={currentDay}
                    language={language}
                  />
                </div>
              )}

              {/* Exchange Rate Dashboard - Shows current day data */}
              <ExchangeRateDashboard
                baseline={ECONOMIC_DATA.exchangeRateStability.centralRate}
                current={timeline ? timeline[currentDay].exchangeRate : results.outputs.exchangeRate.newRate}
                reserves={timeline ? timeline[currentDay].reserves : results.outputs.reserves.newReserves}
                volatility={timeline ? timeline[currentDay].volatility : results.outputs.volatility}
                language={language}
              />

              {/* Triangle Visualization */}
              <div className="visualization-card">
                <TriangleVisualization
                  violatedConstraint={results.outputs.constraint.mostViolated}
                  severity={results.outputs.constraint.severity}
                  language={language}
                />
              </div>

              {/* Results Display */}
              <ResultsDisplay
                results={results}
                language={language}
                translations={TRANSLATIONS}
              />

              {/* AI Explanation */}
              <AIExplanation
                onGenerate={handleGenerateExplanation}
                language={language}
                translations={TRANSLATIONS}
                isLoading={isLoadingAI}
                explanation={aiExplanation}
                error={aiError}
              />
            </>
          )}

          {/* Initial State Message */}
          {!results && (
            <div className="initial-message">
              <div className="initial-icon">📊</div>
              <h3>{language === 'vi' ? 'Sẵn sàng mô phỏng' : 'Ready to Simulate'}</h3>
              <p>
                {language === 'vi' 
                  ? 'Điều chỉnh các tham số phía trên và nhấn "Mô Phỏng" để xem tác động lên nền kinh tế Việt Nam.'
                  : 'Adjust the parameters above and click "Simulate" to see the impact on Vietnam\'s economy.'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          {language === 'vi' 
            ? 'Dữ liệu dựa trên số liệu thực tế của Việt Nam (2023-2025) | Powered by Gemini AI'
            : 'Based on real Vietnam data (2023-2025) | Powered by Gemini AI'}
        </p>
        <p className="footer-disclaimer">
          {language === 'vi'
            ? 'Công cụ giáo dục - Không phải lời khuyên tài chính'
            : 'Educational Tool - Not Financial Advice'}
        </p>
      </footer>
    </div>
  );
}

export default App;

