import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dollars from '../../dollars';

function sum(objects, property) {
  return objects.reduce((collector, o) => collector + o[property], 0);
}

function getDDIRows(budgetYears, inHouse = true) {
  const rowData = [];

  const totalRow = {
    id: 'total',
    ffy: `TOTAL for FFY ${budgetYears[0].ffy}-${budgetYears[budgetYears.length - 1].ffy}`,
    ffp90: 0,
    state10: 0,
    ffp75: 0,
    state25: 0,
    ffp50: 0,
    state50: 0,
    ffpTotal: 0,
    stateTotal: 0
  };

  for (const year of budgetYears) {
    const row = {
      id: year.id,
      ffy: year.ffy
    };
    rowData.push(row);

    const categories = year.ddi.categories.filter(c => c.inhouse === inHouse);
    row.ffp90 = sum(categories, 'ffp90');
    row.state10 = sum(categories, 'state10');
    row.ffp75 = sum(categories, 'ffp75');
    row.state25 = sum(categories, 'state25');
    row.ffp50 = 0;
    row.state50 = 0;
    row.ffpTotal = row.ffp90 + row.ffp75 + row.ffp50;
    row.stateTotal = row.state10 + row.state25 + row.state50;

    totalRow.ffp90 += row.ffp90;
    totalRow.state10 += row.state10;
    totalRow.ffp75 += row.ffp75;
    totalRow.state25 += row.state25;
    totalRow.ffp50 += row.ffp50;
    totalRow.state50 += row.state50;
    totalRow.ffpTotal += row.ffpTotal;
    totalRow.stateTotal += row.stateTotal;
  }

  rowData.push(totalRow);

  return rowData;
}

function getOMRows(budgetYears) {
  const rowData = [];

  const totalRow = {
    id: 'total',
    ffy: `TOTAL for FFY ${budgetYears[0].ffy}-${budgetYears[budgetYears.length - 1].ffy}`,
    ffp75a: 0,
    state25a: 0,
    ffp75b: 0,
    state25b: 0,
    ffpTotal: 0,
    stateTotal: 0
  };

  for (const year of budgetYears) {
    const row = {
      id: year.id,
      ffy: year.ffy
    };
    rowData.push(row);

    const categoriesA = year.om.categories.filter(c => c.inhouse === true);
    const categoriesB = year.om.categories.filter(c => c.inhouse === false);

    row.ffp75a = sum(categoriesA, 'ffp75');
    row.state25a = sum(categoriesA, 'state25');
    row.ffp75b = sum(categoriesB, 'ffp75');
    row.state25b = sum(categoriesB, 'state25');
    row.ffpTotal = row.ffp75a + row.ffp75b;
    row.stateTotal = row.state25a + row.state25b;

    totalRow.ffp75a += row.ffp75a;
    totalRow.state25a += row.state25a;
    totalRow.ffp75b += row.ffp75b;
    totalRow.state25b += row.state25b;
    totalRow.ffpTotal += row.ffpTotal;
    totalRow.stateTotal += row.stateTotal;
  }

  rowData.push(totalRow);

  return rowData;
}

function getMechRows(budgetYears) {
  const rowData = [];

  const totalRow = {
    id: 'total',
    ffy: `TOTAL for FFY ${budgetYears[0].ffy}-${budgetYears[budgetYears.length - 1].ffy}`,
    ffp50a: 0,
    state50a: 0,
    ffp50b: 0,
    state50b: 0,
    ffp50c: 0,
    state50c: 0,
    ffpTotal: 0,
    stateTotal: 0
  };

  for (const year of budgetYears) {
    const row = {
      id: year.id,
      ffy: year.ffy
    };
    rowData.push(row);

    const categoriesA = year.mechanizedSystems.categories.filter(c => c.inhouse === true);
    const categoriesB = year.mechanizedSystems.categories.filter(c => c.inhouse === false);
    const categoriesC = year.mechanizedSystems.categories.filter(c => c.interagency === true);

    row.ffp50a = sum(categoriesA, 'ffp50');
    row.state50a = sum(categoriesA, 'state50');
    row.ffp50b = sum(categoriesB, 'ffp50');
    row.state50b = sum(categoriesB, 'state50');
    row.ffp50c = sum(categoriesC, 'ffp50');
    row.state50c = sum(categoriesC, 'state50');
    row.ffpTotal = row.ffp50a + row.ffp50b + row.ffp50c;
    row.stateTotal = row.state50a + row.state50b + row.state50c;

    totalRow.ffp50a += row.ffp50a;
    totalRow.state50a += row.state50a;
    totalRow.ffp50b += row.ffp50b;
    totalRow.state50b += row.state50b;
    totalRow.ffp50c += row.ffp50c;
    totalRow.state50c += row.state50c;
    totalRow.ffpTotal += row.ffpTotal;
    totalRow.stateTotal += row.stateTotal;
  }

  rowData.push(totalRow);

  return rowData;
}

