import React from 'react';
import './BuildingCard.css';

const BuildingCard = ({ building, onUpgrade, resources }) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('uk-UA').format(num);
  };

  const canUpgrade = () => {
    if (building.level >= 2) return false;
    
    const upgradeCost = {
      resources: building.upgradeMaterialCost || 50,
      workers: 50,
      budget: building.upgradeCost || 50000
    };

    return (
      resources.materials >= upgradeCost.resources &&
      resources.workers >= upgradeCost.workers &&
      resources.budget >= upgradeCost.budget
    );
  };

  return (
    <div className="building-card">
      <div className="level-badge">Рівень {building.level}</div>
      <img 
        src={building.image} 
        alt={building.name}
        className="building-image"
        onError={(e) => {
          e.target.src = '/images/placeholder.png';
          console.error('Помилка завантаження зображення:', building.image);
        }}
      />
      <div className="building-info">
        <h3 className="building-name">{building.name}</h3>
        <div className="building-stats">
          <div className="stat">
            <span>Дохід:</span>
            <span className="value">+{formatNumber(building.income)} ₴/день</span>
          </div>
          <div className="stat">
            <span>Задоволення:</span>
            <span className={`value ${building.satisfaction >= 0 ? 'positive' : 'negative'}`}>
              {building.satisfaction > 0 ? '+' : ''}{building.satisfaction}%
            </span>
          </div>
        </div>
        
        {building.level < 3 && (
          <div className="upgrade-section">
            <h4>Вартість покращення:</h4>
            <div className="upgrade-costs">
              <div className="cost-item">
                <span>Ресурси:</span>
                <span className={resources.materials >= (building.upgradeMaterialCost || 50) ? 'sufficient' : 'insufficient'}>
                  {building.upgradeMaterialCost || 50}
                </span>
              </div>
              <div className="cost-item">
                <span>Робітники:</span>
                <span className={resources.workers >= 50 ? 'sufficient' : 'insufficient'}>
                  50
                </span>
              </div>
              <div className="cost-item">
                <span>Бюджет:</span>
                <span className={resources.budget >= (building.upgradeCost || 50000) ? 'sufficient' : 'insufficient'}>
                  {formatNumber(building.upgradeCost || 50000)} ₴
                </span>
              </div>
            </div>
            <button 
              className={`upgrade-button ${canUpgrade() ? '' : 'disabled'}`}
              onClick={() => onUpgrade(building.id)}
              disabled={!canUpgrade()}
            >
              Покращити будівлю
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingCard; 