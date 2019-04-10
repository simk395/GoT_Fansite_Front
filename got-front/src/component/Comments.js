import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'



export class Comments extends Component {
  render() {
      const {id, post_id, user_id, message, created_at} = this.props.comment
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
    return (
      <div data-id={`${id}`}>
        {message}
        <br/>
        <Link to={`/profile/${username}`}>hello</Link>
        {user_id === userId ? <button onClick={() => Adapter.deleteComment(id)}>Delete</button> : null}
      </div>
    )
  }
}

export default withRouter(Comments)
