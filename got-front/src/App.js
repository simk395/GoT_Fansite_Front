import React, { Component } from 'react';
import Forum from './container/Forum'
import Signup from './container/Signup'
import Login from './container/Login'
import NavBar from './container/Navbar'
import { Route, Switch} from 'react-router-dom'
import './css/style.css';

class App extends Component {
  
  render() {
    return (
      <div className="app__container">
        <NavBar/>
        <Forum/>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
        </Switch>
      </div>

    );
  }
}

export default App;
