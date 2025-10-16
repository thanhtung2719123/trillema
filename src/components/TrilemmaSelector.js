import React from 'react';
import { TrendingUp, Lock, Globe } from 'lucide-react';
import './TrilemmaSelector.css';

/**
 * Component to select which 2 goals to achieve (and which 1 to sacrifice)
 * This implements the core "Impossible Trinity" choice
 */
const TrilemmaSelector = ({ selectedGoals, onChange, language }) => {
  const goals = {
    mi: {
      id: 'mi',
      nameVi: 'Độc Lập Tiền Tệ',
      nameEn: 'Monetary Independence',
      icon: <TrendingUp size={24} />,
      descriptionVi: 'Tự chủ lãi suất',
      descriptionEn: 'Control interest rates',
    },
    ers: {
      id: 'ers',
      nameVi: 'Ổn Định Tỷ Giá',
      nameEn: 'Exchange Rate Stability',
      icon: <Lock size={24} />,
      descriptionVi: 'Tỷ giá cố định',
      descriptionEn: 'Fixed exchange rate',
    },
    kao: {
      id: 'kao',
      nameVi: 'Tích Hợp Tài Chính',
      nameEn: 'Financial Integration',
      icon: <Globe size={24} />,
      descriptionVi: 'Tự do luân chuyển vốn',
      descriptionEn: 'Free capital flows',
    },
  };

  const handleToggle = (goalId) => {
    const newSelected = [...selectedGoals];
    const index = newSelected.indexOf(goalId);

    if (index > -1) {
      // Can't deselect if only 2 selected (must keep exactly 2)
      if (newSelected.length > 2) {
        newSelected.splice(index, 1);
      } else {
        return; // Don't allow deselecting below 2
      }
    } else {
      // Can't select more than 2
      if (newSelected.length < 2) {
        newSelected.push(goalId);
      } else {
        // Replace the oldest selection
        newSelected.shift();
        newSelected.push(goalId);
      }
    }

    onChange(newSelected);
  };

  const isSelected = (goalId) => selectedGoals.includes(goalId);
  const isSacrificed = (goalId) => !selectedGoals.includes(goalId) && selectedGoals.length === 2;

  return (
    <div className="trilemma-selector">
      <h3 className="selector-title">
        {language === 'vi' 
          ? '🎯 Chọn 2 Mục Tiêu (Hy Sinh 1)' 
          : '🎯 Choose 2 Goals (Sacrifice 1)'}
      </h3>
      <p className="selector-subtitle">
        {language === 'vi'
          ? 'Bạn chỉ có thể đạt được 2 trong 3 mục tiêu. Mô phỏng sẽ cho thấy điều gì xảy ra với mục tiêu thứ 3.'
          : 'You can only achieve 2 of 3 goals. The simulation shows what happens to the 3rd goal.'}
      </p>

      <div className="goals-grid">
        {Object.values(goals).map((goal) => (
          <div
            key={goal.id}
            className={`goal-card ${isSelected(goal.id) ? 'selected' : ''} ${isSacrificed(goal.id) ? 'sacrificed' : ''}`}
            onClick={() => handleToggle(goal.id)}
          >
            <div className="goal-icon">{goal.icon}</div>
            <h4 className="goal-name">
              {language === 'vi' ? goal.nameVi : goal.nameEn}
            </h4>
            <p className="goal-description">
              {language === 'vi' ? goal.descriptionVi : goal.descriptionEn}
            </p>
            
            {isSelected(goal.id) && (
              <div className="goal-status selected-badge">
                {language === 'vi' ? '✓ Đạt được' : '✓ Achieved'}
              </div>
            )}
            
            {isSacrificed(goal.id) && (
              <div className="goal-status sacrificed-badge">
                {language === 'vi' ? '✗ Hy sinh' : '✗ Sacrificed'}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedGoals.length === 2 && (
        <div className="selection-summary">
          <strong>
            {language === 'vi' ? 'Kịch bản hiện tại:' : 'Current Scenario:'}
          </strong>{' '}
          {language === 'vi' ? 'Đạt được' : 'Achieving'}{' '}
          <span className="highlight">
            {selectedGoals.map(id => language === 'vi' ? goals[id].nameVi : goals[id].nameEn).join(' + ')}
          </span>
          {' → '}
          {language === 'vi' ? 'Hy sinh' : 'Sacrificing'}{' '}
          <span className="highlight sacrifice">
            {Object.keys(goals).filter(id => !selectedGoals.includes(id))
              .map(id => language === 'vi' ? goals[id].nameVi : goals[id].nameEn)[0]}
          </span>
        </div>
      )}

      <div className="preset-scenarios">
        <p className="preset-title">
          {language === 'vi' ? 'Đặt lại về mặc định:' : 'Reset to default:'}
        </p>
        <div className="preset-buttons">
          <button
            onClick={() => onChange(['mi', 'ers'])}
            className={`preset-btn ${selectedGoals.includes('mi') && selectedGoals.includes('ers') ? 'active' : ''}`}
          >
            {language === 'vi' ? '🇻🇳 Việt Nam Hiện Tại' : '🇻🇳 Vietnam Current'}
            <small>MI + ERS (Hy sinh KAO)</small>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrilemmaSelector;

