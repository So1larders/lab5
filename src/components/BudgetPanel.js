import React from 'react';
import './BudgetPanel.css';

const BudgetPanel = ({ budget, materials, workers }) => {
  const formatNumber = (num, isCurrency = false) => {
    const formatter = new Intl.NumberFormat('uk-UA', {
      style: isCurrency ? 'currency' : 'decimal',
      currency: 'UAH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(num);
  };

  return (
    <div className="budget-panel">
      <div className="resource-item">
        <div className="resource-icon">💰</div>
        <div className="resource-info">
          <span className="resource-label">Бюджет</span>
          <span className="resource-value">{formatNumber(budget, true)}</span>
        </div>
      </div>

      <div className="resource-item">
        <div className="resource-icon">🏗️</div>
        <div className="resource-info">
          <span className="resource-label">Ресурси</span>
          <span className="resource-value">{formatNumber(materials)}</span>
        </div>
      </div>

      <div className="resource-item">
        <div className="resource-icon">👷</div>
        <div className="resource-info">
          <span className="resource-label">Робітники</span>
          <span className="resource-value">{formatNumber(workers)}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetPanel; 