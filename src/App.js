import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Body />
        </div>
      </Router>
    );
  }
}

export default App;
