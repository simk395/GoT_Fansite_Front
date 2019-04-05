import React from 'react'

export const Post = (props) => {
    const { posts } = props
    let size = window.location.href.split("/"),
        post = posts.find(post => post.id === parseInt(size[size.length-1]))
    return (
      <div>
        {post === undefined ? null : post.message}
      </div>
    )
}

export default Post
