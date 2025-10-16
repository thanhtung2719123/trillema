import React, { useState } from 'react';
import { Key, Check, X } from 'lucide-react';
import './APIKeyInput.css';

const APIKeyInput = ({ onSubmit, language }) => {
  const [apiKey, setApiKey] = useState('');
  const [showInput, setShowInput] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
      setShowInput(false);
    }
  };

  const handleReset = () => {
    setApiKey('');
    setShowInput(true);
    onSubmit(null);
  };

  if (!showInput) {
    return (
      <div className="api-key-status">
        <div className="status-content">
          <Check size={20} className="status-icon success" />
          <span>{language === 'vi' ? 'API Key đã được thiết lập' : 'API Key configured'}</span>
        </div>
        <button onClick={handleReset} className="btn-reset-key">
          <X size={16} />
          {language === 'vi' ? 'Đổi' : 'Change'}
        </button>
      </div>
    );
  }

  return (
    <div className="api-key-input">
      <div className="api-key-header">
        <Key size={20} />
        <h4>{language === 'vi' ? 'Cấu hình Gemini API Key' : 'Configure Gemini API Key'}</h4>
      </div>
      <form onSubmit={handleSubmit} className="api-key-form">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={language === 'vi' ? 'Nhập API Key của bạn...' : 'Enter your API Key...'}
          className="api-key-field"
        />
        <button type="submit" className="btn-submit-key">
          {language === 'vi' ? 'Lưu' : 'Save'}
        </button>
      </form>
      <p className="api-key-help">
        {language === 'vi' 
          ? 'Nhận API key miễn phí tại '
          : 'Get a free API key at '}
        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
          Google AI Studio
        </a>
      </p>
    </div>
  );
};

export default APIKeyInput;


