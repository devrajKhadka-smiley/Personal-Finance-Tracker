import React, { useState } from "react";
import { useFinance } from "../Context/TransactionContext";


const SettingsPage = () => {
  const { settings, updateSettings } = useFinance();
  const [currency, setCurrency] = useState(settings.currency);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSettings({ currency });
  };

  return (
    <div className="settings-page-container">
      <div className="settings-content">
        <h2 className="settings-title">Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label htmlFor="currency" className="form-label">Currency:</label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="form-control dropdown"
            >
              <option value="USD">USD - $</option>
              <option value="NPR">NPR - N₹</option>
              <option value="EUR">EUR - €</option>
              <option value="GBP">GBP - £</option>
              <option value="JPY">JPY - ¥</option>
              <option value="AUD">AUD - A$</option>
              <option value="CAD">CAD - C$</option>
              <option value="CNY">CNY - CN¥</option>
              <option value="INR">INR - ₹</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
