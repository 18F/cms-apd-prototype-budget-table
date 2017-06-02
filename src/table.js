import React from 'react';
import numeral from 'numeral';
import BarChart from 'react-c3js';

export default class BudgetTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineItems: [
        {
          ffy: 2018,
          type: '2a',
          ffp: '2a-90',
          amount: 2234523
        },
        {
          ffy: 2018,
          type: '2a',
          ffp: '2a-50',
          amount: 752835
        },
        {
          ffy: 2017,
          type: '2a',
          ffp: '2a-90',
          amount: 123532.35
        },
        {
          ffy: 2017,
          type: '2a',
          ffp: '2a-75',
          amount: 2352
        },
        {
          ffy: 2017,
          type: '4',
          ffp: '4a-75',
          amount: 236246
        },
        {
          ffy: 2017,
          type: '5',
          ffp: '5a-50',
          amount: 2385238
        }
      ],
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
    this.getFYs = this.getFYs.bind(this);
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
    return numeral(val).format('$0,0.00');
  }

  getFYs() {
    return this.state.lineItems.map(lineItem => lineItem.ffy).filter((item, index, array) => array.indexOf(item) === index).sort();
  }

  getLineItemsByType(ffpType) {
    return this.state.lineItems.filter(lineItem => lineItem.type === ffpType);
  }

  getCombinedLineItem(ffpType, ffy) {
    const allLineItems = this.getLineItemsByType(ffpType).filter(lineItem => lineItem.ffy === ffy);
    const combinedLine = { };

    for (const lineItem of allLineItems) {
      if (combinedLine[lineItem.ffp]) {
        combinedLine[lineItem.ffp] += lineItem.amount;
      } else {
        combinedLine[lineItem.ffp] = lineItem.amount;
      }
    }
    return combinedLine;
  }

  render() {
    const allFYs = this.getFYs();
    const twoALineItems = this.getLineItemsByType('2a');
    const fyCumulative = { };
    const chartData = {
      columns: [
        ['2a-cms'],
        ['2a-state'],
        ['2b-cms'],
        ['2b-state'],
        ['4a-4b-cms'],
        ['4a-4b-state'],
        ['5a-5b-5c-cms'],
        ['5a-5b-5c-state'],
        ['years', 2017, 2018]
      ],
      groups: [['2a-cms', '2a-state', '2b-cms', '2a-state', '4a-4b-cms', '4a-4b-state', '5a-5b-5c-cms', '5a-5b-5c-state']],
      names: {
        '2a-cms': '2A, CMS share',
        '2a-state': '2A, state share',
        '2b-cms': '2B, CMS share',
        '2b-state': '2B, state share',
        '4a-4b-cms': '4A/4B, CMS share',
        '4a-4b-state': '4A/4B, state share',
        '5a-5b-5c-cms': '5A/5B/5C, CMS share',
        '5a-5b-5c-state': '5A/5B/5C, state share'
      },
      colors: {
        '2a-cms': '#FF0000', '2a-state': '#FF8888',
        '4a-4b-cms': '#00FF00', '4a-4b-state': '#88FF88',
        '5a-5b-5c-cms': '#0000FF', '5a-5b-5c-state': '#8888FF'
      },
      order: null,
      x: 'years'
    };
    allFYs.forEach(fy => fyCumulative[fy] = { total: 0 });

    const twoARows = [];
    for(const fy of allFYs) {
      const lineItem = this.getCombinedLineItem('2a', fy);

      const cmsTotal = ((lineItem['2a-90'] || 0) * 0.9) + ((lineItem['2a-75'] || 0) * 0.75) + ((lineItem['2a-50'] || 0) * 0.5);
      const stateTotal = ((lineItem['2a-90'] || 0) * 0.1) + ((lineItem['2a-75'] || 0) * 0.25) + ((lineItem['2a-50'] || 0) * 0.5);

      twoARows.push(
        <tr key={`2a-ffy-${fy}`}>
          <td>FFY {fy}</td>
          <td>{this.dollars((lineItem['2a-90'] || 0) * 0.9)}</td>
          <td>{this.dollars((lineItem['2a-90'] || 0) * 0.1)}</td>
          <td>{this.dollars((lineItem['2a-75'] || 0) * 0.75)}</td>
          <td>{this.dollars((lineItem['2a-75'] || 0) * 0.25)}</td>
          <td>{this.dollars((lineItem['2a-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['2a-50'] || 0) * 0.5)}</td>
          <td>{this.dollars(cmsTotal)}</td>
          <td>{this.dollars(stateTotal)}</td>
        </tr>
      );

      chartData.columns[0].push(cmsTotal);
      chartData.columns[1].push(stateTotal);

      fyCumulative[fy]['2a'] = {
        cmsTotal, stateTotal, total: cmsTotal + stateTotal
      };
      fyCumulative[fy].total += (cmsTotal + stateTotal);
    }

    const twoBRows = [];
    for(const fy of allFYs) {
      const lineItem = this.getCombinedLineItem('2b', fy);

      const cmsTotal = ((lineItem['2b-90'] || 0) * 0.9) + ((lineItem['2b-75'] || 0) * 0.75) + ((lineItem['2b-50'] || 0) * 0.5);
      const stateTotal = ((lineItem['2b-90'] || 0) * 0.1) + ((lineItem['2b-75'] || 0) * 0.25) + ((lineItem['2b-50'] || 0) * 0.5);

      twoBRows.push(
        <tr key={`2b-ffy-${fy}`}>
          <td>FFY {fy}</td>
          <td>{this.dollars((lineItem['2b-90'] || 0) * 0.9)}</td>
          <td>{this.dollars((lineItem['2b-90'] || 0) * 0.1)}</td>
          <td>{this.dollars((lineItem['2b-75'] || 0) * 0.75)}</td>
          <td>{this.dollars((lineItem['2b-75'] || 0) * 0.25)}</td>
          <td>{this.dollars((lineItem['2b-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['2b-50'] || 0) * 0.5)}</td>
          <td>{this.dollars(cmsTotal)}</td>
          <td>{this.dollars(stateTotal)}</td>
        </tr>
      );

      chartData.columns[2].push(cmsTotal);
      chartData.columns[3].push(stateTotal);

      fyCumulative[fy]['2b'] = {
        cmsTotal, stateTotal, total: cmsTotal + stateTotal
      };
      fyCumulative[fy].total += (cmsTotal + stateTotal);
    }

    const fourABRows = [];
    for(const fy of allFYs) {
      const lineItem = this.getCombinedLineItem('4', fy);

      const cmsTotal = ((lineItem['4a-75'] || 0) * 0.75) + ((lineItem['4b-75'] || 0) * 0.75);
      const stateTotal = ((lineItem['4a-75'] || 0) * 0.25) + ((lineItem['2b-75'] || 0) * 0.25);

      fourABRows.push(
        <tr key={`4ab-ffy-${fy}`}>
          <td>FFY {fy}</td>
          <td>{this.dollars((lineItem['4a-75'] || 0) * 0.75)}</td>
          <td>{this.dollars((lineItem['4a-75'] || 0) * 0.25)}</td>
          <td>{this.dollars((lineItem['4b-75'] || 0) * 0.75)}</td>
          <td>{this.dollars((lineItem['4b-75'] || 0) * 0.25)}</td>
          <td>{this.dollars(cmsTotal)}</td>
          <td>{this.dollars(stateTotal)}</td>
        </tr>
      );

      chartData.columns[4].push(cmsTotal);
      chartData.columns[5].push(stateTotal);

      fyCumulative[fy]['4'] = {
        cmsTotal, stateTotal, total: cmsTotal + stateTotal
      };
      fyCumulative[fy].total += (cmsTotal + stateTotal);
    }

    const fiveABCRows = [];
    for(const fy of allFYs) {
      const lineItem = this.getCombinedLineItem('5', fy);

      const cmsTotal = ((lineItem['5a-50'] || 0) + (lineItem['5b-50'] || 0) + (lineItem['5c-50'] || 0)) * 0.5;
      const stateTotal = ((lineItem['5a-50'] || 0) + (lineItem['5b-50'] || 0) + (lineItem['5c-50'] || 0)) * 0.5

      fiveABCRows.push(
        <tr key={`5abc-ffy-${fy}`}>
          <td>FFY {fy}</td>
          <td>{this.dollars((lineItem['5a-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['5a-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['5b-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['5b-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['5c-50'] || 0) * 0.5)}</td>
          <td>{this.dollars((lineItem['5c-50'] || 0) * 0.5)}</td>
          <td>{this.dollars(cmsTotal)}</td>
          <td>{this.dollars(stateTotal)}</td>
        </tr>
      );

      chartData.columns[6].push(cmsTotal);
      chartData.columns[7].push(stateTotal);

      fyCumulative[fy]['5'] = {
        cmsTotal, stateTotal, total: cmsTotal + stateTotal
      };
      fyCumulative[fy].total += (cmsTotal + stateTotal);
    }

    chartData.type = "bar";
    //chartData.groups = [
    //  '2a-cms', '2a-state'
    //];
    console.log(JSON.stringify(chartData, false, 2));

    return (
      <div>
        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr className="header">
              <th colSpan="9">2A</th>
            </tr>
            <tr className="header">
              <th>Approved through DDI APD</th>
              <th>MMIS CMS Share (90% FFP)</th>
              <th>State Share (10%)</th>
              <th>MMIS CMS Share (75% FFP)</th>
              <th>State Share (25%)</th>
              <th>MMIS CMS Share (50% FFP)</th>
              <th>State Share (50%)</th>
              <th>MMIS Funding FFP Total</th>
              <th>State Share Total</th>
            </tr>
            {twoARows}
          </tbody>
        </table>

        <br/><br/>

        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr className="header">
              <th colSpan="9">2B</th>
            </tr>
            <tr className="header">
              <th>Approved through DDI APD</th>
              <th>MMIS CMS Share (90% FFP)</th>
              <th>State Share (10%)</th>
              <th>MMIS CMS Share (75% FFP)</th>
              <th>State Share (25%)</th>
              <th>MMIS CMS Share (50% FFP)</th>
              <th>State Share (50%)</th>
              <th>MMIS Funding FFP Total</th>
              <th>State Share Total</th>
            </tr>
            {twoBRows}
          </tbody>
        </table>

        <br/><br/>

        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr className="header">
              <th colSpan="9">4A & 4B</th>
            </tr>
            <tr className="header">
              <th rowSpan="2">M&O</th>
              <th colSpan="2">4A</th>
              <th colSpan="2">4B</th>
              <th rowSpan="2">MMIS Funding FFP Total</th>
              <th rowSpan="2">State Share Total</th>
            </tr>
            <tr className="header">
              <th>MMIS CMS Share (75% FFP)</th>
              <th>State Share (25%)</th>
              <th>MMIS CMS Share (75% FFP)</th>
              <th>State Share (25%)</th>
            </tr>
            {fourABRows}
          </tbody>
        </table>

        <br/><br/>

        <table cellSpacing="0" cellPadding="0">
          <tbody>
            <tr className="header">
              <th colSpan="9">5A, 5B, & 5C</th>
            </tr>
            <tr className="header">
              <th rowSpan="2">M&O</th>
              <th colSpan="2">5A</th>
              <th colSpan="2">5B</th>
              <th colSpan="2">5C</th>
              <th rowSpan="2">MMIS Funding FFP Total</th>
              <th rowSpan="2">State Share Total</th>
            </tr>
            <tr className="header">
              <th>MMIS CMS Share (50% FFP)</th>
              <th>State Share (50%)</th>
              <th>MMIS CMS Share (50% FFP)</th>
              <th>State Share (50%)</th>
              <th>MMIS CMS Share (50% FFP)</th>
              <th>State Share (50%)</th>
            </tr>
            {fiveABCRows}
          </tbody>
        </table>

        <BarChart data={chartData}>
        </BarChart>

        {/*
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
        */}
      </div>
    );
  }
};
