import PropTypes from 'prop-types';

export const Submitter = {
  propTypes: {
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string
  },
  defaultProps: {
    email: '',
    phone: ''
  }
};

export const Request = {
  propTypes: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    submitters: PropTypes.arrayOf(Submitter).isRequired,
    prose: PropTypes.shape({
      executiveSummary: PropTypes.string.isRequired,
      statementOfOutcomes: PropTypes.string.isRequired
    }).isRequired,
    mdbt: PropTypes.shape({
      development: PropTypes.shape({
        internal: PropTypes.number.isRequired,
        external: PropTypes.number.isRequired
      }),
      operations: PropTypes.shape({
        internal: PropTypes.number.isRequired,
        external: PropTypes.number.isRequired
      }),
      other: PropTypes.shape({
        internal: PropTypes.number.isRequired,
        external: PropTypes.number.isRequired,
        interagency: PropTypes.number.isRequired
      })
    }).isRequired
  },
  defaultProps: {
    name: ''
  }
};

export default {
  Submitter,
  Request
};
