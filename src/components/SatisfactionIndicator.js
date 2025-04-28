import React from 'react';
import './SatisfactionIndicator.css';

const SatisfactionIndicator = ({ satisfaction }) => {
  const getEmoji = () => {
    if (satisfaction >= 80) return '😊';
    if (satisfaction >= 60) return '🙂';
    if (satisfaction >= 40) return '😐';
    if (satisfaction >= 20) return '🙁';
    return '😢';
  };

  const getColor = () => {
    if (satisfaction >= 80) return '#4CAF50';
    if (satisfaction >= 60) return '#8BC34A';
    if (satisfaction >= 40) return '#FFC107';
    if (satisfaction >= 20) return '#FF9800';
    return '#f44336';
  };

  return (
    <div className="satisfaction-indicator">
      <div className="satisfaction-header">
        <span className="satisfaction-emoji">{getEmoji()}</span>
        <h3>Задоволеність жителів</h3>
      </div>
      
      <div className="satisfaction-bar-container">
        <div 
          className="satisfaction-bar"
          style={{ 
            width: `${satisfaction}%`,
            backgroundColor: getColor()
          }}
        />
        <span className="satisfaction-value">{satisfaction}%</span>
      </div>

      <div className="satisfaction-details">
        <div className="satisfaction-tip">
          {satisfaction >= 80 && 'Жителі дуже задоволені містом!'}
          {satisfaction >= 60 && satisfaction < 80 && 'Місто розвивається в правильному напрямку'}
          {satisfaction >= 40 && satisfaction < 60 && 'Є простір для покращення'}
          {satisfaction >= 20 && satisfaction < 40 && 'Потрібні термінові зміни'}
          {satisfaction < 20 && 'Критична ситуація! Необхідні негайні дії!'}
        </div>
      </div>
    </div>
  );
};

export default SatisfactionIndicator; 