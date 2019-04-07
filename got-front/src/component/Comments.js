import React, { Component } from 'react'

export class Comments extends Component {
  render() {
      console.log(this.props)
      const {id, post_id, profile_id, message, created_at} = this.props.comment
    return (
      <div>
        {message}
      </div>
    )
  }
}

export default Comments
