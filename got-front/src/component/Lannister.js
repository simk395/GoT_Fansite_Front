import React, { Component } from 'react'
import { Route , Link, Switch } from 'react-router-dom'
import { Adapter } from '../Adapter'
import Post from './Post'

export class Lannister extends Component {
  render() {
      const {match} = this.props
      const {posts} = this.state
      const url = window.location.href
    return (
      <div>
        { 
          url === `http://localhost:3001${match.url}`?
          <ul>
            {posts.map(post => <li><Link to={`${match.url}/${post.id}`}>{post.title}</Link></li> )}
          </ul>
          : null
        }
      <Route path={`${match.url}/:id`} component={Post}/>
      </div>
    )
  }
}

export default Lannister
