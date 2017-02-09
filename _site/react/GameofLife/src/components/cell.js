import React, {Component} from 'react';

export default class Cell extends React.Component {

  clickCell(e) {
    e.preventDefault();
    this.props.toggle(this.props.info, this.props.loc);
  }

  render() {
    let status;
    status = !this.props.info ? "dead" : this.props.info === 1 ? "young" : "alive";
    status += " cell";
    return (
      <div id="cells" onClick={this.clickCell.bind(this)} className={status} key={this.props.index}></div>
    );
  }
}
