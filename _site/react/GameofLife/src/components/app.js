import React, { Component } from 'react';

import Header from './header';
import GameBoard from './gameboard';
import Footer from './footer';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      Board: [],
      gen: 0,
      running: false,
      speed: 120,
      pause: false,
      size: [70, 50]
    };
  }

  componentWillMount() {
    this.newGame(1);
    this.setState({
      running: true
    });
  }

  componentDidMount() {
    this.runPause();
  }

  componentWillUnmount() {
    this.setState({
      running: false
    });
  }

  render() {
    return (

      <div className="Board">
        <div id="header">
          <Header gen={this.state.gen} next={this.nextGeneration.bind(this)} newBoard={this.newGame.bind(this)} run={this.toggleRunPause.bind(this)} pause={this.togglePause.bind(this)} runState={this.state.running} pauseState={this.state.pause} />
        </div>

          <GameBoard gameboard={this.state.Board} that={this}/>


        <div id="footer">
          <Footer speed={this.speedControl.bind(this)} newBoard={this.newGame.bind(this)} />
        </div>

        <div id="msg">
          <p>Add or remove cells by clicking on a cell. Lighter cells are new in the current generation, darker cells have survived for at least one generation</p>
        </div>
      </div>
    );
  }

  speedControl(newSpeed) {
    if (this.state.running) {
      this.setState({
        speed: newSpeed,
        pause: true
      });
      setTimeout(this.toggleRunPause.bind(this), 15);
    } else {
      this.setState({
        speed: newSpeed
      });
    }
  }

  toggleRunPause() {
    this.setState({
      pause: false,
      running: true
    }, function() {
      this.runPause();
    });
  }

  togglePause() {
    console.log("toggle pause");
    this.setState({
      pause: true
    });
  }

  runPause() {
    let that = this;
    let speed = this.state.speed;

    var pause = function() {
      clearInterval(turn);
      clearInterval(check);
      that.setState({
        running: false
      });
    };

    var check = setInterval(function() {
      if (this.state.pause) {
        pause();
      }
    }.bind(this), 10);

    var turn = setInterval(this.nextGeneration.bind(this), speed);
  }

  nextGeneration() {
    let arr = this.state.Board;
    arr.push(arr[0]);
    arr.unshift(arr[arr.length-2]);
    let nextArr = [];
    const rLen = arr[0].length-1;

    for (let i = 1; i < arr.length -1; i ++) {

      nextArr.push([]);
      arr[i].forEach(function(cell, j) {
        let neighbors = [arr[i-1][j-1], arr[i-1][j], arr[i-1][j+1], arr[i][j-1], arr[i][j+1], arr[i+1][j-1], arr[i+1][j], arr[i+1][j+1]];
        let leftEdge = [arr[i-1][rLen], arr[i-1][j], arr[i-1][j+1], arr[i][rLen], arr[i][j+1], arr[i+1][rLen], arr[i+1][j], arr[i+1][j+1]];
        let rightEdge = [arr[i-1][j-1], arr[i-1][j], arr[i-1][0], arr[i][j-1], arr[i][0], arr[i+1][j-1], arr[i+1][j], arr[i+1][0]];
        let use = neighbors;
        j === 0 ? use = leftEdge : j === rLen ? use = rightEdge : use;
        let total = 0;
        use.forEach(function(val) {
          if (val) {
          total++;
          }
        });
        let result = 0;
        if (total === 2 && cell) {
          result = 2;
        } else if (total === 3) {
          cell ? result = 2 : result = 1;
        }
        nextArr[i-1].push(result);
      });
    }
    this.setState({
      Board: nextArr,
      gen: this.state.gen + 1
    });
  }

  toggleLife(status, loc) {
    let Board = this.state.Board;
    status++;
    status === 3 ? status = 0 : status;
    Board[loc[1]][loc[0]] = status;
    this.setState({
      Board: Board
    });
  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  newGame(max, size = this.state.size) {
    if (this.state.running) {
      this.togglePause();
    }

    let Board = [];
    for (let i = 0; i < size[1]; i ++) {
      Board.push([]);
      for (let j = 0; j < size[0]; j ++) {
        Board[i].push(this.getRandom(0, max));
      }
    }
    this.setState({
      Board: Board,
      gen: 0,
      size: size
    });
  }
}
