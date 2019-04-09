import React, { Component } from 'react';
import Forum from './container/Forum'
import Signup from './container/Signup'
import Login from './container/Login'
import Logout from './component/Logout'
import NavBar from './container/Navbar'
import Profile from './component/Profile'
import { Adapter } from './Adapter'
import { Route, Switch, withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet'
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
      this.props.history.push("/login")
    }
}

setLogin = (userObj) => {
  if (userObj.message) {
    return this.props.history.push("/")
  }

  const user = {
    user: userObj.user
  }

  this.setState({user}, () => {
    localStorage.setItem("token", userObj.jwt);
    this.props.history.push("/forum");
  });
}

handleSignUp = () => {
  return this.props.history.push("/login")
}
handleLogout = () => {
  this.setState({user:{}}, () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  });
}
  render() {
    return (
      <div className="app__container">
        <NavBar/>
        <Forum user={this.state.user}/>
        <Switch>
          <Route path="/profiles/:id" render={() => <Profile/>}/>
          <Route path="/login" render={() => <Login setLogin={this.setLogin} /> }/>
          <Route path="/signup" render={() => <Signup handleSignUp={this.handleSignUp} /> }/>
          <Route path="/logout" render={() => <Logout handleLogout={this.handleLogout} /> }/>
        </Switch>
      </div>

    );
  }
}

export default withRouter(App);
