import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, language, translations }) => {
  if (!results) return null;

  const t = translations[language];
  const { outputs } = results;

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'crisis': return 'severity-crisis';
      case 'warning': return 'severity-warning';
      case 'stable': return 'severity-stable';
      default: return '';
    }
  };

  const getSeverityLabel = (severity) => {
    if (language === 'vi') {
      switch (severity) {
        case 'crisis': return 'Khủng Hoảng';
        case 'warning': return 'Cảnh Báo';
        case 'stable': return 'Ổn Định';
        default: return '';
      }
    } else {
      switch (severity) {
        case 'crisis': return 'Crisis';
        case 'warning': return 'Warning';
        case 'stable': return 'Stable';
        default: return '';
      }
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <div className="results-display">
      <h3 className="results-title">{t.simulationResults}</h3>

      {/* Status Banner */}
      <div className={`status-banner ${getSeverityClass(outputs.constraint.severity)}`}>
        <AlertTriangle size={24} />
        <span className="status-text">
          {getSeverityLabel(outputs.constraint.severity)}
        </span>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        {/* Exchange Rate */}
        <div className="metric-card">
          <div className="metric-icon exchange-rate">
            {outputs.exchangeRate.change > 0 ? <TrendingDown size={32} /> : <TrendingUp size={32} />}
          </div>
          <div className="metric-content">
            <h4 className="metric-label">{t.exchangeRate}</h4>
            <div className="metric-value">
              {formatNumber(outputs.exchangeRate.newRate)}
            </div>
            <div className={`metric-change ${outputs.exchangeRate.change > 0 ? 'negative' : 'positive'}`}>
              {outputs.exchangeRate.change > 0 ? '↑' : '↓'} 
              {Math.abs(outputs.exchangeRate.percentChange).toFixed(2)}%
            </div>
            <div className="metric-subtext">
              {outputs.exchangeRate.change > 0 
                ? (language === 'vi' ? 'VND mất giá' : 'VND depreciation')
                : (language === 'vi' ? 'VND tăng giá' : 'VND appreciation')}
            </div>
          </div>
        </div>

        {/* Foreign Reserves */}
        <div className="metric-card">
          <div className="metric-icon reserves">
            <DollarSign size={32} />
          </div>
          <div className="metric-content">
            <h4 className="metric-label">{t.foreignReserves}</h4>
            <div className="metric-value">
              ${formatNumber(outputs.reserves.newReserves)}B
            </div>
            <div className={`metric-change ${outputs.reserves.depletion > 0 ? 'negative' : 'positive'}`}>
              {outputs.reserves.depletion > 0 ? '↓' : '↑'} 
              {Math.abs(outputs.reserves.percentDepletion).toFixed(2)}%
            </div>
            <div className="metric-subtext">
              {outputs.reserves.depletion > 0 
                ? (language === 'vi' ? 'Suy giảm' : 'Depletion')
                : (language === 'vi' ? 'Tăng lên' : 'Accumulation')}
            </div>
          </div>
        </div>

        {/* Volatility */}
        <div className="metric-card">
          <div className="metric-icon volatility">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12 L7 8 L11 14 L15 6 L19 10 L21 8" />
            </svg>
          </div>
          <div className="metric-content">
            <h4 className="metric-label">{t.volatility}</h4>
            <div className="metric-value">
              {outputs.volatility.toFixed(2)}%
            </div>
            <div className={`metric-change ${outputs.volatility > 10 ? 'negative' : 'positive'}`}>
              {outputs.volatility > 10 ? (language === 'vi' ? 'Cao' : 'High') : (language === 'vi' ? 'Thấp' : 'Low')}
            </div>
            <div className="metric-subtext">
              {language === 'vi' ? 'Biến động thị trường' : 'Market volatility'}
            </div>
          </div>
        </div>

        {/* Capital Flow */}
        <div className="metric-card">
          <div className={`metric-icon capital-flow ${outputs.capitalFlow > 0 ? 'inflow' : 'outflow'}`}>
            {outputs.capitalFlow > 0 ? '↓' : '↑'}
          </div>
          <div className="metric-content">
            <h4 className="metric-label">
              {language === 'vi' ? 'Dòng vốn' : 'Capital Flow'}
            </h4>
            <div className="metric-value">
              ${Math.abs(outputs.capitalFlow).toFixed(2)}B
            </div>
            <div className={`metric-change ${outputs.capitalFlow > 0 ? 'positive' : 'negative'}`}>
              {outputs.capitalFlow > 0 
                ? (language === 'vi' ? 'Vào' : 'Inflow')
                : (language === 'vi' ? 'Ra' : 'Outflow')}
            </div>
            <div className="metric-subtext">
              {language === 'vi' ? 'Áp lực luân chuyển' : 'Flow pressure'}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="analysis-section">
        <h4 className="analysis-title">
          {language === 'vi' ? 'Phân tích chi tiết' : 'Detailed Analysis'}
        </h4>
        
        <div className="analysis-item">
          <span className="analysis-label">
            {language === 'vi' ? 'Chênh lệch lãi suất:' : 'Interest Rate Differential:'}
          </span>
          <span className="analysis-value">
            {outputs.rateDifferential > 0 ? '+' : ''}{outputs.rateDifferential.toFixed(2)}%
          </span>
        </div>

        <div className="analysis-item">
          <span className="analysis-label">
            {language === 'vi' ? 'Ràng buộc bị vi phạm:' : 'Constraint Violated:'}
          </span>
          <span className={`analysis-value ${getSeverityClass(outputs.constraint.severity)}`}>
            {outputs.constraint.mostViolated === 'mi' && (language === 'vi' ? 'Độc lập Tiền tệ' : 'Monetary Independence')}
            {outputs.constraint.mostViolated === 'ers' && (language === 'vi' ? 'Ổn định Tỷ giá' : 'Exchange Rate Stability')}
            {outputs.constraint.mostViolated === 'kao' && (language === 'vi' ? 'Tích hợp Tài chính' : 'Financial Integration')}
            {outputs.constraint.mostViolated === 'none' && (language === 'vi' ? 'Không có' : 'None')}
          </span>
        </div>

        {outputs.constraint.severity === 'crisis' && (
          <div className="crisis-warning">
            <AlertTriangle size={20} />
            <p>
              {language === 'vi' 
                ? 'Cảnh báo: Tình huống này có thể dẫn đến khủng hoảng tài chính. Ngân hàng Trung ương cần can thiệp khẩn cấp!'
                : 'Warning: This scenario may lead to a financial crisis. Central bank intervention urgently needed!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;


