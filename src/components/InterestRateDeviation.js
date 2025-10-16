import React from 'react';
import './InterestRateDeviation.css';

/**
 * Chart hiển thị deviation giữa lãi suất VN và Fed
 * Quan trọng cho Hard Peg scenarios - phải theo sát Fed
 */
const InterestRateDeviation = ({ timeline, currentDay, language }) => {
  if (!timeline || timeline.length === 0) return null;

  const displayData = timeline.slice(0, currentDay + 1);
  const latestData = displayData[displayData.length - 1];
  
  const chartWidth = 600;
  const chartHeight = 120;

  // Tính deviation = VN rate - US rate
  const getDeviationPath = () => {
    if (displayData.length < 2) return '';
    
    const deviations = displayData.map(d => d.rateDeviation || 0);
    const maxDeviation = Math.max(...deviations.map(Math.abs), 2);

    const points = displayData.map((d, i) => {
      const x = (i / (timeline.length - 1)) * chartWidth;
      const deviation = d.rateDeviation || 0;
      const y = chartHeight / 2 - (deviation / maxDeviation) * (chartHeight / 2 - 10);
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  // Get actual current deviation from data
  const currentDeviation = latestData.rateDeviation || 0;
  const vnRate = latestData.vietnamRate || 4.5;
  const usRate = latestData.usRate || 4.25;
  const isHardPeg = Math.abs(currentDeviation) < 0.1;
  const isFloating = Math.abs(currentDeviation) > 1.5;

  return (
    <div className="interest-deviation">
      <h3 className="deviation-title">
        {language === 'vi' ? '📊 Độ Lệch Lãi Suất vs Fed' : '📊 Interest Rate Deviation vs Fed'}
      </h3>

      <div className="deviation-info">
        <div className="info-card">
          <span className="label">{language === 'vi' ? 'Lãi suất VN:' : 'VN Rate:'}</span>
          <span className="value">{vnRate.toFixed(2)}%</span>
        </div>

        <div className="info-card">
          <span className="label">{language === 'vi' ? 'Lãi suất Fed:' : 'Fed Rate:'}</span>
          <span className="value">{usRate.toFixed(2)}%</span>
        </div>

        <div className="info-card">
          <span className="label">{language === 'vi' ? 'Độ lệch:' : 'Deviation:'}</span>
          <span className={`value ${isHardPeg ? 'success' : isFloating ? 'warning' : ''}`}>
            {currentDeviation > 0 ? '+' : ''}{currentDeviation.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="regime-info">
        <div className="regime-card">
          <span className="regime-label">{language === 'vi' ? 'Chế độ:' : 'Regime:'}</span>
          <span className={`badge ${isHardPeg ? 'hard-peg' : isFloating ? 'floating' : 'managed'}`}>
            {isHardPeg && (language === 'vi' ? '🔒 Hard Peg' : '🔒 Hard Peg')}
            {isFloating && (language === 'vi' ? '🌊 Float Tự Do' : '🌊 Free Float')}
            {!isHardPeg && !isFloating && (language === 'vi' ? '⚖️ Managed Float' : '⚖️ Managed Float')}
          </span>
        </div>

        <div className="regime-card">
          <span className="regime-label">{language === 'vi' ? 'Độc lập tiền tệ:' : 'Monetary independence:'}</span>
          <span className={`status ${isHardPeg ? 'lost' : 'maintained'}`}>
            {isHardPeg ? (
              <>{language === 'vi' ? '❌ Mất' : '❌ Lost'}</>
            ) : (
              <>{language === 'vi' ? '✓ Còn' : '✓ Maintained'}</>
            )}
          </span>
        </div>
      </div>

      <div className="chart-wrapper">
        <svg className="deviation-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* Background zones */}
          {/* Hard peg zone (±0.1%) */}
          <rect 
            x="0" 
            y={chartHeight / 2 - 5} 
            width={chartWidth} 
            height="10" 
            fill="rgba(16, 185, 129, 0.1)"
          />
          
          {/* Zero line */}
          <line 
            x1="0" 
            y1={chartHeight / 2} 
            x2={chartWidth} 
            y2={chartHeight / 2} 
            stroke="rgba(251, 191, 36, 0.5)" 
            strokeWidth="2"
            strokeDasharray="8,4"
          />

          {/* Grid lines */}
          <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
          <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />

          {/* Labels */}
          <text x="5" y="15" fill="rgba(255,255,255,0.5)" fontSize="10">
            {language === 'vi' ? '+2%' : '+2%'}
          </text>
          <text x="5" y={chartHeight / 2 + 5} fill="#fbbf24" fontSize="11" fontWeight="700">
            {language === 'vi' ? 'Fed' : 'Fed'}
          </text>
          <text x="5" y={chartHeight - 5} fill="rgba(255,255,255,0.5)" fontSize="10">
            {language === 'vi' ? '-2%' : '-2%'}
          </text>

          {/* Deviation line */}
          {displayData.length > 1 && (
            <>
              {/* Area fill */}
              <polygon
                points={`0,${chartHeight / 2} ${getDeviationPath()} ${chartWidth},${chartHeight / 2}`}
                fill={currentDeviation >= 0 ? 'url(#positiveGradient)' : 'url(#negativeGradient)'}
                opacity="0.3"
              />

              {/* Line */}
              <polyline
                points={getDeviationPath()}
                fill="none"
                stroke={isHardPeg ? '#10b981' : isFloating ? '#f59e0b' : '#667eea'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradients */}
              <defs>
                <linearGradient id="positiveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="negativeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </>
          )}

          {/* Current point */}
          {displayData.length > 0 && (
            <circle
              cx={(currentDay / (timeline.length - 1)) * chartWidth}
              cy={chartHeight / 2 - (currentDeviation / Math.max(...displayData.map(d => Math.abs(d.capitalFlow / 10)), 2)) * (chartHeight / 2 - 10)}
              r="5"
              fill={isHardPeg ? '#10b981' : isFloating ? '#f59e0b' : '#667eea'}
              className="pulse-dot"
            />
          )}
        </svg>
      </div>

      {/* Explanation */}
      <div className="deviation-explanation">
        {isHardPeg && (
          <div className="explain-box hard-peg">
            <strong>🔒 Hard Peg:</strong>{' '}
            {language === 'vi'
              ? 'Lãi suất VN phải bằng Fed. Mất độc lập tiền tệ để giữ tỷ giá cố định.'
              : 'VN rate must match Fed. Loss of monetary independence to maintain fixed exchange rate.'}
          </div>
        )}
        {isFloating && (
          <div className="explain-box floating">
            <strong>🌊 Free Float:</strong>{' '}
            {language === 'vi'
              ? 'VN độc lập đặt lãi suất khác Fed. Tỷ giá biến động mạnh theo thị trường.'
              : 'VN independently sets rates different from Fed. Exchange rate fluctuates freely with market.'}
          </div>
        )}
        {!isHardPeg && !isFloating && (
          <div className="explain-box managed">
            <strong>⚖️ Managed Float:</strong>{' '}
            {language === 'vi'
              ? 'VN có một chút độc lập lãi suất nhưng phải cẩn thận để không gây capital flight.'
              : 'VN has some interest rate independence but must be careful not to trigger capital flight.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestRateDeviation;

