import React, { Component } from 'react'
import { Link, Route} from 'react-router-dom'
import Post from './Post'

export const PostTitles = ({match}, {props}) => {
    console.log(match)
    return (
      <div>
        <ul>
          {/* <li><Link to={`${this.props.match.url}/${this.props.details.id}`}>pay gold</Link></li> */}
        </ul>
          {/* <Route path={`{$match.path}/${this.props.details.id}`} component={Post}/> */}
      </div>
    )
  }

export default PostTitles

