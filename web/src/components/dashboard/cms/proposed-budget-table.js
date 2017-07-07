import React from 'react';
import PropTypes from 'prop-types';
import Dollars from '../../dollars';

const costGroupsEqual = (cg1, cg2) => (
  (cg1.category === cg2.category) &&
  (cg1.type === cg2.type) &&
  (cg1.ffp === cg2.ffp)
);

class CostGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsHidden: true
    };

    this.toggleExpand = () => {
      this.setState({ detailsHidden: !this.state.detailsHidden });
    };
  }

  render() {
    const ffys = this.props.ffys;
    const costGroup = this.props.costGroup;

    const ffp = costGroup.ffp;
    const sfp = 1 - ffp;

    const buttonControls = `cost-group-cms-share-${costGroup.category}-${costGroup.ffp}-${costGroup.type} cost-group-state-share-${costGroup.category}-${costGroup.ffp}-${costGroup.type}`;

    return (
      <tbody className="cost group">
        <tr>
          <td>
            {costGroup.category}
            <br />
            <button aria-expanded={!this.state.detailsHidden} aria-label={`${costGroup.category} details`} aria-controls={buttonControls} onClick={this.toggleExpand}>{this.state.detailsHidden ? 'more' : 'less'}</button>
          </td>
          {ffys.map(ffy => (<td><Dollars value={costGroup[ffy] || 0} /></td>))}
          <td><Dollars value={costGroup.total} /></td>
        </tr>
        <tr className="cost group detail" hidden={this.state.detailsHidden} id={`cost-group-cms-share-${costGroup.category.replace(' ', '_')}-${costGroup.ffp}-${costGroup.type}`}>
          <td>CMS share ({Math.round(ffp * 100)}%)</td>
          {ffys.map(ffy => (<td><Dollars value={costGroup[ffy] * ffp} /></td>))}
          <td><Dollars value={costGroup.total * ffp} /></td>
        </tr>
        <tr className="cost group detail" hidden={this.state.detailsHidden} id={`cost-group-state-share-${costGroup.category.replace(' ', '_')}-${costGroup.ffp}-${costGroup.type}`}>
          <td>State share ({Math.round(sfp * 100)}%)</td>
          {ffys.map(ffy => (<td><Dollars value={costGroup[ffy] * sfp} /></td>))}
          <td><Dollars value={costGroup.total * sfp} /></td>
        </tr>
      </tbody>
    );
  }
}
CostGroup.propTypes = {
  ffys: PropTypes.arrayOf(PropTypes.number).isRequired,
  costGroup: PropTypes.shape({
    category: PropTypes.string.isRequired,
    ffp: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
};

const render = (props) => {
  const groupedCosts = [];
  const ffys = [];

  props.costs.forEach((cost) => {
    if (!ffys.includes(cost.ffy)) {
      ffys.push(cost.ffy);
    }

    const groupedCostsIndex = groupedCosts.findIndex(costGroup => costGroupsEqual(costGroup, cost));
    if (groupedCostsIndex < 0) {
      groupedCosts.push({
        category: cost.category,
        type: cost.type,
        ffp: cost.ffp,
        [cost.ffy]: cost.total,
        total: cost.total
      });
    } else {
      groupedCosts[groupedCostsIndex][cost.ffy] = cost.total;
      groupedCosts[groupedCostsIndex].total += cost.total;
    }
  });
  ffys.sort();

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Cost category</th>
          {ffys.map(ffy => (<th scope="col">FFY {ffy}</th>))}
          <th scope="col">Total</th>
        </tr>
      </thead>
      {groupedCosts.map(cost => <CostGroup costGroup={cost} ffys={ffys} />)}
    </table>
  );
};
render.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired
};

export default render;
