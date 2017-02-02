import React, {Component} from 'react';

export default class Player extends React.Component {

  getHero() {
    var hero = document.getElementById('hero');
    console.log('what?', hero);
    this.props.character(hero, 250, 460, 20, 20);
  }

  render() {


    let status;
    // status = this.props.info === 1 ? "wall" : "";
    status += " player";
    return (
      <div id='hero' className={status} key={this.props.index}></div>
    );
  }





}
