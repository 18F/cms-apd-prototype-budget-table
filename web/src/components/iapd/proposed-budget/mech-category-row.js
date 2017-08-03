import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import Dollars from '../../dollars';

class MechCategoryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category.category,
      inhouse: props.category.inhouse,
      inhouseString: '',
      ffp50: props.category.ffp50,
      state50: props.category.state50,
      total: (props.category.ffp50 + props.category.state50)
    };

    const change = debounce(props.onChange, 200);
    const triggerChange = () => {
      change(props.index, this.state);
    };

    this.recalculateTotal = () => {
      const total = this.state.ffp50 + this.state.state50;
      this.setState({ total }, triggerChange);
    };

    this.updateCategory = (e) => {
      this.setState({ category: e.target.value }, triggerChange);
    };

    this.changeInHouseOrContractor = (e) => {
      let inhouse = e.target.value === 'in-house';
      let interagency = e.target.value === 'interagency';

      if (inhouse) {
        interagency = null;
      } else if (interagency) {
        inhouse = null;
      }

      this.setState({ inhouse, interagency, inhouseString: e.target.value }, triggerChange);
    };

    this.updateShare = (e) => {
      const name = e.target.name;
      const value = Number(e.target.value);

      let counter = '';
      let divisor = 1;
      let multiplier = 0;

      switch (name) {
        case 'ffp50':
          counter = 'state50';
          divisor = 0.5;
          multiplier = 0.5;
          break;

        case 'state50':
          counter = 'ffp50';
          divisor = 0.5;
          multiplier = 0.5;
          break;

        default:
          break;
      }

      this.setState({ [name]: value, [counter]: Math.round((value / divisor) * multiplier * 100) / 100 }, this.recalculateTotal);
    };
  }

  render() {
    return (
      <tr>
        <td><input type="text" className="category" value={this.state.category} onChange={this.updateCategory} /></td>
        <td>
          <select onChange={this.changeInHouseOrContractor} value={this.state.inhouseString}>
            <option disabled value="">select</option>
            <option value="in-house">in-house</option>
            <option value="contractor">contractor</option>
            <option value="interagency">interagency</option>
          </select>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.ffp50} name="ffp50" onChange={this.updateShare} />
          </span>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.state50} name="state50" onChange={this.updateShare} />
          </span>
        </td>
        <td><Dollars value={this.state.total} /></td>
      </tr>
    );
  }
}

MechCategoryRow.propTypes = {
  index: PropTypes.number.isRequired,
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    inhouse: PropTypes.bool,
    ffp50: PropTypes.number.isRequired,
    state50: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func
};

MechCategoryRow.defaultProps = {
  onChange() { }
};

export default MechCategoryRow;
