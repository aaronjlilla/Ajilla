import React, { Component } from 'react';
import Navigation from './components/Navigation/index';
import Bigscreen from './components/Bigscreen/index';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      screentype: "chat",
      accesstoken: "",
      artist: "",
      song: ""
    }

    this.updateScreenType = this.updateScreenType.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:4000/getcurrentlyplaying')
      .then(response => response.json())
      .then(data => this.setState({
        artist: data.artist,
        song: data.song
    }))

    setInterval(() => {
      fetch('http://localhost:4000/getcurrentlyplaying')
      .then(response => response.json())
      .then(data => this.setState({
        artist: data.artist,
        song: data.song
      }))
    }, 1000)

    setInterval(() => {
      fetch('http://localhost:4000/refreshtoken')
      .then(response => response.json())
      .then(data => {
        return data
      })
    }, 10000)
  }

  updateScreenType(type) {
    this.setState({
      screentype: type
    })
  }

  render() {
    return (
        <div className="App">
          <Bigscreen screenType={this.state.screentype}/>
          <Navigation updateScreenType={this.updateScreenType} currentscreentype={this.state.screentype} artist={this.state.artist} song={this.state.song}/>
        </div>
    );
  }
}

export default App;