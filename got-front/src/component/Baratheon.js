import React, { Component } from 'react'
import { Route , Link, Switch } from 'react-router-dom'
import { Adapter } from '../Adapter'
// import Post from './Post'

export class Baratheon extends Component {
  state = {
    id: 3,
    posts: []
}

componentDidMount(){
  Adapter.getPosts().then(posts => {
      this.setState({posts: posts.filter(post => post.category_id === this.state.id)})})
}
render() {
  const {match} = this.props
  const {posts} = this.state
return (
  <div>
    <ul>
      {/* {posts.map(post => <li><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li> )} */}
    </ul>
  </div>
)
}
}

export default Baratheon
