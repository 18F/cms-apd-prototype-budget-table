import React from 'react';

export default class BudgetTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      '2017': {
        stateResources: 0,
        privateResources: 0
      },
      '2018': {
        stateResources: 0,
        privateResources: 0
      },
      '2019': {
        stateResources: 0,
        privateResources: 0
      },
      stateResources: {
        total: 0,
        federalShare: 0,
        stateShare: 0
      },
      privateResources: {
        total: 0,
        federalShare: 0,
        stateShare: 0
      }
    };

    this.computeTotals = this.computeTotals.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.dollars = this.dollars.bind(this);
  }

  computeTotals() {
    const newState = {
      stateResources: {
        total: this.state['2017'].stateResources + this.state['2018'].stateResources + this.state['2019'].stateResources
      },
      privateResources: {
        total: this.state['2017'].privateResources + this.state['2018'].privateResources + this.state['2019'].privateResources
      }
    };
    this.setState(newState);
  }

  updateValue(fy, resource) {
    return (event) => {
      const old = this.state;
      old[fy][resource] = Number(event.target.value);
      this.setState(old, () => this.computeTotals());
    };
  }

  dollars(val) {
    const fractionDigits = Math.round((val - Math.floor(val)) * 100);
    const wholeDigits = String(Math.floor(val)).split('').reverse();
    let commaPosition = 3;
    while (commaPosition < wholeDigits.length) {
      wholeDigits.splice(commaPosition, 0, ',');

      // Skip ahead 3 digits, plus the comma we just added
      commaPosition += 4;
    }

    return `$${wholeDigits.reverse().join('')}.${fractionDigits < 10 ? '0' : ''}${fractionDigits}`;
  }

  render() {
    return (
      <table cellSpacing="0" cellPadding="0">
        <tbody>
          <tr className="header">
            <th className="empty">&nbsp;</th>
            <th>FFY 2017</th>
            <th>FFY 2018</th>
            <th>FFY 2019</th>
            <th>Total cost</th>
            <th>Federal share</th>
            <th>State share</th>
          </tr>

          <tr className="stateResourceRow">
            <th className="">State resources</th>
            <td><input type="number" value={this.state['2017'].stateResources} onChange={this.updateValue(2017, 'stateResources')}/></td>
            <td><input type="number" value={this.state['2018'].stateResources} onChange={this.updateValue(2018, 'stateResources')}/></td>
            <td><input type="number" value={this.state['2019'].stateResources} onChange={this.updateValue(2019, 'stateResources')}/></td>
            <td className="dollarAmount">{this.dollars(this.state.stateResources.total)}</td>
            <td className="dollarAmount">{this.dollars(this.state.stateResources.total * 0.9)}</td>
            <td className="dollarAmount">{this.dollars(this.state.stateResources.total * 0.1)}</td>
          </tr>

          <tr className="privateResourceRow">
            <th className="">Private contractor resources</th>
            <td><input type="number" value={this.state['2017'].privateResources} onChange={this.updateValue(2017, 'privateResources')}/></td>
            <td><input type="number" value={this.state['2018'].privateResources} onChange={this.updateValue(2018, 'privateResources')}/></td>
            <td><input type="number" value={this.state['2019'].privateResources} onChange={this.updateValue(2019, 'privateResources')}/></td>
            <td className="dollarAmount">{this.dollars(this.state.privateResources.total)}</td>
            <td className="dollarAmount">{this.dollars(this.state.privateResources.total * 0.9)}</td>
            <td className="dollarAmount">{this.dollars(this.state.privateResources.total * 0.1)}</td>
          </tr>

          <tr className="totalsRow">
            <td className="empty" colSpan="3">&nbsp;</td>
            <th>Totals</th>
            <td className="dollarAmount">{this.dollars(this.state.stateResources.total + this.state.privateResources.total)}</td>
            <td className="dollarAmount">{this.dollars((this.state.stateResources.total + this.state.privateResources.total) * 0.9)}</td>
            <td className="dollarAmount">{this.dollars((this.state.stateResources.total + this.state.privateResources.total) * 0.1)}</td>
          </tr>
        </tbody>
      </table>
    );
  }
};