const MDBT = (props) => {
  const ddiARows = getDDIRows(props.budget, true);
  const ddiBRows = getDDIRows(props.budget, false);
  const omRows = getOMRows(props.budget);
  const mechRows = getMechRows(props.budget);

  return (
    <div className="mdbt">

      <div className="strong">
        MMIS Design, Development, or Implementation: In-house activities
      </div>
      <table>
        <thead>
          <tr>
            <th>Approved through DDI APD</th>
            <th>MMIS CMS Share (90% FFP)</th>
            <th>State share (10%)</th>
            <th>MMIS CMS Share (75% FFP)</th>
            <th>State share (25%)</th>
            <th>MMIS CMS Share (50% FFP)</th>
            <th>State share (50%)</th>
            <th rowSpan="2"><span className="strong">MMIS FUNDING FFP Total 2A</span></th>
            <th rowSpan="2">State Share Total</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th>2A</th>
            <th>--</th>
            <th>2A</th>
            <th>--</th>
            <th>2A</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody>
          {ddiARows.map(row => (
            <tr key={row.id}>
              <td>FFY {row.ffy}</td>
              <td><Dollars value={row.ffp90} /></td>
              <td><Dollars value={row.state10} /></td>
              <td><Dollars value={row.ffp75} /></td>
              <td><Dollars value={row.state25} /></td>
              <td><Dollars value={row.ffp50} /></td>
              <td><Dollars value={row.state50} /></td>
              <td><Dollars value={row.ffpTotal} /></td>
              <td><Dollars value={row.stateTotal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="strong">
        MMIS Design, Development, or Implementation: Contracted activities
      </div>
      <table>
        <thead>
          <tr>
            <th>Approved through DDI APD</th>
            <th>MMIS CMS Share (90% FFP)</th>
            <th>State share (10%)</th>
            <th>MMIS CMS Share (75% FFP)</th>
            <th>State share (25%)</th>
            <th>MMIS CMS Share (50% FFP)</th>
            <th>State share (50%)</th>
            <th rowSpan="2"><span className="strong">MMIS FUNDING FFP Total 2B</span></th>
            <th rowSpan="2">State Share Total</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th>2B</th>
            <th>--</th>
            <th>2B</th>
            <th>--</th>
            <th>2B</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody>
          {ddiBRows.map(row => (
            <tr key={row.id}>
              <td>FFY {row.ffy}</td>
              <td><Dollars value={row.ffp90} /></td>
              <td><Dollars value={row.state10} /></td>
              <td><Dollars value={row.ffp75} /></td>
              <td><Dollars value={row.state25} /></td>
              <td><Dollars value={row.ffp50} /></td>
              <td><Dollars value={row.state50} /></td>
              <td><Dollars value={row.ffpTotal} /></td>
              <td><Dollars value={row.stateTotal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="strong">
        4A: Operation Approved MMIS: In-house activities<br />
        4B: Operation Approved MMIS: Contracted activities
      </div>
      <table>
        <thead>
          <tr>
            <th>M&amp;O</th>
            <th>MMIS CMS Share (75% FFP)</th>
            <th>State share (25%)</th>
            <th>MMIS CMS Share (75% FFP)</th>
            <th>State share (25%)</th>
            <th rowSpan="2"><span className="strong">MMIS ENHANCED FUNDING 75% FFP Total</span></th>
            <th rowSpan="2">State Share Total</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th>4A</th>
            <th>--</th>
            <th>4B</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody>
          {omRows.map(row => (
            <tr key={row.id}>
              <td>FFY {row.ffy}</td>
              <td><Dollars value={row.ffp75a} /></td>
              <td><Dollars value={row.state25a} /></td>
              <td><Dollars value={row.ffp75b} /></td>
              <td><Dollars value={row.state25b} /></td>
              <td><Dollars value={row.ffpTotal} /></td>
              <td><Dollars value={row.stateTotal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="strong">
        5A: Mechanized Systems, Not Approved Under MMIS Procedures: In-house activities<br />
        5B: Mechanized Systems, Not Approved Under MMIS Procedures: Contracted activities<br />
        5C: Mechanized Systems, Not Approved Under MMIS Procedures: Interagency
      </div>
      <table>
        <thead>
          <tr>
            <th>M&amp;O</th>
            <th>MMIS CMS Share (50% FFP)</th>
            <th>State share (50%)</th>
            <th>MMIS CMS Share (50% FFP)</th>
            <th>State share (50%)</th>
            <th>MMIS CMS Share (50% FFP)</th>
            <th>State share (50%)</th>
            <th rowSpan="2"><span className="strong">MMIS ENHANCED FUNDING 50% FFP Total</span></th>
            <th rowSpan="2">State Share Total</th>
          </tr>
          <tr>
            <th>&nbsp;</th>
            <th>5A</th>
            <th>--</th>
            <th>5B</th>
            <th>--</th>
            <th>5C</th>
            <th>--</th>
          </tr>
        </thead>
        <tbody>
          {mechRows.map(row => (
            <tr key={row.id}>
              <td>FFY {row.ffy}</td>
              <td><Dollars value={row.ffp50a} /></td>
              <td><Dollars value={row.state50a} /></td>
              <td><Dollars value={row.ffp50b} /></td>
              <td><Dollars value={row.state50b} /></td>
              <td><Dollars value={row.ffp50c} /></td>
              <td><Dollars value={row.state50c} /></td>
              <td><Dollars value={row.ffpTotal} /></td>
              <td><Dollars value={row.stateTotal} /></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

MDBT.propTypes = {
  budget: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired
};

const mapStateToProps = state => ({
  budget: state.currentRequest.budget
});

export default connect(mapStateToProps, null)(MDBT);
