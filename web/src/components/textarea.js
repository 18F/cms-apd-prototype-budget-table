import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

export default class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      onChange: debounce(props.onChange, 100)
    };

    this.changeHandler = (e) => {
      this.setState({ value: e.target.value });
      this.state.onChange(e.target.value);
    };
  }

  render() {
    return (
      <textarea value={this.state.value} onChange={this.changeHandler} />
    );
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  value: '',
  onChange: () => { }
};
