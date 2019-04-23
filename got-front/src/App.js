import React, { Component } from 'react';
import Forum from './container/Forum'
import Navigation from './container/Navigation'
import Profile from './component/Profile'
import House from './container/House'
import Story from './container/Story'
import { Route, Switch, withRouter} from 'react-router-dom'
import banner from './images/banner.png'
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
    let user = document.querySelector(".account_username");
    if(!document.querySelector(".invalid")){
      let invalid = document.createElement("p");
      invalid.className = "invalid";
      invalid.innerText = '\u2022 Invalid Username or Password';
      return user.after(invalid);
    }
    return null;
  }

  const user = {
    user: userObj.user
  }

  this.setState({user}, () => {
    localStorage.setItem("token", userObj.jwt);
  });
}

handleSignUp = () => {
  alert("Account successfully created!");
  return this.props.history.push("/forum")
}
handleLogout = (e) => {
  this.setState({user:{}}); 
  localStorage.removeItem('token');
}
  render() {
    const { user } = this.state
    const url = window.location.href
    const showBanner = url.match(/forum/) ? <img alt="" className="banner" src={banner}/> : <img hidden className="banner" src={banner} alt=""/>;
    return (
      <main className="main">
      {showBanner}
        <Navigation  user={user} setLogin={this.setLogin} handleSignUp={this.handleSignUp} handleLogout={this.handleLogout}/>
        <Switch>
          <Route path="/profile/:username" render={() => <Profile user={user}/>}/>
          <Route path="/forum" render={() => <Forum user={user} setLogin={this.setLogin} handleSignUp={this.handleSignUp} handleLogout={this.handleLogout}/>}/>
          <Route path="/houses" component={House}/>
          <Route path="/story" component={Story}/>
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
