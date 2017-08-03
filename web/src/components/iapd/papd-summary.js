import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from '../collapsible';
import TextArea from '../textarea';
import { IAPD as IAPDActions } from '../../actions';

class PAPDSummary extends React.Component {
  constructor(props) {
    super(props);

    this.updateOutcomes = (value) => {
      this.props.updatePAPDSummary({
        outcomes: value,
        expenditureStatus: this.props.info.expenditureStatus
      });
    };

    this.updateExpenditureStatus = (value) => {
      this.props.updatePAPDSummary({
        outcomes: this.props.info.outcomes,
        expenditureStatus: value
      });
    };
  }

  render() {
    return (
      <Section name="PAPD summary of activites">
        <p>
          The Planning Advance Planning Document (PAPD) helps you and your
          team create a project roadmap. Here, you&rsquo;ll share what you
          learned by completing the PAPD.
        </p>

        <p>
          In this section, you&rsquo;ll provide a detailed description of the
          nature and scope of system work and the methods you&rsquo;ll use to
          execute the work.  In general, this description should match the
          major task categories on your project schedule or work plan.  Some
          examples of activities include identifying risks and creating a
          preliminary mitigation strategy, documenting the as-is and to-be
          environments, and developing proposal evaluation criteria for
          procurement proposals.
        </p>

        <h3>PAPD learning outcomes</h3>
        <p>
          In 200 words of fewer, describe what you learned from the PAPD and
          how this changed your plan.
          <TextArea value={this.props.info.outcomes} name="outcomes" onChange={this.updateOutcomes} />
        </p>

        <h3>PAPD expenditure status</h3>
        <p>
          Write a summary (500 words or fewer) of the current status of the
          activities you included in your Planning Advanced Planning
          Document (PAPD).  If possible, provide completion estimates for
          each activity (&ldquo;This activity is already 75% complete,
          according to our outline.&rdquo;). Please also note the status
          of CMS-approved expenditures included in the PAPD.
          <TextArea value={this.props.info.expenditureStatus} name="expenditureStatus" onChange={this.updateExpenditureStatus} />
        </p>
      </Section>
    );
  }
}

PAPDSummary.propTypes = {
  info: PropTypes.shape({
    outcomes: PropTypes.string.isRequired,
    expenditureStatus: PropTypes.string.isRequired
  }).isRequired,
  updatePAPDSummary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.currentRequest.papdSummary
});

const mapDispatchToProps = dispatch => ({
  updatePAPDSummary(newPAPDSummary) {
    dispatch(IAPDActions.updatePAPDSummary(newPAPDSummary));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PAPDSummary);
