import React, { Component } from 'react'
import { Adapter } from '../Adapter'
import { Link, withRouter } from 'react-router-dom'

export class Profile extends Component {
    state = {
        profiles: []
    }
    componentWillMount(){
        Adapter.getUser().then(profiles => this.setState({profiles:profiles}))
    }
    
    handleDelete = () => {
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.user.id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        Authorization: localStorage.token
      })
    }

    render() {
    const { user } = this.props
    const name = window.location.href.split("/")[window.location.href.split("/").length-1]
    const userProfile = this.state.profiles.find(profile => profile.username === name)
    const userId = (user === undefined ? null : user.user.id)
    return (
      <div>
        {userProfile !== undefined ? 
        <div>
          <p>User ID: {userProfile.id}</p>
          <p>Name: {userProfile.username}</p> 
          <p>Bio: {userProfile.bio}</p>
          {userId !== undefined && userId === userProfile.id ? <div><Link to={`/profile/${userProfile.username}/edit`}>Edit Profile</Link> <a onClick={this.handleDelete}>Delete Account</a></div> : null}
        </div>
      : null}
      </div>
    )
  }
}

export default withRouter(Profile)
