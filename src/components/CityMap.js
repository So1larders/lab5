import React, { useState, useEffect } from 'react';
import './CityMap.css';
import BuildingCard from './BuildingCard';
import BudgetPanel from './BudgetPanel';
import SatisfactionIndicator from './SatisfactionIndicator';

const CityMap = ({ buildings = [], onUpgrade, cityResources }) => {
  // Розраховуємо загальну задоволеність на основі будівель
  const safeBuildings = Array.isArray(buildings) ? buildings : [];

  const calculateTotalSatisfaction = () => {
    if (safeBuildings.length === 0) return 50; // Базова задоволеність
    let totalSatisfaction = 50;
    safeBuildings.forEach(building => {
      totalSatisfaction += building.satisfaction || 0;
    });
    return Math.min(Math.max(totalSatisfaction, 0), 100);
  };

  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('all');
  const [satisfaction, setSatisfaction] = useState(() => calculateTotalSatisfaction());

  // Оновлюємо задоволеність при зміні будівель
  useEffect(() => {
    const newSatisfaction = calculateTotalSatisfaction();
    setSatisfaction(newSatisfaction);
  }, [buildings]);

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

  const getSortedAndFilteredBuildings = () => {
    let filteredBuildings = [...safeBuildings];
    
    if (filterCategory !== 'all') {
      filteredBuildings = safeBuildings.filter(b => getBuildingCategory(b) === filterCategory);
    }

    switch (sortBy) {
      case 'name':
        return filteredBuildings.sort((a, b) => a.name.localeCompare(b.name));
      case 'level':
        return filteredBuildings.sort((a, b) => b.level - a.level);
      case 'cost':
        return filteredBuildings.sort((a, b) => b.cost - a.cost);
      default: // 'date'
        return filteredBuildings.sort((a, b) => 
          new Date(b.constructionDate) - new Date(a.constructionDate)
        );
    }
  };

  const getCityStats = () => {
    const stats = {
      totalBuildings: safeBuildings.length,
      totalValue: safeBuildings.reduce((sum, b) => sum + b.cost, 0),
      averageLevel: safeBuildings.length ? safeBuildings.reduce((sum, b) => sum + b.level, 0) / safeBuildings.length : 0,
      maxLevelBuildings: safeBuildings.filter(b => b.level === 2).length
    };
    return stats;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('uk-UA').format(num);
  };

  const cityStats = getCityStats();

  if (safeBuildings.length === 0) {
    return (
      <div className="city-map">
        <div className="empty-city">
          <h2>Ваше місто поки що порожнє</h2>
          <p>
            Почніть будівництво нових споруд у розділі "Будівництво" 🏗️
            Створіть своє унікальне місто та розвивайте його!
          </p>
          <div style={{ fontSize: '3em', marginTop: '20px' }}>
            🏢 🏥 🏫 🏭
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="city-map">
      <BudgetPanel 
        budget={cityResources.budget}
        materials={cityResources.materials}
        workers={cityResources.workers}
      />

      <div className="city-header">
        <div className="controls-section">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="date">За датою</option>
            <option value="name">За назвою</option>
            <option value="level">За рівнем</option>
            <option value="cost">За вартістю</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="control-select"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <SatisfactionIndicator satisfaction={satisfaction} />
      </div>

      <div className="grid-container">
        {getSortedAndFilteredBuildings().map((building) => (
          <BuildingCard
            key={building.id}
            building={building}
            onUpgrade={onUpgrade}
            resources={cityResources}
          />
        ))}
      </div>
    </div>
  );
};

export default CityMap; 