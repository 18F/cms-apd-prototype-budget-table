import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import Dollars from '../../dollars';

class DDICategoryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category.category,
      inhouse: props.category.inhouse,
      inhouseString: '',
      ffp90: props.category.ffp90,
      state10: props.category.state10,
      ffp75: props.category.ffp75,
      state25: props.category.state25,
      total: (props.category.ffp90 + props.category.state10 + props.category.ffp75 + props.category.state25)
    };

    const change = debounce(props.onChange, 200);
    const triggerChange = () => {
      change(props.index, this.state);
    };

    this.recalculateTotal = () => {
      const total = this.state.ffp90 + this.state.state10 + this.state.ffp75 + this.state.state25;
      this.setState({ total }, triggerChange);
    };

    this.updateCategory = (e) => {
      this.setState({ category: e.target.value }, triggerChange);
    };

    this.changeInHouseOrContractor = (e) => {
      const value = e.target.value === 'in-house';
      this.setState({ inhouse: value, inhouseString: e.target.value }, triggerChange);
    };

    this.updateShare = (e) => {
      const name = e.target.name;
      const value = Number(e.target.value);

      let counter = '';
      let divisor = 1;
      let multiplier = 0;

      switch (name) {
        case 'ffp90':
          counter = 'state10';
          divisor = 0.9;
          multiplier = 0.1;
          break;

        case 'state10':
          counter = 'ffp90';
          divisor = 0.1;
          multiplier = 0.9;
          break;

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
          <select onChange={this.changeInHouseOrContractor} value={this.state.inhouseString}>
            <option disabled value="">select</option>
            <option value="in-house">in-house</option>
            <option value="contractor">contractor</option>
          </select>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.ffp90} name="ffp90" onChange={this.updateShare} />
          </span>
        </td>
        <td>
          <span className="input-with-dollar">
            <input type="number" value={this.state.state10} name="state10" onChange={this.updateShare} />
          </span>
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
        <td><Dollars value={this.state.total} /></td>
      </tr>
    );
  }
}

DDICategoryRow.propTypes = {
  index: PropTypes.number.isRequired,
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    inhouse: PropTypes.bool,
    ffp90: PropTypes.number.isRequired,
    state10: PropTypes.number.isRequired,
    ffp75: PropTypes.number.isRequired,
    state25: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func
};

DDICategoryRow.defaultProps = {
  onChange() { }
};

export default DDICategoryRow;
