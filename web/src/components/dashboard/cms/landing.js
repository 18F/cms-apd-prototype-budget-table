import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Requests } from '../../../actions';

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
  if (!props.openRequests) {
    // fetch 'em'
    props.getOpenRequests();
    linksToExistingRequests = (<span>Loading open requests...</span>);
  } else {
    linksToExistingRequests = props.openRequests.map(request => (
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
  openRequests: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  getOpenRequests: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    openRequests: state.openRequests
  };
}

function mapDispatchToState(dispatch) {
  return {
    getOpenRequests() {
      dispatch(Requests.getOpenRequests());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToState)(landing);
