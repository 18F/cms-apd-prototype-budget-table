import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="new iapd">
    <header className="back"><Link to="/dashboard/state">Back to the dashboard</Link></header>
    <header>
      <h3>Success</h3>
    </header>

    <h2>Your IAPD has been submitted successfully</h2>
  </div>
);
