import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Adapter } from '../Adapter'

export class Comments extends Component {
  state = {
    comment: this.props.comment.message
  }

  handleEdit = () => {
    document.querySelector(`.comment-${this.props.comment.id}`).remove()
    const div = document.querySelector(`div[data-id="${this.props.comment.id}"]`)
    const form = document.createElement("form")
    const input = document.createElement("textarea")
    form.append(input)
    div.before(form)
  }

  render() {
      const {id, post_id, user_id, message, created_at} = this.props.comment
      const {comment} = this.state
      const { user, profiles } = this.props
      const userId = (user === undefined ? "" : user.id)
      const creator = profiles.find(profile => user_id === profile.id)
      const username = (creator === undefined ? "" : creator.username)
    return (
      <div data-id={`${id}`}>
         <span className={`comment-${id}`}>{comment}</span>
        <br/>
        <Link to={`/profile/${username}`}>{username}</Link>
        {user_id === userId ? <div><button onClick={this.handleEdit}>Edit</button> <button onClick={() => Adapter.deleteComment(id)}>Delete</button></div> : null}
      </div>
    )
  }
}

export default withRouter(Comments)
