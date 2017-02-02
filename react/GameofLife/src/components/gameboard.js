import React, {Component} from 'react';

import Cell from './cell';


export default class GameBoard extends React.Component {
    constructor(props) {
    super(props);


  }

  render() {
  const gameBoard = this.props.gameboard;

  const that = this.props.that;

  var rows = gameBoard.map(function(item, i) {
    var entry = item.map(function(element, j) {
        return (<Cell key={j} toggle={that.toggleLife.bind(that)} loc={[j, i]} info={element} index={j} />)
    });
    return (
      <div className={"boardRow row"+i} key={i}>{entry}</div>
    );
  });

  return (
      <div id="gameBack">
        {rows}
      </div>
    );
  }
}

// export default GameBoard;
