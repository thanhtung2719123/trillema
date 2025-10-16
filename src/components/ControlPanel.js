import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ values, onChange, onSimulate, onReset, language, translations }) => {
  const t = translations[language];

  const handleChange = (key, value) => {
    onChange(key, parseFloat(value));
  };

  return (
    <div className="control-panel">
      <h3 className="panel-title">{t.currentScenario}</h3>

      <div className="controls-grid">
        {/* Monetary Independence Controls */}
        <div className="control-section">
          <h4 className="section-title">{t.monetaryIndependence}</h4>
          
          <div className="control-item">
            <label className="control-label">
              {t.vietnamPolicyRate}
              <span className="value-display">{values.vietnamRate.toFixed(2)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.25"
              value={values.vietnamRate}
              onChange={(e) => handleChange('vietnamRate', e.target.value)}
              className="slider"
            />
            <div className="range-labels">
              <span>0%</span>
              <span>10%</span>
            </div>
          </div>

          <div className="control-item">
            <label className="control-label">
              {t.usFedRate}
              <span className="value-display">{values.usRate.toFixed(2)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="8"
              step="0.25"
              value={values.usRate}
              onChange={(e) => handleChange('usRate', e.target.value)}
              className="slider"
            />
            <div className="range-labels">
              <span>0%</span>
              <span>8%</span>
            </div>
          </div>
        </div>

        {/* Exchange Rate Stability Controls */}
        <div className="control-section">
          <h4 className="section-title">{t.exchangeRateStability}</h4>
          
          <div className="control-item">
            <label className="control-label">
              {t.foreignReserves}
              <span className="value-display">${values.foreignReserves.toFixed(1)}B</span>
            </label>
            <input
              type="range"
              min="20"
              max="150"
              step="5"
              value={values.foreignReserves}
              onChange={(e) => handleChange('foreignReserves', e.target.value)}
              className="slider"
            />
            <div className="range-labels">
              <span>$20B</span>
              <span>$150B</span>
            </div>
          </div>
        </div>

        {/* Financial Integration Controls */}
        <div className="control-section">
          <h4 className="section-title">{t.financialIntegration}</h4>
          
          <div className="control-item">
            <label className="control-label">
              {t.capitalOpenness}
              <span className="value-display">{values.capitalOpenness.toFixed(3)}</span>
            </label>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.1"
              value={values.capitalOpenness}
              onChange={(e) => handleChange('capitalOpenness', e.target.value)}
              className="slider"
            />
            <div className="range-labels">
              <span>{language === 'vi' ? 'Hạn chế' : 'Restricted'}</span>
              <span>{language === 'vi' ? 'Mở' : 'Open'}</span>
            </div>
            <div className="help-text">
              {language === 'vi' 
                ? 'Âm = hạn chế vốn, Dương = mở cửa tài chính'
                : 'Negative = restricted, Positive = open'}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onSimulate} className="btn btn-primary">
          {t.simulate}
        </button>
        <button onClick={onReset} className="btn btn-secondary">
          {t.reset}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;


