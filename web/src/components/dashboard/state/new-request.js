import React from 'react';
import { connect } from 'react-redux';
import Dollars from '../../dollars';

import { Requests } from '../../../actions';

function getTotalCost(costs) {
  return costs.ddiInternal +
  costs.ddiExternal +
  costs.omInternal +
  costs.omExternal +
  costs.otherInternal +
  costs.otherExternal +
  costs.otherInteragency;
}

class NewRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDollars: getTotalCost(props.costs),
      totalDDI: props.costs.ddiInternal + props.costs.ddiExternal,
      totalOM: props.costs.omInternal + props.costs.omExternal,
      totalOther: props.costs.otherInternal + props.costs.otherExternal + props.costs.interagency
    };

    this.strings = {
      byState: 'performed by state staff',
      byVendor: 'contracted by the state to vendors'
    };

    this.getChangeHandler = property => ((event) => {
      this.props.updateCost(property, Number(event.target.value));
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalDollars: getTotalCost(nextProps.costs),
      totalDDI: nextProps.costs.ddiInternal + nextProps.costs.ddiExternal,
      totalOM: nextProps.costs.omInternal + nextProps.costs.omExternal,
      totalOther: nextProps.costs.otherInternal + nextProps.costs.otherExternal + nextProps.costs.otherInteragency
    });
  }

  render() {
    return (
      <div className="state dashboard new request">
        <label htmlFor="state-dashboard-request-ddi-internal">Internal DDI costs</label>
        <input type="number" id="state-dashboard-request-ddi-internal" value={this.props.costs.ddiInternal} onChange={this.getChangeHandler('ddiInternal')} />
        <span>
          This is the cost of design, development, and implementation for work that is
          {this.strings.byState}.  This cost is covered by 90% federal financial
          participation.
        </span>

        <label htmlFor="state-dashboard-request-ddi-external">External DDI costs</label>
        <input type="number" id="state-dashboard-request-ddi-external" value={this.props.costs.ddiExternal} onChange={this.getChangeHandler('ddiExternal')} />
        <span>
          This is the cost of design, development, and implementation for work that is
          {this.strings.byVendor}. This cost is covered by 90% federal financial
          participation.
        </span>

        <label htmlFor="state-dashboard-request-om-internal">Internal O&M costs</label>
        <input type="number" id="state-dashboard-request-om-internal" value={this.props.costs.omInternal} onChange={this.getChangeHandler('omInternal')} />
        <span>
          This is the cost of operations and maintenace for work that is
          {this.strings.byState} This cost is covered by 75% federal financial participation.
        </span>

        <label htmlFor="state-dashboard-request-om-external">External O&M costs</label>
        <input type="number" id="state-dashboard-request-om-external" value={this.props.costs.omExternal} onChange={this.getChangeHandler('omExternal')} />
        <span>
          This is the cost of operations and maintenace for work that is
          {this.strings.byVendor} This cost is covered by 75% federal financial participation.
        </span>

        <label htmlFor="state-dashboard-request-other-internal">Other internal costs</label>
        <input type="number" id="state-dashboard-request-other-internal" value={this.props.costs.otherInternal} onChange={this.getChangeHandler('otherInternal')} />
        <span>
          This is the cost of other MMIS work that is {this.strings.byState} This cost is
          covered by 50% federal financial participation.
        </span>

        <label htmlFor="state-dashboard-request-other-external">Other external costs</label>
        <input type="number" id="state-dashboard-request-other-external" value={this.props.costs.otherExternal} onChange={this.getChangeHandler('otherExternal')} />
        <span>
          This is the cost of other MMIS work that is {this.strings.byVendor} This cost is
          covered by 50% federal financial participation.
        </span>

        <label htmlFor="state-dashboard-request-other-interagency">Other interagency costs</label>
        <input type="number" id="state-dashboard-request-other-interagency" value={this.props.costs.otherInteragency} onChange={this.getChangeHandler('otherInteragency')} />
        <span>
          This is the cost of other MMIS work that is interagency. This cost is
          covered by 50% federal financial participation.
        </span>

        <h1>Total request amount: <Dollars value={this.state.totalDollars} /></h1>

        <h2>Total CMS share: <Dollars value={(this.state.totalDDI * 0.9) + (this.state.totalOM * 0.75) + (this.state.totalOther * 0.5)} /></h2>
        <h2>Total State share: <Dollars value={(this.state.totalDDI * 0.1) + (this.state.totalOM * 0.25) + (this.state.totalOther * 0.5)} /></h2>

        <h3>Total DDI: <Dollars value={this.state.totalDDI} /></h3>
        <div>CMS Share: <Dollars value={this.state.totalDDI * 0.9} /></div>
        <div>State Share: <Dollars value={this.state.totalDDI * 0.1} /></div>

        <h3>Total O&M: <Dollars value={this.state.totalOM} /></h3>
        <div>CMS Share: <Dollars value={this.state.totalOM * 0.75} /></div>
        <div>State Share: <Dollars value={this.state.totalOM * 0.25} /></div>

        <h3>Total Other: <Dollars value={this.state.totalOther} /></h3>
        <div>CMS Share: <Dollars value={this.state.totalOther * 0.5} /></div>
        <div>State Share: <Dollars value={this.state.totalOther * 0.5} /></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.currentRequest,
  costs: state.currentRequest.costs
});

const mapDispatchToProps = dispatch => ({
  updateCost(which, value) {
    dispatch(Requests.updateCost(which, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
