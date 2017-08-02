import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dollars from '../../dollars';
import { IAPD as IAPDActions } from '../../../actions';

import DDICategoryRow from './ddi-category-row';
import OMCategoryRow from './om-category-row';
import MechCategoryRow from './mech-category-row';

class BudgetTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ffy: props.budget.ffy
    };

    this.updateFFY = (e) => {
      this.setState({ ffy: Number(e.target.value) });
      this.props.updateBudgetFFY(this.props.index, Number(e.target.value));
    };

    this.updateDDICategory = (categoryIndex, newValues) => {
      this.props.updateDDICategory(this.props.index, categoryIndex, newValues);
    };

    this.addDDICategory = (e) => {
      e.preventDefault();
      this.props.addDDICategory(this.props.index);
    };

    this.updateOMCategory = (categoryIndex, newValues) => {
      this.props.updateOMCategory(this.props.index, categoryIndex, newValues);
    };

    this.addOMCategory = (e) => {
      e.preventDefault();
      this.props.addOMCategory(this.props.index);
    };

    this.updateMechCategory = (categoryIndex, newValues) => {
      this.props.updateMechanizedSystemsCategory(this.props.index, categoryIndex, newValues);
    };

    this.addMechCategory = (e) => {
      e.preventDefault();
      this.props.addMechanizedSystemsCategory(this.props.index);
    };
  }

  render() {
    return (
      <div className="budget-table">
        <input type="number" placeholder="federal fiscal year" key="ffy" value={this.state.ffy} onChange={this.updateFFY} />

        <div className="pull right">FFY {this.state.ffy > 2000 ? this.state.ffy : '20XX'}</div>

        <table>
          <thead>
            <tr>
              <th colSpan="7">Design, development, and implementation activities (2A, 2B)</th>
            </tr>
            <tr>
              <th>State cost category</th>
              <th>In-house or contract?</th>
              <th>90% federal share</th>
              <th>10% state share</th>
              <th>75% federal share</th>
              <th>25% state share</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.budget.ddi.categories.map((c, i) => (<DDICategoryRow key={c.id} index={i} category={c} onChange={this.updateDDICategory} />))}
            <tr>
              <td colSpan="7">
                <a href="" onClick={this.addDDICategory}>Add a new row +</a>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Grand total</th>
              <th>&nbsp;</th>
              <th><Dollars value={this.props.budget.ddi.ffp90} /></th>
              <th><Dollars value={this.props.budget.ddi.state10} /></th>
              <th><Dollars value={this.props.budget.ddi.ffp75} /></th>
              <th><Dollars value={this.props.budget.ddi.state25} /></th>
              <th><Dollars value={this.props.budget.ddi.total} /></th>
            </tr>
          </thead>
        </table>

        <table>
          <thead>
            <tr>
              <th colSpan="7">Maintenance and operations activities (4A, 4B)</th>
            </tr>
            <tr>
              <th>State cost category</th>
              <th>In-house or contract?</th>
              <th>75% federal share</th>
              <th>25% state share</th>
              <th>50% federal share</th>
              <th>50% state share</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.budget.om.categories.map((c, i) => (<OMCategoryRow key={c.id} index={i} category={c} onChange={this.updateOMCategory} />))}
            <tr>
              <td colSpan="7">
                <a href="" onClick={this.addOMCategory}>Add a new row +</a>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Grand total</th>
              <th>&nbsp;</th>
              <th><Dollars value={this.props.budget.om.ffp75} /></th>
              <th><Dollars value={this.props.budget.om.state25} /></th>
              <th><Dollars value={this.props.budget.om.ffp50} /></th>
              <th><Dollars value={this.props.budget.om.state50} /></th>
              <th><Dollars value={this.props.budget.om.total} /></th>
            </tr>
          </thead>
        </table>

        <table>
          <thead>
            <tr>
              <th colSpan="5">Mechanized systems (5A, 5B, 5C)</th>
            </tr>
            <tr>
              <th>State cost category</th>
              <th>In-house, contract, or interagency?</th>
              <th>50% federal share</th>
              <th>50% state share</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.budget.mechanizedSystems.categories.map((c, i) => (<MechCategoryRow key={c.id} index={i} category={c} onChange={this.updateMechCategory} />))}
            <tr>
              <td colSpan="5">
                <a href="" onClick={this.addMechCategory}>Add a new row +</a>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Grand total</th>
              <th>&nbsp;</th>
              <th><Dollars value={this.props.budget.mechanizedSystems.ffp50} /></th>
              <th><Dollars value={this.props.budget.mechanizedSystems.state50} /></th>
              <th><Dollars value={this.props.budget.mechanizedSystems.total} /></th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

BudgetTable.propTypes = {
  index: PropTypes.number.isRequired,
  budget: PropTypes.shape({
    ffy: PropTypes.number.isRequired,
    ddi: PropTypes.shape({
      ffp90: PropTypes.number.isRequired,
      state10: PropTypes.number.isRequired,
      ffp75: PropTypes.number.isRequired,
      state25: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        inhouse: PropTypes.bool,
        ffp90: PropTypes.number.isRequired,
        state10: PropTypes.number.isRequired,
        ffp75: PropTypes.number.isRequired,
        state25: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      }))
    }).isRequired,

    om: PropTypes.shape({
      ffp75: PropTypes.number.isRequired,
      state25: PropTypes.number.isRequired,
      ffp50: PropTypes.number.isRequired,
      state50: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        inhouse: PropTypes.bool,
        ffp75: PropTypes.number.isRequired,
        state25: PropTypes.number.isRequired,
        ffp50: PropTypes.number.isRequired,
        state50: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      }))
    }).isRequired,

    mechanizedSystems: PropTypes.shape({
      ffp50: PropTypes.number.isRequired,
      state50: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        inhouse: PropTypes.bool,
        ffp50: PropTypes.number.isRequired,
        state50: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
      }))
    }).isRequired
  }).isRequired,
  updateBudgetFFY: PropTypes.func.isRequired,
  updateDDICategory: PropTypes.func.isRequired,
  addDDICategory: PropTypes.func.isRequired,
  updateOMCategory: PropTypes.func.isRequired,
  addOMCategory: PropTypes.func.isRequired,
  updateMechanizedSystemsCategory: PropTypes.func.isRequired,
  addMechanizedSystemsCategory: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateBudgetFFY(budgetIndex, newFFY) {
    dispatch(IAPDActions.updateBudgetFFY(budgetIndex, newFFY));
  },

  updateDDICategory(budgetIndex, categoryIndex, newValues) {
    dispatch(IAPDActions.updateBudgetDDICategory(budgetIndex, categoryIndex, newValues));
  },
  addDDICategory(budgetIndex) {
    dispatch(IAPDActions.addBudgetDDICategory(budgetIndex));
  },

  updateOMCategory(budgetIndex, categoryIndex, newValues) {
    dispatch(IAPDActions.updateBudgetOMCategory(budgetIndex, categoryIndex, newValues));
  },
  addOMCategory(budgetIndex) {
    dispatch(IAPDActions.addBudgetOMCategory(budgetIndex));
  },

  updateMechanizedSystemsCategory(budgetIndex, categoryIndex, newValues) {
    dispatch(IAPDActions.updateBudgetMechanizedSystemsCategory(budgetIndex, categoryIndex, newValues));
  },
  addMechanizedSystemsCategory(budgetIndex) {
    dispatch(IAPDActions.addBudgetMechanizedSystemsCategory(budgetIndex));
  }
});

export default connect(null, mapDispatchToProps)(BudgetTable);
