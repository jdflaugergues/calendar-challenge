import React, { Component } from 'react';
import './App.css';
import {Calendar} from './components/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar {...this.props}/>
      </div>
    );
  }
}

export default App;
