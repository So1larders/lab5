import React, { useState, useEffect } from 'react';
import './Construction.css';

const Construction = ({ buildingTypes = [], onBuild, cityResources }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredBuilding, setHoveredBuilding] = useState(null);

  const safeBuildingTypes = Array.isArray(buildingTypes) ? buildingTypes : [];

  const categories = [
    { id: 'all', name: 'Всі категорії' },
    { id: 'residential', name: 'Житлові' },
    { id: 'commercial', name: 'Комерційні' },
    { id: 'social', name: 'Соціальні' },
    { id: 'infrastructure', name: 'Інфраструктура' }
  ];

  const getBuildingCategory = (building) => {
    if (building.name.includes('Житловий')) return 'residential';
    if (building.name.includes('Офісний') || building.name.includes('Індустріальна')) return 'commercial';
    if (building.name.includes('Лікарня') || building.name.includes('Школа')) return 'social';
    return 'infrastructure';
  };

  const filteredBuildings = safeBuildingTypes.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || getBuildingCategory(building) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatNumber = (num) => {
    return new Intl.NumberFormat('uk-UA').format(num);
  };

  const canBuildBuilding = (building) => {
    if (!cityResources) {
      console.log('cityResources is not available');
      return false;
    }

    const requiredResources = Math.floor(building.resources * 0.3);
    const requiredWorkers = Math.floor(building.workers * 0.2);

    console.log('Building requirements:', {
      cost: building.cost,
      resources: requiredResources,
      workers: requiredWorkers
    });
    
    console.log('Available resources:', cityResources);

    const canBuild = (
      cityResources.budget >= building.cost &&
      cityResources.materials >= requiredResources &&
      cityResources.workers >= requiredWorkers
    );

    console.log('Can build:', canBuild);
    return canBuild;
  };

  const getRequirementClass = (current, required) => {
    return current >= required ? 'sufficient' : 'insufficient';
  };

  return (
    <div className="construction-container">
      <div className="construction-header">
        <div className="search-section">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Пошук будівель..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="buildings-grid">
        {filteredBuildings.map((building) => (
          <div
            key={building.name}
            className="building-item"
            onMouseEnter={() => setHoveredBuilding(building.name)}
            onMouseLeave={() => setHoveredBuilding(null)}
          >
            <img
              src={building.image}
              alt={building.name}
              className="building-image"
            />
            <div className="building-info">
              <h3 className="building-name">{building.name}</h3>
              
              <div className="building-description">
                <p>{building.description}</p>
                <div className={`satisfaction-impact ${building.satisfaction >= 0 ? 'positive' : 'negative'}`}>
                  {building.satisfaction >= 0 ? '😊' : '😟'} 
                  Задоволеність: {building.satisfaction > 0 ? '+' : ''}{building.satisfaction}%
                </div>
              </div>

              <div className="building-details">
                <div className="detail-item">
                  <span>💰</span>
                  <span>{formatNumber(building.cost)}$</span>
                </div>
                <div className="detail-item">
                  <span>👷</span>
                  <span>{building.workers}</span>
                </div>
                <div className="detail-item">
                  <span>🏗️</span>
                  <span>{building.resources}</span>
                </div>
                <div className="detail-item">
                  <span>⭐</span>
                  <span>Рівень {building.level}</span>
                </div>
              </div>

              {hoveredBuilding === building.name && cityResources && (
                <div className="resource-requirements">
                  <div className={`requirement ${getRequirementClass(cityResources.budget, building.cost)}`}>
                    💰 {formatNumber(cityResources.budget)} / {formatNumber(building.cost)}
                  </div>
                  <div className={`requirement ${getRequirementClass(cityResources.materials, Math.floor(building.resources * 0.3))}`}>
                    🏗️ {formatNumber(cityResources.materials)} / {formatNumber(Math.floor(building.resources * 0.3))}
                  </div>
                  <div className={`requirement ${getRequirementClass(cityResources.workers, Math.floor(building.workers * 0.2))}`}>
                    👷 {formatNumber(cityResources.workers)} / {formatNumber(Math.floor(building.workers * 0.2))}
                  </div>
                </div>
              )}

              <button
                className="build-button"
                onClick={() => onBuild(building)}
                disabled={!canBuildBuilding(building)}
              >
                {canBuildBuilding(building) ? (
                  <>🏗️ Побудувати</>
                ) : (
                  <>❌ Недостатньо ресурсів</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Construction; 