import React, {Component} from 'react';


export default class Footer extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-default"  onClick={this.handleSpeed.bind(this, 500)}>Slow</button>
          <button className="btn btn-default"  onClick={this.handleSpeed.bind(this, 250)}>Medium</button>
          <button className="btn btn-default"  onClick={this.handleSpeed.bind(this, 120)}>Fast</button>
        </div>
        <div className="col-md-12">
          <button id="smallCanvas" className="btn btn-default"  onClick={this.handleSize.bind(this, [50, 30])}>50 x 30</button>
          <button id="mediumCanvas" className="btn btn-default"  onClick={this.handleSize.bind(this, [70, 50])}>70 x 50</button>
          <button id="bigCanvas" className="btn btn-default"  onClick={this.handleSize.bind(this, [100, 80])}>100 x 80</button>
        </div>
      </div>
    )
  }

  handleSize(arr, e) {
    e.preventDefault();
    this.props.newBoard(1, arr);

  }

  handleSpeed(num, e) {
    e.preventDefault();
    this.props.speed(num);
  }
}
