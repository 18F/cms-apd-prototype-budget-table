import React from 'react';
import PropTypes from 'prop-types';
import { states, projects } from './data';

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

const ProjectElement = (props) => {
  const project = props.project;
  return (
    <div>{project.name}</div>
  );
};
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
      <div>
        <label htmlFor="search_name">Project name</label>
        <input id="search_name" type="text" onChange={this.onChangeName} value={this.state.search.name} />

        <label htmlFor="search_state">State</label>
        <input id="search_state" type="text" onChange={this.onChangeState} value={this.state.search.state} />

        <label htmlFor="search_vendors">Project vendor</label>
        <input id="search_vendors" type="text" onChange={this.onChangeVendors} value={this.state.search.vendors} />

        <hr />

        {this.state.projects.map(project => (
          <ProjectElement key={`project-${project.id}`} project={project} />
        ))}
      </div>
    );
  }
}
