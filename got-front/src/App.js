import React, { Component } from 'react';
import Forum from './container/Forum'
import Navigation from './container/Navigation'
import Profile from './component/Profile'
import Landing from './component/Landing'
import EditProfile from './component/EditProfile'
import { Adapter } from './Adapter'
import { Route, Switch, withRouter} from 'react-router-dom'
import banner from './images/banner.png'
import { Form } from 'react-bootstrap'

import './css/style.css';



class App extends Component {
  state = {
    user: {}
  }
  componentDidMount(){
    const token = localStorage.token;

    if (token) {
      fetch('http://localhost:3000/api/v1/current_user', {
        method: "GET",
          headers: {
            "content-type": "application/json",
            accepts: "application/json",
            Authorization: `${token}`
          }
      })
      .then(resp => resp.json())
      .then(user => {
        this.setState({ user }, () => {
          this.props.history.push("/forum");
        })
      }) 
    }else {
      this.props.history.push("/forum")
    }
}

setLogin = (userObj) => {
  if (userObj.message) {
    let user = document.querySelector(".username");
    let invalid = document.createElement("p");
    invalid.className = "invalid";
    invalid.innerText = '\u2022 Invalid Username or Password';
    return user.before(invalid);
  }

  const user = {
    user: userObj.user
  }

  this.setState({user}, () => {
    localStorage.setItem("token", userObj.jwt);
  });
}

handleSignUp = () => {
  return this.props.history.push("/forum")
}
handleLogout = () => {
  this.setState({user:{}}, () => {
    localStorage.removeItem('token');
  });
}
  render() {
    return (
      <main className="main">
      <img className="banner" src={banner}></img>
        <Navigation setLogin={this.setLogin} handleSignUp={this.handleSignUp} handleLogout={this.handleLogout}/>
        <Forum user={this.state.user} setLogin={this.setLogin} handleSignUp={this.handleSignUp} handleLogout={this.handleLogout}/>
        <Switch>
          <Route path="/profile/:username/edit" render ={() => <EditProfile user={this.state.user}/>}/>
          <Route path="/profile/:username" render={() => <Profile user={this.state.user}/>}/>
          <Route exact path="/landing" component={Landing}/>
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
