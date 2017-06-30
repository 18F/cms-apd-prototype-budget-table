import React from 'react';
import PropTypes from 'prop-types';
import Dollars from '../../dollars';

const costGroupsEqual = (cg1, cg2) => (
  (cg1.category === cg2.category) &&
  (cg1.type === cg2.type) &&
  (cg1.ffp === cg2.ffp)
);

const getCostGroupRow = (costGroup, ffys) => (
  <tr>
    <td>{costGroup.category}</td>
    {ffys.map(ffy => (<td><Dollars value={costGroup[ffy]} /></td>))}
    <td><Dollars value={costGroup.total} /></td>
  </tr>
);

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

  console.log(groupedCosts);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Cost category</th>
          {ffys.map(ffy => (<th scope="col">FFY {ffy}</th>))}
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {groupedCosts.map(cost => getCostGroupRow(cost, ffys))}
      </tbody>
    </table>
  );
};
render.propTypes = {
  costs: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired
};

export default render;
