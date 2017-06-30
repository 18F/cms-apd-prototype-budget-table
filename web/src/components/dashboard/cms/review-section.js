import React from 'react';
import PropTypes from 'prop-types';

function crlfToBreaks(string) {
  const keyPrefix = Math.random();
  // We'll accept any performance hit from using the array index as part of the
  // key, since that's by far the best way to ensure uniqueness.
  return (string.split('\n').map((stringLine, i) => (<p key={`string-bit-${keyPrefix}-${i}`}>{stringLine}</p>))); // eslint-disable-line react/no-array-index-key
}

export default class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: `section_${Math.random()}`,
      expanded: !props.collapsed
    };

    this.getChildren = () => {
      if (typeof props.children === 'string') {
        return crlfToBreaks(props.children);
      }
      return props.children;
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
            {this.getChildren()}
          </div>
        </div>
      </div>
    );
  }
}
Section.propTypes = {
  name: PropTypes.string.isRequired,
  summary: PropTypes.string,
  children: PropTypes.node,
  collapsed: PropTypes.bool
};
Section.defaultProps = {
  summary: null,
  children: null,
  collapsed: false
};
