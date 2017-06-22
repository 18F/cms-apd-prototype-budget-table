import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import LineWithText from '../../line-with-text';

const NewRequestButton = withRouter((props) => {
  const clickHandler = () => {
    props.history.push('/dashboard/state/request');
  };

  return (
    <button onClick={clickHandler} className="usa-button">Start a new financial request</button>
  );
});

function LinkToRequest(props) {
  return (
    // For now, don't actually go anywhere...
    // <div><Link to={`/dashboard/state/request/${props.request.id}`}>{props.request.name}</Link></div>
    <div><Link to={'/dashboard/state'}>{props.request.name}</Link></div>
  );
}

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
    <div className="state dashboard">
      <NewRequestButton />
      <LineWithText>or</LineWithText>
      Continuing an existing one:
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
