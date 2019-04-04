import React, { Component } from 'react'
import { Adapter } from '../Adapter'
import PostTitle from './PostTitle'

export class Lannister extends Component {
    state = {
        state: 5,
        posts: []
    }
    
    componentDidMount(){
      Adapter.getPosts().then(posts => {
          this.setState({posts: posts.filter(post => post.category_id === this.props.info.id)})})
    }

    
  render() {
      const {match} = this.props
      const {posts} = this.state
    //   console.log(match)
    //   const url = `http://localhost:3001/forum/${id}`
    return (
      <div>
        {posts.map(post => <PostTitle details={post} match={match}/>)}
      </div>
    )
  }
}

export default Lannister
