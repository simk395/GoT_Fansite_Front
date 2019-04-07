import React, { Component } from 'react';
import Forum from './container/Forum'
import './css/style.css';

class App extends Component {
  
  render() {
    return (
      <div className="app__container">
        <Forum/>
      </div>

    );
  }
}

export default App;
