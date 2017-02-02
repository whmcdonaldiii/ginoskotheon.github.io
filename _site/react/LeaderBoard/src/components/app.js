import React, { Component } from 'react';
import axios from 'axios';
import MDSpinner from 'react-md-spinner';

import CamperList from './camper_list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentCampers: [],
      allTimeCampers: [],
      currentView: 'recentCampers'
    };
  }

  componentWillMount(){
    // make concurrent requests and set state to response
    axios.all([this.fetchRecentCampers(), this.fetchAllTimeCampers()])
      .then(axios.spread((recentCampers, allTimeCampers) => {
        this.setState({
          recentCampers: recentCampers.data,
          allTimeCampers: allTimeCampers.data
        });
      }));
  }

  fetchRecentCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  }

  fetchAllTimeCampers() {
    return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
  }

  changeView(currentView) {
    this.setState({ currentView});
  }

  render() {
    if(!this.state.recentCampers.length && !this.state.allTimeCampers.length) {
      return (
        <div className="container middle">
          <MDSpinner className="spinner" size={100}/>

        </div>
      );
    }
    return (

        <div>
          <h2 className="text-center" id="title">{`Viewing Top ${((this.state.currentView)[0].toUpperCase() + (this.state.currentView).slice(1,-1)).match(/[A-Z][a-z]+/g).join(" ")}`}</h2>
          <hr/>
          <button onClick={() => this.changeView('recentCampers')} className="btn btn-primary">Recent</button>
          <button onClick={() => this.changeView('allTimeCampers')} className="btn btn-primary">All Time</button>

          <CamperList campers={this.state[this.state.currentView]}/>
        </div>
    );
  }
}
