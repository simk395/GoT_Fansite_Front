import React, { Component } from 'react'
import { Adapter } from '../Adapter'

export class Profile extends Component {
    state = {
        
    }
    componentDidMount(){
        Adapter.getUser().then(profiles => this.setState({profiles:profiles}))
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Profile
