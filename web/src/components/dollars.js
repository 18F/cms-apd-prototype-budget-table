import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const formats = {
  cents: '$0,0.00',
  noCents: '$0,0'
};

export default function dollars(props) {
  return (
    <span className={`dollar ${props.className}`}>
      {numeral(props.value).format(props.hideCents ? formats.noCents : formats.cents)}
    </span>
  );
}

dollars.propTypes = {
  value: PropTypes.number.isRequired,
  hideCents: PropTypes.bool,
  className: PropTypes.string
};

dollars.defaultProps = {
  hideCents: false,
  className: ''
};
