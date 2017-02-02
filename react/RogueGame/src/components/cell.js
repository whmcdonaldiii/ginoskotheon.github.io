import React, {Component} from 'react';

export default class Cell extends React.Component {

  // cellClick(e) {
  //   e.preventDefault();
  //   this.props.toggle(this.props.info, this.props.loc);
  // }

  render() {
    let status;
    status = this.props.info === 1 ? "wall" : "";
    status += " cell";
    return (
      <div id="cells" className={status} key={this.props.index}></div>
    );
  }


}
