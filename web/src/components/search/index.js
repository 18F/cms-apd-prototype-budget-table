import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';
import { states, projects } from './data';

import Dollars from '../dollars';

const getFilteredProjects = search => projects.filter((project) => {
  if (search.name) {
    if (!project.name.toLowerCase().includes(search.name.toLowerCase())) {
      return false;
    }
  }

  if (search.state) {
    const nameMatches = project.state.toLowerCase().includes(search.state.toLowerCase());
    let abbreviationMatches = false;

    if (states[search.state.toUpperCase()]) {
      abbreviationMatches = project.state.toLowerCase().includes(states[search.state.toUpperCase()].toLowerCase());
    }

    if (!nameMatches && !abbreviationMatches) {
      return false;
    }
  }

  if (search.vendors) {
    if (!project.vendors.some(vendor => vendor.toLowerCase().includes(search.vendors.toLowerCase()))) {
      return false;
    }
  }

  return true;
});

class ProjectElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFinancials: false
    };

    this.toggleShowFinancials = () => {
      this.setState({ showFinancials: !this.state.showFinancials });
    };
  }

  render() {
    const project = this.props.project;
    return (
      <div className="result">
        <header>{project.name}</header>
        <div className="state">{project.state}</div>
        <div className="vendors">{project.vendors.join(', ')}</div>
        <button onClick={this.toggleShowFinancials}>Show details</button>
        <Collapse isOpened={this.state.showFinancials}>
          <h2>Total project cost: <Dollars value={project.financials.total} /></h2>
        </Collapse>
      </div>
    );
  }
}
ProjectElement.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: {
        name: '',
        state: '',
        vendors: ''
      },
      projects
    };

    this.onChangeName = (e) => {
      this.updateSearch('name', e);
    };

    this.onChangeState = (e) => {
      this.updateSearch('state', e);
    };

    this.onChangeVendors = (e) => {
      this.updateSearch('vendors', e);
    };

    this.updateSearch = (property, e) => {
      const search = this.state.search;
      search[property] = e.target.value;
      const filteredProjects = getFilteredProjects(this.state.search);
      this.setState({ search, projects: filteredProjects });
    };
  }

  render() {
    return (
      <div className="search component">
        <label htmlFor="search_name">Project name</label>
        <input id="search_name" type="text" onChange={this.onChangeName} value={this.state.search.name} />

        <label htmlFor="search_state">State</label>
        <input id="search_state" type="text" onChange={this.onChangeState} value={this.state.search.state} />

        <label htmlFor="search_vendors">Project vendor</label>
        <input id="search_vendors" type="text" onChange={this.onChangeVendors} value={this.state.search.vendors} />

        <hr />

        <h3>{ this.state.projects.length } projects</h3>
        {this.state.projects.map(project => (
          <ProjectElement key={`project-${project.id}`} project={project} />
        ))}
      </div>
    );
  }
}
