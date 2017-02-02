import React, { Component } from 'react';

import Cell from './cell';
import Player from './player';
export default class Board extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }

  render() {
    const gameBoard = this.props.gameBoard;






    var rows = gameBoard.map(function(item, i){
      var cell = item.map(function(element, j){
          return (<Cell key={j} loc={[j, i]} info={element} index={j}/>)
      });
      return (
        <div className={"boardRow row" +i} key={i}>{cell}</div>
      );
    });

    return (
      <div className="board" id="board">
        {rows}
        <Player character={this.props.character}/>
      </div>
    );
  }



  //



  // toggleKey(keyCode, isPressed) {
  //   if (keyCode == LEFT_KEY) {
  //     controller.left = isPressed;
  //   }
  //   if (keyCode == RIGHT_KEY) {
  //     controller.right = isPressed;
  //   }
  //   if (keyCode == UP_KEY) {
  //     controller.up = isPressed;
  //   }
  //   if (keyCode == DOWN_KEY) {
  //     controller.down = isPressed;
  //   }
  //   if (keyCode == SPACEBAR) {
  //     controller.space = isPressed;
  //   }
  // }





}
