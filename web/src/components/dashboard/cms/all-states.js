import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Map from 'react-us-state-map';
import chart1 from './all-state-chart1.png';
import chart2 from './all-state-chart2.png';

class AllStatesView extends React.Component {
  constructor() {
    super();

    this.state = {
      hideStateCallout: true
    };

    this.toggleCallout = () => {
      this.setState({ hideStateCallout: !this.state.hideStateCallout });
    };

    this.clickState = (state) => {
      if (state === 'WY') {
        this.toggleCallout();
      } else {
        this.setState({ hideStateCallout: true });
      }
    };
  }

  render() {
    return (
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

        <div className="map-container">
          <Map onClick={this.clickState} />
          <div className="alert-icon" onClick={this.toggleCallout}>!</div> { // eslint-disable-line jsx-a11y/no-static-element-interactions
          }
          <div className="state-callout" hidden={this.state.hideStateCallout}>
            <h2>Wyoming</h2>
            60-day review period ending
          </div>
        </div>

        <div className="usa-grid charts">
          <div className="usa-width-seven-twelfths"><img alt="expenditures by state" src={chart1} /></div>
          <div className="usa-width-five-twelfths"><img alt="MITA average by state" src={chart2} /></div>
        </div>

      </div>
    );
  }
}

export default withRouter(AllStatesView);
