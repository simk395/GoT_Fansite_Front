import React, { Component } from 'react'
import { Adapter } from '../Adapter'

export class Post extends Component {
    state = {
      posts: []
  }

  componentDidMount(){
    Adapter.getPosts().then(posts => {
        this.setState({posts: posts.filter(post => post.category_id === this.props.id)})})
  }
  render() {
    let size = window.location.href.split("/"),
        message = this.state.posts.find(post => post.id === parseInt(size[size.length-1]))
    return (
      <div>
        {message === undefined ? null : message.message}
      </div>
    )
  }
}

export default Post
