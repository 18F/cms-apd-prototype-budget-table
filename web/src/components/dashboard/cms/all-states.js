import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Map from 'react-us-state-map';

const render = () => (
  <div className="cms dashboard all-states">
    <header className="back"><Link to="/dashboard/cms">Back to the dashboard</Link></header>
    <header>
      <h3>All states <small>overview</small></h3>
    </header>

    <div className="summary">
      <h1>Spending summary</h1>

      <div className="usa-grid">
        <div className="usa-width-one-half">
          <h2>FY17 Total CMS allocated funds</h2>
          <span className="callout">$6,500,293,432.00</span>
        </div>
        <div className="usa-width-one-half">
          <h2>Total quarterly expenditure to date</h2>
          <span className="callout">$1,498,735,733.00</span>
        </div>
      </div>
    </div>

    <Map />

    <div className="usa-grid charts">
      <div className="usa-width-seven-twelfths">hi</div>
      <div className="usa-width-five-twelfths">bye</div>
    </div>

  </div>
);

export default withRouter(render);
