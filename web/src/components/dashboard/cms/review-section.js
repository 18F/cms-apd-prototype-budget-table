import React from 'react';
import PropTypes from 'prop-types';

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: `section_${Math.random()}`,
      expanded: true
    };

    this.toggleExpand = () => {
      this.setState({ expanded: !this.state.expanded });
    };
  }

  render() {
    return (
      <div className="section">
        <button aria-expanded={this.state.expanded} aria-controls={this.state.id} aria-label={this.props.name} onClick={this.toggleExpand}>
          {this.state.expanded ? '-' : '+'}
        </button>
        <h2>{this.props.name}</h2>
        <div className="content" id={this.state.id} hidden={!this.state.expanded}>
          {this.props.summary ? (<h3>{this.props.summary}</h3>) : null }
          <div className="children">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
Section.propTypes = {
  name: PropTypes.string.isRequired,
  summary: PropTypes.string,
  children: PropTypes.element
};
Section.defaultProps = {
  summary: null,
  children: null
};
