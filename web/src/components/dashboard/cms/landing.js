import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const LinkToRequest = withRouter(props => (
  <div><Link to={`${props.match.path}review/${props.request.id}`}>{props.request.name}</Link></div>
));

LinkToRequest.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

function landing(props) {
  let linksToExistingRequests = [];
  if (!props.existingRequests) {
    // fetch 'em'
  } else {
    linksToExistingRequests = props.existingRequests.map(request => (
      <LinkToRequest key={`link-to-request-${request.id}`} request={request} />
    ));
  }

  return (
    <div className="cms dashboard">
      {linksToExistingRequests}
    </div>
  );
}

landing.propTypes = {
  existingRequests: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired
};

function mapStateToProps(state) {
  return {
    existingRequests: state.openRequests
  };
}

export default connect(mapStateToProps, null)(landing);
