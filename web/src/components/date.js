import React from 'react';
import PropTypes from 'prop-types';

export default function date(props) {
  const d = new Date(props.value);
  const dateString = `${d.getUTCMonth() + 1}/${d.getUTCDate()}/${d.getUTCFullYear()}`;

  return (
    <span className={`date ${props.className}`}>{dateString}</span>
  );
}

date.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string
};

date.defaultProps = {
  value: Date.now(),
  className: ''
};
