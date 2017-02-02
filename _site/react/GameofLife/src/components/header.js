import React, {Component} from 'react';




export default class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-default btn-sm" onClick={this.handleRunPause.bind(this)}>Start</button>
          <button className="btn btn-default btn-sm"  onClick={this.handlePause.bind(this)}>Pause</button>
          <button className="btn btn-default btn-sm"  onClick={this.handleNext.bind(this)}>One Turn</button>
        </div>
        <div className="col-md-12">
          <button className="btn btn-default btn-sm"  onClick={this.handleNewBoard.bind(this, 0)}>Clear Board</button>
          <button className="btn btn-default btn-sm"  onClick={this.handleNewBoard.bind(this, 1)}>New Random Game</button>

        </div>
        <div className="col-md-12" >

        </div>
        <div id='generations'> {this.props.gen} Generations</div>
      </div>
    );
  }

  handleRunPause(e) {
    e.preventDefault();
    if (!this.props.runState) {
      this.props.run();
    }
  }

  handlePause(e) {
    e.preventDefault();
    this.props.pause();
  }

  handleNewBoard(createVal, e) {
    console.log(createVal);
    e.preventDefault();
    this.props.newBoard(createVal);
  }

  handleNext(e) {
    e.preventDefault();
    if (!this.props.runState || this.props.pauseState) {
      this.props.next();
    }
  }
}
