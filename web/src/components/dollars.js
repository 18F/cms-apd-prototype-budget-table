import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

export default function dollars(props) {
  return (
    <span className={`dollar ${props.className}`}>
      {numeral(props.value).format('$0,0.00')}
    </span>
  );
}

dollars.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string
};

dollars.defaultProps = {
  className: ''
};
