import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Map from 'react-us-state-map';

const render = props => (
  <div className="cms dashboard">
    <header>
      <h3>CMS MMIS <small>overview</small></h3>
    </header>

    <h1><Link to={`${props.match.path}all`}>Overview of all states</Link></h1>

    <h1>or pick a state</h1>

    <div className="usa-grid">
      <div className="usa-width-one-fourth">
        <Link to={`${props.match.path}state/AL`}>Alabama</Link><br />
        <Link to={`${props.match.path}state/AK`}>Alaska</Link><br />
        <Link to={`${props.match.path}state/AZ`}>Arizona</Link><br />
        <Link to={`${props.match.path}state/AR`}>Arkansas</Link><br />
        <Link to={`${props.match.path}state/CA`}>California</Link><br />
        <Link to={`${props.match.path}state/CO`}>Colorado</Link><br />
        <Link to={`${props.match.path}state/CT`}>Connecticut</Link><br />
        <Link to={`${props.match.path}state/DE`}>Delaware</Link><br />
        <Link to={`${props.match.path}state/DC`}>District of Columbia</Link><br />
        <Link to={`${props.match.path}state/FL`}>Florida</Link><br />
        <Link to={`${props.match.path}state/GA`}>Georgia</Link><br />
        <Link to={`${props.match.path}state/HI`}>Hawaii</Link><br />
        <Link to={`${props.match.path}state/ID`}>Idaho</Link>
      </div>
      <div className="usa-width-one-fourth">
        <Link to={`${props.match.path}state/IL`}>Illinois</Link><br />
        <Link to={`${props.match.path}state/IN`}>Indiana</Link><br />
        <Link to={`${props.match.path}state/IA`}>Iowa</Link><br />
        <Link to={`${props.match.path}state/KS`}>Kansas</Link><br />
        <Link to={`${props.match.path}state/KY`}>Kentucky</Link><br />
        <Link to={`${props.match.path}state/LA`}>Louisiana</Link><br />
        <Link to={`${props.match.path}state/ME`}>Maine</Link><br />
        <Link to={`${props.match.path}state/MD`}>Maryland</Link><br />
        <Link to={`${props.match.path}state/MA`}>Massachusetts</Link><br />
        <Link to={`${props.match.path}state/MI`}>Michigan</Link><br />
        <Link to={`${props.match.path}state/MN`}>Minnesota</Link><br />
        <Link to={`${props.match.path}state/MS`}>Mississippi</Link><br />
        <Link to={`${props.match.path}state/MO`}>Missouri</Link>
      </div>
      <div className="usa-width-one-fourth">
        <Link to={`${props.match.path}state/MT`}>Montana</Link><br />
        <Link to={`${props.match.path}state/NE`}>Nebraska</Link><br />
        <Link to={`${props.match.path}state/NV`}>Nevada</Link><br />
        <Link to={`${props.match.path}state/NH`}>New Hampshire</Link><br />
        <Link to={`${props.match.path}state/NJ`}>New Jersy</Link><br />
        <Link to={`${props.match.path}state/NM`}>New Mexico</Link><br />
        <Link to={`${props.match.path}state/NY`}>New York</Link><br />
        <Link to={`${props.match.path}state/NC`}>North Carolina</Link><br />
        <Link to={`${props.match.path}state/ND`}>North Dakota</Link><br />
        <Link to={`${props.match.path}state/OH`}>Ohio</Link><br />
        <Link to={`${props.match.path}state/OK`}>Oklahoma</Link><br />
        <Link to={`${props.match.path}state/OR`}>Oregon</Link><br />
        <Link to={`${props.match.path}state/PA`}>Pennsylvania</Link>
      </div>
      <div className="usa-width-one-fourth">
        <Link to={`${props.match.path}state/RI`}>Rhode Island</Link><br />
        <Link to={`${props.match.path}state/SC`}>South Carolina</Link><br />
        <Link to={`${props.match.path}state/SD`}>South Dakota</Link><br />
        <Link to={`${props.match.path}state/TN`}>Tennessee</Link><br />
        <Link to={`${props.match.path}state/TX`}>Texas</Link><br />
        <Link to={`${props.match.path}state/UT`}>Utah</Link><br />
        <Link to={`${props.match.path}state/VT`}>Vermont</Link><br />
        <Link to={`${props.match.path}state/VA`}>Virginia</Link><br />
        <Link to={`${props.match.path}state/WA`}>Washington</Link><br />
        <Link to={`${props.match.path}state/WV`}>West Virginia</Link><br />
        <Link to={`${props.match.path}state/WI`}>Wisconsin</Link><br />
        <Link to={`${props.match.path}state/WY`}>Wyoming</Link>
      </div>
    </div>

    { /* <Map onClick={state => props.history.push(`${props.match.path}state/${state}`)} /> */ }
  </div>
);

render.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(render);
