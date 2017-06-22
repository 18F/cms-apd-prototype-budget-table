import React from 'react';
import PropTypes from 'prop-types';

export default function LineWithText(props) {
  const outerStyle = {
    textAlign: 'center',
    borderBottom: `1px solid ${props.color}`,
    height: '0.7em',
    margin: '10px 0'
  };
  const innerStyle = {
    backgroundColor: props.background,
    display: 'inline-block',
    padding: '0 20px',
    color: props.color
  };
  return (
    <div style={outerStyle}><span style={innerStyle}>{props.children}</span></div>
  );
}
LineWithText.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.string
};
LineWithText.defaultProps = {
  children: '',
  color: 'black',
  background: 'white'
};
