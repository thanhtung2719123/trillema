import React, { useState } from 'react';
import { Sparkles, Loader, AlertCircle } from 'lucide-react';
import './AIExplanation.css';

const AIExplanation = ({ onGenerate, language, translations, isLoading, explanation, error }) => {
  const t = translations[language];

  return (
    <div className="ai-explanation">
      <div className="ai-header">
        <Sparkles size={24} className="ai-icon" />
        <h3 className="ai-title">{t.explanation}</h3>
      </div>

      <button 
        onClick={onGenerate} 
        className="btn-generate"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader size={20} className="spinner" />
            {t.loading}
          </>
        ) : (
          <>
            <Sparkles size={20} />
            {language === 'vi' ? 'Tạo Giải Thích' : 'Generate Explanation'}
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {explanation && (
        <div className="explanation-content">
          <div className="explanation-text">
            {explanation.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              
              // Check if it's a header (starts with ** or ##)
              if (paragraph.trim().startsWith('**') || paragraph.trim().startsWith('##')) {
                const text = paragraph.replace(/\*\*/g, '').replace(/##/g, '').trim();
                return <h4 key={index} className="explanation-header">{text}</h4>;
              }
              
              // Regular paragraph
              return <p key={index} className="explanation-paragraph">{paragraph}</p>;
            })}
          </div>
        </div>
      )}

      {!explanation && !error && !isLoading && (
        <div className="placeholder">
          <Sparkles size={48} className="placeholder-icon" />
          <p className="placeholder-text">
            {language === 'vi' 
              ? 'Nhấp nút để nhận giải thích chi tiết từ AI về kịch bản mô phỏng của bạn'
              : 'Click the button to get a detailed AI explanation of your simulation scenario'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIExplanation;


