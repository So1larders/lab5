import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">\
        <div className="welcome-header">
          <img src="/images/logo.jpg" alt="City Control Simulator Logo" className="welcome-logo" />
          <h1>City Control Simulator</h1>
        </div>

        <div className="welcome-description">
          <h2>Ласкаво просимо до симулятора управління містом!</h2>
          <p>
            City Control Simulator - це унікальна можливість створити та розвинути власне місто.
            Будуйте різноманітні споруди, керуйте ресурсами та спостерігайте, як ваше місто росте та процвітає.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>🏗️ Будівництво</h3>
            <p>Створюйте різноманітні будівлі: від житлових комплексів до промислових зон</p>
          </div>
          <div className="feature-card">
            <h3>💰 Економіка</h3>
            <p>Керуйте бюджетом міста та розподіляйте ресурси ефективно</p>
          </div>
          <div className="feature-card">
            <h3>🌆 Розвиток</h3>
            <p>Покращуйте будівлі та розширюйте можливості вашого міста</p>
          </div>
          <div className="feature-card">
            <h3>👥 Населення</h3>
            <p>Піклуйтеся про жителів, забезпечуючи їх всім необхідним</p>
          </div>
        </div>

        <div className="contact-section">
          <h2>Зв'яжіться з нами</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span>📧 Email:</span>
              <a href="mailto:info@citysimulator.com">info@citysimulator.com</a>
            </div>
            <div className="contact-item">
              <span>📞 Телефон:</span>
              <a href="tel:+380123456789">+38 (012) 345-67-89</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 