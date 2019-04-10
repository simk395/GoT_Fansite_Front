import React, { Component } from 'react'
import { Adapter } from '../Adapter'
import { Link } from 'react-router-dom'

export class Profile extends Component {
    state = {
        profiles: []
    }
    componentWillMount(){
        Adapter.getUser().then(profiles => this.setState({profiles:profiles}))
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
          {userId !== undefined && userId === userProfile.id? <Link to={`/profile/${userProfile.username}/edit`}>Edit Profile</Link> : null}
        </div>
      : null}
      </div>
    )
  }
}

export default Profile
