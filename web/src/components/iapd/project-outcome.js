import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

class Outcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.outcome.title,
      metrics: props.outcome.metrics,
      change: debounce(props.onChange)
    };

    this.updateTitle = (e) => {
      this.setState({ title: e.target.value });
      this.state.change(this.props.index, e.target.value, this.state.metrics);
    };
    this.updateMetrics = (e) => {
      this.setState({ metrics: e.target.value });
      this.state.change(this.props.index, this.state.title, e.target.value);
    };
  }

  render() {
    return (
      <div className="outcome">
        <p>
          Outcome {this.props.index + 1} <input type="text" value={this.state.title} onChange={this.updateTitle} />
        </p>
        <p>
          Success metrics: <input type="text" value={this.state.metrics} onChange={this.updateMetrics} />
        </p>
      </div>
    );
  }
}

Outcome.propTypes = {
  index: PropTypes.number.isRequired,
  outcome: PropTypes.shape({
    title: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired
  }).isRequired,
  onChange: PropTypes.func
};

Outcome.defaultProps = {
  onChange: () => { }
};

export default Outcome;
