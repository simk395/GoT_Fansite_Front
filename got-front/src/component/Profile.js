import React, { Component } from 'react'
import { Adapter } from '../Adapter'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Edit from './EditProfile'

export class Profile extends Component {
    state = {
        profile: {},
        edit:false
    }
    componentDidMount(){
        Adapter.getUser().then(profiles => {
          const name = window.location.href.split("/")[window.location.href.split("/").length-1]
          const userProfile =  profiles ? profiles.find(profile => profile.username === name) : {}
          this.setState({profile: userProfile}) 
        })
    }
    
    editBio = (e, bio, id) => {
      e.preventDefault()
      fetch(`http://localhost:3000/api/v1/users/${id}`, {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: localStorage.token
          },
          body:JSON.stringify({user: {bio: bio}})
      })
      .then(resp => resp.json())
      .then(profile => this.setState({profile:profile, edit:false}))
    }

    deleteAccount = () => {
      fetch(`http://localhost:3000/api/v1/users/${this.props.user.user.id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'},
        Authorization: localStorage.token
      })
    }

    createBtn = () => {
      if(this.props.user.user){
        if(this.props.user.user.id === this.state.profile.id){
          return <div><Button onClick={() => this.setState({ edit: true })} className="profile_edit_btn"> Edit Bio </Button> <Button className="profile_delete" onClick={this.deleteAccount}>Delete Account</Button></div>
        }
      }
    }
    modalClose = () => {
      this.setState({ edit: false });
    }
    render() {
    const { profile } = this.state
    const { user } = this.props.user
    return (
      <div className="profile_main">
        {profile ? 
        <div className="profile_detail">
          <h1>{profile.username}</h1> 
          <p>Bio:</p>
          <div dangerouslySetInnerHTML={{__html: profile.bio}}></div>
          {this.createBtn()}
          <Edit user={user} editBio={this.editBio} show={this.state.edit} onHide={this.modalClose}/>
        </div>
      : null}
      </div>
    )
  }
}

export default withRouter(Profile)
