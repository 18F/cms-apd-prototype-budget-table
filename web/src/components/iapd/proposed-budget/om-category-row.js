import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import Dollars from '../../dollars';

class OMCategoryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category.category,
      inhouse: props.category.inhouse,
      ffp75: props.category.ffp75,
      state25: props.category.state25,
      ffp50: props.category.ffp50,
      state50: props.category.state50,
      total: (props.category.ffp75 + props.category.state25 + props.category.ffp50 + props.category.state50)
    };

    const change = debounce(props.onChange, 200);
    const triggerChange = () => {
      change(props.index, this.state);
    };

    this.recalculateTotal = () => {
      const total = this.state.ffp75 + this.state.state25 + this.state.ffp50 + this.state.state50;
      this.setState({ total }, triggerChange);
    };

    this.updateCategory = (e) => {
      this.setState({ category: e.target.value }, triggerChange);
    };

    this.changeInHouseOrContractor = (e) => {
      const value = e.target.value === 'in-house';
      this.setState({ inhouse: value }, triggerChange);
    };

    this.updateShare = (e) => {
      const name = e.target.name;
      const value = Number(e.target.value);

      let counter = '';
      let divisor = 1;
      let multiplier = 0;

      switch (name) {
        case 'ffp75':
          counter = 'state25';
          divisor = 0.75;
          multiplier = 0.25;
          break;

        case 'state25':
          counter = 'ffp75';
          divisor = 0.25;
          multiplier = 0.75;
          break;

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
        <td><input value={this.state.category} onChange={this.updateCategory} /></td>
        <td>
          <select onChange={this.changeInHouseOrContractor}>
            <option>select</option>
            <option>in-house</option>
            <option>contractor</option>
          </select>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.ffp75} name="ffp75" onChange={this.updateShare} />
          </span>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.state25} name="state25" onChange={this.updateShare} />
          </span>
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

OMCategoryRow.propTypes = {
  index: PropTypes.number.isRequired,
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    inhouse: PropTypes.bool,
    ffp75: PropTypes.number.isRequired,
    state25: PropTypes.number.isRequired,
    ffp50: PropTypes.number.isRequired,
    state50: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func
};

OMCategoryRow.defaultProps = {
  onChange() { }
};

export default OMCategoryRow;
