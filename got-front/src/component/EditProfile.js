import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export class EditProfile extends Component {
    state = {
        id: this.props.user.user.id,
        username: this.props.user.user.username,
        bio: this.props.user.user.bio
    }

    handleEdit = (e, bio) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/users/${this.state.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: localStorage.token
            },
            body:JSON.stringify({user: {username: this.state.username, bio:bio}})
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  render() {
      console.log(this.props)
      const { id, username, bio } = this.state
    return (
      <div>
          <p>User ID: {id}</p>
          <p>Username: {username}</p>
        <form onSubmit={(e) => this.handleEdit(e, bio)}>
            <label>Bio: </label>
            <input type="text" name="bio" onChange={this.handleInput} value={bio}></input>
            <button type="submit">Change</button>
        </form>
      </div>
    )
  }
}

export default withRouter(EditProfile)
