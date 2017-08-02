import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: !props.collapsed
    };

    this.toggleExpand = () => {
      this.setState({ expanded: !this.state.expanded });
    };
  }

  render() {
    return (
      <div className={`collapsible ${this.state.expanded ? 'expanded' : 'collapsed'} ${this.props.className}`}>
        <button aria-expanded={this.state.expanded} aria-controls={this.state.id} aria-label={this.props.name} onClick={this.toggleExpand}>
          <span>
            {this.state.expanded ? '-' : '+'}
          </span>
        </button>
        <h2>{this.props.name}</h2>
        <div className="content" id={this.state.id} hidden={!this.state.expanded}>
          <div className="children">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Collapsible.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  className: PropTypes.string
};

Collapsible.defaultProps = {
  children: null,
  collapsed: false,
  className: ''
};

export default Collapsible;
