import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './ExchangeRateDashboard.css';

/**
 * Dashboard showing animated exchange rate changes from baseline
 */
const ExchangeRateDashboard = ({ baseline, current, reserves, volatility, language }) => {
  const [animatedRate, setAnimatedRate] = useState(baseline);
  const [animatedReserves, setAnimatedReserves] = useState(reserves);
  const [history, setHistory] = useState([baseline]);

  // Animate the exchange rate change
  useEffect(() => {
    if (current === baseline) {
      setAnimatedRate(baseline);
      setHistory([baseline]);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = (current - animatedRate) / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimatedRate(prev => {
        const newValue = prev + increment;
        return step >= steps ? current : newValue;
      });

      if (step >= steps) {
        clearInterval(interval);
        // Add to history
        setHistory(prev => {
          const newHistory = [...prev, current];
          return newHistory.slice(-10); // Keep last 10 points
        });
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [current, baseline]);

  // Animate reserves
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepTime = duration / steps;
    const increment = (reserves - animatedReserves) / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnimatedReserves(prev => {
        const newValue = prev + increment;
        return step >= steps ? reserves : newValue;
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [reserves]);

  const change = current - baseline;
  const changePercent = ((change / baseline) * 100);
  const isAppreciation = change < 0; // Lower VND/USD = appreciation
  const isDepreciation = change > 0;
  const isStable = Math.abs(changePercent) < 0.5;

  const getTrendIcon = () => {
    if (isAppreciation) return <TrendingDown className="trend-icon appreciation" />;
    if (isDepreciation) return <TrendingUp className="trend-icon depreciation" />;
    return <Minus className="trend-icon stable" />;
  };

  const getTrendText = () => {
    if (language === 'vi') {
      if (isAppreciation) return 'VND Tăng Giá';
      if (isDepreciation) return 'VND Mất Giá';
      return 'Ổn Định';
    } else {
      if (isAppreciation) return 'VND Appreciation';
      if (isDepreciation) return 'VND Depreciation';
      return 'Stable';
    }
  };

  // Generate mini chart points
  const getChartPath = () => {
    if (history.length < 2) return '';
    
    const width = 300;
    const height = 80;
    const minRate = Math.min(...history);
    const maxRate = Math.max(...history);
    const range = maxRate - minRate || 1;

    const points = history.map((rate, i) => {
      const x = (i / (history.length - 1)) * width;
      const y = height - ((rate - minRate) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  const reserveChangePercent = ((reserves - 83.08) / 83.08) * 100;

  return (
    <div className="exchange-dashboard">
      {/* Main Rate Display */}
      <div className="dashboard-main">
        <div className="main-rate-card">
          <div className="rate-header">
            <h3>{language === 'vi' ? 'Tỷ Giá VND/USD' : 'VND/USD Exchange Rate'}</h3>
            {getTrendIcon()}
          </div>
          
          <div className="rate-display">
            <div className="rate-number">
              {animatedRate.toLocaleString('en-US', { 
                minimumFractionDigits: 0,
                maximumFractionDigits: 0 
              })}
            </div>
            <div className="rate-unit">VND</div>
          </div>

          <div className={`rate-change ${isAppreciation ? 'positive' : isDepreciation ? 'negative' : 'neutral'}`}>
            <span className="change-value">
              {change > 0 ? '+' : ''}{change.toFixed(0)} VND
            </span>
            <span className="change-percent">
              ({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>

          <div className="rate-status">
            <span className="status-badge">{getTrendText()}</span>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="mini-chart-card">
          <h4>{language === 'vi' ? 'Biến Động Tỷ Giá' : 'Rate Movement'}</h4>
          <svg className="mini-chart" viewBox="0 0 300 100" preserveAspectRatio="none">
            {/* Background grid */}
            <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            
            {/* Baseline reference */}
            {history.length > 1 && (
              <line 
                x1="0" 
                y1="50" 
                x2="300" 
                y2="50" 
                stroke="rgba(251, 191, 36, 0.3)" 
                strokeWidth="2" 
                strokeDasharray="8,4"
              />
            )}

            {/* Chart line */}
            {history.length > 1 && (
              <>
                <polyline
                  points={getChartPath()}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="chart-line"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor={isDepreciation ? '#ef4444' : '#10b981'} />
                  </linearGradient>
                </defs>

                {/* End point indicator */}
                <circle
                  cx={300}
                  cy={80 - ((animatedRate - Math.min(...history)) / (Math.max(...history) - Math.min(...history) || 1)) * 80}
                  r="5"
                  fill={isDepreciation ? '#ef4444' : '#10b981'}
                  className="chart-point"
                />
              </>
            )}
          </svg>

          <div className="chart-labels">
            <span className="chart-label">
              {language === 'vi' ? 'Gốc' : 'Baseline'}: {baseline.toFixed(0)}
            </span>
            <span className="chart-label">
              {language === 'vi' ? 'Hiện tại' : 'Current'}: {animatedRate.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="dashboard-metrics">
        <div className="metric-card reserves">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <div className="metric-label">
              {language === 'vi' ? 'Dự Trữ Ngoại Hối' : 'Foreign Reserves'}
            </div>
            <div className="metric-value">
              ${animatedReserves.toFixed(2)}B
            </div>
            <div className={`metric-change ${reserveChangePercent >= 0 ? 'positive' : 'negative'}`}>
              {reserveChangePercent >= 0 ? '↑' : '↓'} {Math.abs(reserveChangePercent).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="metric-card volatility">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-label">
              {language === 'vi' ? 'Độ Biến Động' : 'Volatility'}
            </div>
            <div className="metric-value">
              {volatility.toFixed(2)}%
            </div>
            <div className={`metric-change ${volatility > 10 ? 'negative' : 'positive'}`}>
              {volatility > 10 ? (language === 'vi' ? 'Cao' : 'High') : (language === 'vi' ? 'Thấp' : 'Low')}
            </div>
          </div>
        </div>

        <div className="metric-card spread">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-label">
              {language === 'vi' ? 'Biên Độ' : 'Range'}
            </div>
            <div className="metric-value">
              ±{(volatility * 251.86).toFixed(0)}
            </div>
            <div className="metric-subtext">
              {(baseline - volatility * 251.86).toFixed(0)} - {(baseline + volatility * 251.86).toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Gauge Indicator with Managed Float Band */}
      <div className="gauge-container">
        <h4>
          {language === 'vi' ? 'Biên Độ Tỷ Giá & Managed Float (±5%)' : 'Exchange Rate Range & Managed Float (±5%)'}
        </h4>
        <div className="managed-float-info">
          <span className="info-badge">
            {language === 'vi' 
              ? '🏦 NHNN cho phép tỷ giá dao động ±5% quanh tỷ giá trung tâm mỗi ngày'
              : '🏦 SBV allows ±5% daily fluctuation around central rate'}
          </span>
        </div>
        <div className="gauge">
          <div className="gauge-track">
            {/* Managed float band visualization */}
            <div 
              className="float-band"
              style={{ 
                left: `${Math.max(0, ((baseline * 0.95 - 24000) / 4000) * 100)}%`,
                width: `${Math.min(100, ((baseline * 1.05 - baseline * 0.95) / 4000) * 100)}%`
              }}
            >
              <div className="band-label lower">
                {language === 'vi' ? '-5%' : '-5%'} ({(baseline * 0.95).toFixed(0)})
              </div>
              <div className="band-label upper">
                {language === 'vi' ? '+5%' : '+5%'} ({(baseline * 1.05).toFixed(0)})
              </div>
            </div>
            
            <div 
              className="gauge-fill"
              style={{ 
                width: `${Math.min(100, Math.max(0, ((animatedRate - 24000) / 4000) * 100))}%`,
                backgroundColor: isDepreciation ? '#ef4444' : isAppreciation ? '#10b981' : '#667eea'
              }}
            />
            
            {/* Central rate marker */}
            <div 
              className="gauge-marker baseline"
              style={{ left: `${((baseline - 24000) / 4000) * 100}%` }}
            >
              <div className="marker-label central">
                {language === 'vi' ? 'Tỷ giá TT' : 'Central'}
              </div>
            </div>
            
            {/* Current rate marker */}
            <div 
              className="gauge-marker current"
              style={{ left: `${Math.min(100, Math.max(0, ((animatedRate - 24000) / 4000) * 100))}%` }}
            >
              <div className="marker-dot" />
            </div>
            
            {/* Warning if outside band */}
            {(animatedRate < baseline * 0.95 || animatedRate > baseline * 1.05) && (
              <div className="band-warning">
                ⚠️ {language === 'vi' ? 'Vượt biên độ cho phép!' : 'Outside allowed band!'}
              </div>
            )}
          </div>
          <div className="gauge-labels">
            <span>24,000</span>
            <span className="central-label">
              {baseline.toFixed(0)} <small>{language === 'vi' ? '(TT)' : '(Central)'}</small>
            </span>
            <span>28,000</span>
          </div>
        </div>
        
        {/* Band status */}
        <div className="band-status">
          {(animatedRate >= baseline * 0.95 && animatedRate <= baseline * 1.05) ? (
            <div className="status-ok">
              ✓ {language === 'vi' 
                ? 'Trong biên độ cho phép' 
                : 'Within allowed band'}
            </div>
          ) : (
            <div className="status-violation">
              ✗ {language === 'vi' 
                ? 'NHNN cần can thiệp để đưa tỷ giá về biên độ' 
                : 'SBV intervention required to bring rate back to band'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateDashboard;

