import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from '../../collapsible';
import BudgetTable from './budget-table';
import { IAPD as IAPDActions } from '../../../actions';

class ProposedBudget extends React.Component {
  constructor(props) {
    super(props);

    this.addBudgetFFY = (e) => {
      e.preventDefault();
      props.addBudgetFFY();
    };
  }

  render() {
    return (
      <Section name="Proposed budget">
        <h3>Detailed budget tables</h3>

        <p>
          Please complete the following tables for each relevant Federal
          Fiscal Year. These will provide a more detailed view of how
          you&rsquo;ll spend your award.  Within each table, replace the
          Category labels (leftmost column) with descriptions of each
          category.  For example, in the Design, Development, and
          implementation table, you might replace &ldquo;Category I&rdquo;
          with &ldquo;Project planning and kickoff.&rdquo;
        </p>

        {this.props.budgets.map((b, i) => <BudgetTable key={b.id} index={i} budget={b} />)}

        <a href="" onClick={this.addBudgetFFY}>Add another fiscal year +</a>

        ...MDBT goes here...
      </Section>
    );
  }
}

ProposedBudget.propTypes = {
  budgets: PropTypes.arrayOf(PropTypes.shape({
    ffy: PropTypes.number.isRequired
  })).isRequired,
  addBudgetFFY: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  budgets: state.currentRequest.budget
});

const mapDispatchToProps = dispatch => ({
  addBudgetFFY() {
    dispatch(IAPDActions.addBudgetFFY());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProposedBudget);
