import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from "react-bootstrap"

export class BreadcrumbNav extends Component {
  render() {
      const { posts, categories } = this.props
      const location = window.location.href;
      const data = location.split("/").slice(3,6);
      const findCategory = categories ? categories.find(category => category.id === parseInt(data[1]))  : {}
      const findPost = posts ? posts.find(post => post.id === parseInt(data[2])) : {}
      console.log(findCategory)
      
      
    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/forum"> Forum </Link>
            </Breadcrumb.Item>
            {findCategory ? 
            <Breadcrumb.Item active="false">
               <Link to={`/forum/${findCategory.id}`}>{findCategory.title}</Link>
            </Breadcrumb.Item>: null}
            {findPost ? 
            <Breadcrumb.Item active="false">
               <Link to={`/forum/${findCategory.id}/${findPost.id}`}>{findPost.title}</Link>
            </Breadcrumb.Item>: null}
        </Breadcrumb>
    )
  }
}

export default BreadcrumbNav
