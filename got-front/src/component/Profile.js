import React, { Component } from 'react'
import { Adapter } from '../Adapter'
import { Link, withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Edit from './EditProfile'

export class Profile extends Component {
    state = {
        profiles: [],
        edit:false
    }
    componentDidMount(){
        Adapter.getUser().then(profiles => this.setState({profiles:profiles}))
    }
    
    handleDelete = () => {
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.user.id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        Authorization: localStorage.token
      })
    }
    createBtn = () => {
    const name = window.location.href.split("/")[window.location.href.split("/").length-1]
    const userProfile = this.state.profiles.find(profile => profile.username === name)
    if(this.props.user.user){
      if(this.props.user.user.id === userProfile.id){
        return <div><Button onClick={() => this.setState({ edit: true })} className="profile_edit_btn"> Edit Bio </Button> <Button className="profile_delete" onClick={this.handleDelete}>Delete Account</Button></div>
      }
    }
    }
    render() {
    let modalClose = () => this.setState({ edit: false });
    const { profiles } = this.state
    const { user } = this.props.user
    const name = window.location.href.split("/")[window.location.href.split("/").length-1]
    const userProfile = profiles.find(profile => profile.username === name)
    return (
      <div className="profile_main">
        {userProfile !== undefined ? 
        <div className="profile_detail">
          <h1>{userProfile.username}</h1> 
          <div>Bio: {userProfile.bio}</div>
          {this.createBtn()}
          <Edit user={user} show={this.state.edit} onHide={modalClose}/>
        </div>
      : null}
      </div>
    )
  }
}

export default withRouter(Profile)
