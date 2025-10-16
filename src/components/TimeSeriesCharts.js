import React, { useState, useEffect } from 'react';
import './TimeSeriesCharts.css';

/**
 * Time-series charts hiển thị dữ liệu theo thời gian
 */
const TimeSeriesCharts = ({ timeline, baseline, language, isPlaying, currentDay }) => {
  if (!timeline || timeline.length === 0) return null;

  const displayData = timeline.slice(0, currentDay + 1);
  const latestData = displayData[displayData.length - 1];

  // Chart dimensions
  const chartWidth = 600;
  const chartHeight = 150;

  // Generate path for exchange rate chart
  const getRatePath = () => {
    if (displayData.length < 2) return '';
    
    const rates = displayData.map(d => d.exchangeRate);
    const minRate = Math.min(...rates, baseline * 0.95);
    const maxRate = Math.max(...rates, baseline * 1.05);
    const range = maxRate - minRate || 1;

    const points = displayData.map((d, i) => {
      const x = (i / (timeline.length - 1)) * chartWidth;
      const y = chartHeight - ((d.exchangeRate - minRate) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  // Generate path for reserves chart
  const getReservesPath = () => {
    if (displayData.length < 2) return '';
    
    const reserves = displayData.map(d => d.reserves);
    const minReserve = Math.min(...reserves, 0);
    const maxReserve = Math.max(...reserves);
    const range = maxReserve - minReserve || 1;

    const points = displayData.map((d, i) => {
      const x = (i / (timeline.length - 1)) * chartWidth;
      const y = chartHeight - ((d.reserves - minReserve) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  // Generate path for volatility chart
  const getVolatilityPath = () => {
    if (displayData.length < 2) return '';
    
    const volatilities = displayData.map(d => d.volatility);
    const maxVol = Math.max(...volatilities, 20);

    const points = displayData.map((d, i) => {
      const x = (i / (timeline.length - 1)) * chartWidth;
      const y = chartHeight - (d.volatility / maxVol) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  // Generate area for capital flow
  const getCapitalFlowBars = () => {
    return displayData.map((d, i) => {
      const x = (i / (timeline.length - 1)) * chartWidth;
      const flowHeight = Math.abs(d.capitalFlow) * 3;
      const isOutflow = d.capitalFlow < 0;
      
      return (
        <rect
          key={i}
          x={x - 2}
          y={isOutflow ? chartHeight / 2 : chartHeight / 2 - flowHeight}
          width={4}
          height={flowHeight}
          fill={isOutflow ? '#ef4444' : '#10b981'}
          opacity={0.6}
        />
      );
    });
  };

  // Baseline reference line (for exchange rate)
  const baselineY = chartHeight - ((baseline - Math.min(...displayData.map(d => d.exchangeRate), baseline * 0.95)) / 
    (Math.max(...displayData.map(d => d.exchangeRate), baseline * 1.05) - Math.min(...displayData.map(d => d.exchangeRate), baseline * 0.95) || 1)) * chartHeight;

  return (
    <div className="timeseries-charts">
      <div className="charts-header">
        <h3>
          {language === 'vi' ? '📈 Diễn Biến Theo Thời Gian' : '📈 Time Series Evolution'}
        </h3>
        <div className="timeline-indicator">
          <span className="day-label">
            {language === 'vi' ? 'Ngày' : 'Day'} {currentDay} / {timeline.length - 1}
          </span>
          <div className="timeline-progress">
            <div 
              className="progress-bar"
              style={{ width: `${(currentDay / (timeline.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Exchange Rate Chart */}
        <div className="chart-container">
          <h4 className="chart-title">
            {language === 'vi' ? 'Tỷ Giá VND/USD' : 'Exchange Rate VND/USD'}
            <span className={`value ${latestData.isOutsideBand ? 'danger' : ''}`}>
              {latestData.exchangeRate.toFixed(0)}
            </span>
          </h4>
          <svg className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            
            {/* Baseline reference */}
            <line 
              x1="0" 
              y1={baselineY} 
              x2={chartWidth} 
              y2={baselineY} 
              stroke="#fbbf24" 
              strokeWidth="2" 
              strokeDasharray="8,4"
              opacity="0.5"
            />
            
            {/* Exchange rate line */}
            {displayData.length > 1 && (
              <polyline
                points={getRatePath()}
                fill="none"
                stroke={latestData.isOutsideBand ? '#ef4444' : '#10b981'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* Current point */}
            {displayData.length > 0 && (
              <circle
                cx={(currentDay / (timeline.length - 1)) * chartWidth}
                cy={chartHeight - ((latestData.exchangeRate - Math.min(...displayData.map(d => d.exchangeRate), baseline * 0.95)) / 
                  (Math.max(...displayData.map(d => d.exchangeRate), baseline * 1.05) - Math.min(...displayData.map(d => d.exchangeRate), baseline * 0.95) || 1)) * chartHeight}
                r="5"
                fill={latestData.isOutsideBand ? '#ef4444' : '#10b981'}
                className="pulse-point"
              />
            )}
          </svg>
          <div className="chart-status">
            {latestData.exchangeRate > baseline * 1.15 ? (
              <span className="status-danger">
                ⚠️ {language === 'vi' ? 'Mất giá mạnh!' : 'Sharp depreciation!'}
              </span>
            ) : latestData.exchangeRate < baseline * 0.85 ? (
              <span className="status-danger">
                ⚠️ {language === 'vi' ? 'Tăng giá quá mức!' : 'Excessive appreciation!'}
              </span>
            ) : (
              <span className="status-ok">
                ✓ {language === 'vi' ? 'Biến động hợp lý' : 'Normal fluctuation'}
              </span>
            )}
          </div>
        </div>

        {/* Reserves Chart */}
        <div className="chart-container">
          <h4 className="chart-title">
            {language === 'vi' ? 'Dự Trữ Ngoại Hối' : 'Foreign Reserves'}
            <span className={`value ${latestData.reserves < 30 ? 'danger' : ''}`}>
              ${latestData.reserves.toFixed(1)}B
            </span>
          </h4>
          <svg className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            
            {/* Critical level (30B) */}
            <line 
              x1="0" 
              y1={chartHeight * 0.7} 
              x2={chartWidth} 
              y2={chartHeight * 0.7} 
              stroke="#ef4444" 
              strokeWidth="2" 
              strokeDasharray="4,4"
              opacity="0.5"
            />
            
            {/* Reserves area fill */}
            {displayData.length > 1 && (
              <polygon
                points={`0,${chartHeight} ${getReservesPath()} ${chartWidth},${chartHeight}`}
                fill="url(#reservesGradient)"
                opacity="0.3"
              />
            )}
            
            {/* Reserves line */}
            {displayData.length > 1 && (
              <polyline
                points={getReservesPath()}
                fill="none"
                stroke={latestData.reserves < 30 ? '#ef4444' : '#3b82f6'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="reservesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Current point */}
            {displayData.length > 0 && (
              <circle
                cx={(currentDay / (timeline.length - 1)) * chartWidth}
                cy={chartHeight - ((latestData.reserves - Math.min(...displayData.map(d => d.reserves), 0)) / 
                  (Math.max(...displayData.map(d => d.reserves)) - Math.min(...displayData.map(d => d.reserves), 0) || 1)) * chartHeight}
                r="5"
                fill={latestData.reserves < 30 ? '#ef4444' : '#3b82f6'}
                className="pulse-point"
              />
            )}
          </svg>
          <div className="chart-status">
            {latestData.reserves < 30 ? (
              <span className="status-danger">
                🚨 {language === 'vi' ? 'Reserves cạn kiệt!' : 'Reserves depleted!'}
              </span>
            ) : latestData.reserves < 50 ? (
              <span className="status-warning">
                ⚠️ {language === 'vi' ? 'Reserves thấp' : 'Reserves low'}
              </span>
            ) : latestData.reserveChange < 0 ? (
              <span className="status-warning">
                ↓ {language === 'vi' ? 'Reserves đang giảm' : 'Reserves declining'}
              </span>
            ) : (
              <span className="status-ok">
                ✓ {language === 'vi' ? 'Reserves ổn định' : 'Reserves stable'}
              </span>
            )}
          </div>
        </div>

        {/* Volatility Chart */}
        <div className="chart-container">
          <h4 className="chart-title">
            {language === 'vi' ? 'Độ Biến Động' : 'Volatility'}
            <span className={`value ${latestData.volatility > 15 ? 'danger' : ''}`}>
              {latestData.volatility.toFixed(1)}%
            </span>
          </h4>
          <svg className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="rgba(255,255,255,0.1)" strokeDasharray="5,5" />
            
            {/* Volatility area fill */}
            {displayData.length > 1 && (
              <polygon
                points={`0,${chartHeight} ${getVolatilityPath()} ${chartWidth},${chartHeight}`}
                fill="url(#volatilityGradient)"
                opacity="0.4"
              />
            )}
            
            {/* Volatility line */}
            {displayData.length > 1 && (
              <polyline
                points={getVolatilityPath()}
                fill="none"
                stroke={latestData.volatility > 15 ? '#ef4444' : '#f59e0b'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="volatilityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Current point */}
            {displayData.length > 0 && (
              <circle
                cx={(currentDay / (timeline.length - 1)) * chartWidth}
                cy={chartHeight - (latestData.volatility / Math.max(...displayData.map(d => d.volatility), 20)) * chartHeight}
                r="5"
                fill={latestData.volatility > 15 ? '#ef4444' : '#f59e0b'}
                className="pulse-point"
              />
            )}
          </svg>
          <div className="chart-status">
            {latestData.volatility > 15 ? (
              <span className="status-danger">
                ⚡ {language === 'vi' ? 'Biến động cực cao!' : 'Extreme volatility!'}
              </span>
            ) : (
              <span className="status-ok">
                ✓ {language === 'vi' ? 'Biến động chấp nhận được' : 'Acceptable volatility'}
              </span>
            )}
          </div>
        </div>

        {/* Capital Flow Chart */}
        <div className="chart-container">
          <h4 className="chart-title">
            {language === 'vi' ? 'Dòng Vốn' : 'Capital Flow'}
            <span className={`value ${latestData.capitalFlow < 0 ? 'danger' : 'success'}`}>
              {latestData.capitalFlow > 0 ? '+' : ''}{latestData.capitalFlow.toFixed(1)}B
            </span>
          </h4>
          <svg className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {/* Zero line */}
            <line 
              x1="0" 
              y1={chartHeight / 2} 
              x2={chartWidth} 
              y2={chartHeight / 2} 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2"
            />
            
            {/* Capital flow bars */}
            {getCapitalFlowBars()}
          </svg>
          <div className="chart-status">
            {latestData.capitalFlow < -5 ? (
              <span className="status-danger">
                🔻 {language === 'vi' ? 'Vốn tháo chạy mạnh!' : 'Heavy capital flight!'}
              </span>
            ) : latestData.capitalFlow < 0 ? (
              <span className="status-warning">
                ⬇️ {language === 'vi' ? 'Vốn chảy ra' : 'Capital outflow'}
              </span>
            ) : (
              <span className="status-ok">
                ⬆️ {language === 'vi' ? 'Vốn chảy vào' : 'Capital inflow'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Overall Status */}
      {latestData.isCrisis && (
        <div className="crisis-alert">
          <div className="crisis-icon">🚨</div>
          <div className="crisis-content">
            <h3>{language === 'vi' ? 'KHỦNG HOẢNG TÀI CHÍNH!' : 'FINANCIAL CRISIS!'}</h3>
            <p>
              {language === 'vi' 
                ? `Ngày ${currentDay}: Tỷ giá sụp đổ, dự trữ cạn kiệt, cần can thiệp khẩn cấp!`
                : `Day ${currentDay}: Currency collapse, reserves depleted, urgent intervention needed!`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesCharts;

