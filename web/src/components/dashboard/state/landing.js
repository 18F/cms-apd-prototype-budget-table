import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Requests } from '../../../actions';

const landing = withRouter((props) => {
  const clickHandler = () => {
    props.startNewIAPD();
    props.history.push('/dashboard/state/iapd');
  };

  return (
    <div className="state dashboard">
      <button onClick={clickHandler} className="usa-button">Start a new IAPD</button>
    </div>
  );
});

function mapDispatchToProps(dispatch) {
  return {
    startNewIAPD() {
      dispatch(Requests.startNewRequest());
    }
  };
}

export default connect(null, mapDispatchToProps)(landing);
