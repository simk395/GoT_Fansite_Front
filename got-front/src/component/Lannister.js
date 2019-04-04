import React, { Component } from 'react'
import { Route , Link } from 'react-router-dom'
import { Adapter } from '../Adapter'
import PostTitle from './PostTitle'
import Post from './Post'

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
    //   const url = `http://localhost:3001/forum/${id}`
    return (
      <div>
        <ul>
            {posts.map(post => <li><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li>)}
        </ul>
         <Route exact path={`{$match.url}/:id`} render= {() => ( <div> <h3> 1 </h3></div>)}/>
      </div>
    )
  }
}

export default Lannister
