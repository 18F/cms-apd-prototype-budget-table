import React from 'react';

export default class NewLineItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ffpType: '' };

    this.onFFPTypeChanged = this.onFFPTypeChanged.bind(this);
  }

  onFFPTypeChanged(e) {
    console.log(e.target.value)
    this.setState({ ffpType: e.target.value })
  }

  render() {
    return (
      <div>
        <h2>FFP Type:</h2>
        <div><label><input type="radio" value="2a-90" checked={this.state.ffpType === '2a-90'} onChange={this.onFFPTypeChanged}></input> 2A, 90% FFP</label></div>
        <div><label><input type="radio" value="2a-75" checked={this.state.ffpType === '2a-75'} onChange={this.onFFPTypeChanged}></input> 2A, 75% FFP</label></div>
        <div><label><input type="radio" value="2a-50" checked={this.state.ffpType === '2a-50'} onChange={this.onFFPTypeChanged}></input> 2A, 50% FFP</label></div>
        <hr/>
        <div><label><input type="radio" value="2b-90" checked={this.state.ffpType === '2b-90'} onChange={this.onFFPTypeChanged}></input> 2B, 90% FFP</label></div>
        <div><label><input type="radio" value="2b-75" checked={this.state.ffpType === '2b-75'} onChange={this.onFFPTypeChanged}></input> 2B, 75% FFP</label></div>
        <div><label><input type="radio" value="2b-50" checked={this.state.ffpType === '2b-50'} onChange={this.onFFPTypeChanged}></input> 2B, 50% FFP</label></div>
        <hr/>
        <div><label><input type="radio" value="4a-75" checked={this.state.ffpType === '4a-75'} onChange={this.onFFPTypeChanged}></input> 4A, 75% FFP</label></div>
        <div><label><input type="radio" value="4b-75" checked={this.state.ffpType === '4b-75'} onChange={this.onFFPTypeChanged}></input> 4B, 75% FFP</label></div>
        <hr/>
        <div><label><input type="radio" value="5a-50" checked={this.state.ffpType === '5a-50'} onChange={this.onFFPTypeChanged}></input> 5A, 50% FFP</label></div>
        <div><label><input type="radio" value="5b-50" checked={this.state.ffpType === '5b-50'} onChange={this.onFFPTypeChanged}></input> 5B, 50% FFP</label></div>
        <div><label><input type="radio" value="5c-50" checked={this.state.ffpType === '5c-50'} onChange={this.onFFPTypeChanged}></input> 5C, 50% FFP</label></div>

        <h2>Amount</h2>
        <div><input type="number" /></div>

        <button>Add</button>
      </div>
    )
  }
}
