import React from 'react';
import './Resources.css';

const Resources = ({ budget, materials, workers }) => {
  const sponsors = [
    {
      name: 'Buildcorp',
      logo: '/images/BuildCorp.png'
    },
    {
      name: 'TechPro',
      logo: '/images/UrbanFund.png'
    },
    {
      name: 'GreenEnergy',
      logo: '/images/GreenEner.jpg'
    },
    {
      name: 'FutureTech',
      logo: '/images/FutureTech.png'
    }
  ];

  const constructionCompanies = [
    {
      name: 'BuildMaster Inc.',
      logo: '/images/buildmaster.png',
      description: 'Спеціалізація: Житлове комплекси'
    },
    {
      name: 'UrbanConstruct',
      logo: '/images/UrbanConstruct.jpg',
      description: 'Спеціалізація: Комерційні будівлі'
    },
    {
      name: 'InfraBuild',
      logo: '/images/InfraBuild.png',
      description: 'Спеціалізація: Інфраструктурні об\'єкти'
    },
    {
      name: 'EcoBay',
      logo: '/images/EcoStroy.jpg',
      description: 'Спеціалізація: Екологічні будівлі'
    }
  ];

  const resourceBases = [
    {
      name: 'MinedQuarry',
      logo: '/images/StoneQuarry.jpg',
      description: 'Постачає: пісок, щебінь, каміння'
    },
    {
      name: 'MetalWorks',
      logo: '/images/MetalWorks.png',
      description: 'Постачає: метал, арматуру'
    },
    {
      name: 'TimberLand',
      logo: '/images/TimberLand.jpg',
      description: 'Постачає: деревину, ДСП'
    }
  ];

  return (
    <div className="resources-panel">
      <div className="resources-overview">
        <div className="resource-card">
          <h3>Загальний бюджет</h3>
          <div className="resource-value">
            <span>{(typeof budget === 'number' ? budget : 0).toLocaleString()}M $</span>
          </div>
        </div>

        <div className="resource-card">
          <h3>Загальні ресурси</h3>
          <div className="resource-value">
            <span>{(typeof materials === 'number' ? materials : 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="resource-card">
          <h3>Будівельники</h3>
          <div className="resource-value">
            <span>{typeof workers === 'number' ? workers : 0}</span>
          </div>
        </div>
      </div>

      <div className="sponsors-section">
        <h3>Наші спонсори</h3>
        <p className="section-description">
          Ці компанії підтримують розвиток нашого міста та допомагають у реалізації масштабних проектів.
        </p>
        <div className="sponsors-grid">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="sponsor-item">
              <img src={sponsor.logo} alt={sponsor.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="construction-companies">
        <h3>Будівельні компанії</h3>
        <p className="section-description">
          Ці компанії будують нові реалізовані проекти у нашому місті.
        </p>
        <div className="companies-list">
          {constructionCompanies.map((company, index) => (
            <div key={index} className="company-item">
              <img src={company.logo} alt={company.name} />
              <div className="company-info">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="resource-bases">
        <h3>Ресурсні бази</h3>
        <p className="section-description">
          Джерела матеріалів для будівництва вашого міста.
        </p>
        <div className="companies-list">
          {resourceBases.map((base, index) => (
            <div key={index} className="company-item">
              <img src={base.logo} alt={base.name} />
              <div className="company-info">
                <h4>{base.name}</h4>
                <p>{base.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources; 