import React, { Component } from 'react'
import { Switch, Route, withRouter} from 'react-router-dom'
import { Adapter } from '../Adapter'
import Category from '../component/Category'
import Discussion from '../component/Discussion'
import Post from '../component/Post'
import PostCreate from '../component/PostCreate'
import EditPost from '../component/EditPost'
import EditComment from '../component/EditComment'
import Breadcrumb from '../component/Breadcrumb'

export class Forum extends Component {
  state = {
    categories:[],
    posts: [],
    newPosts: [],
    profiles: [],
    newProfiles: [],
    comments: [],
    newComments: []
  }
  componentDidMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}));
    Adapter.getPosts().then(posts => this.setState({posts: posts, newPosts: posts}))
    Adapter.getUser().then(profiles => this.setState({profiles:profiles, newProfiles: profiles}))
    Adapter.getComments().then(comments => this.setState({comments:comments.sort(function(a, b){return a.id-b.id}), newComments: comments.sort(function(a, b){return a.id-b.id})}));
  }

    postCreate = (e, title, comment, id) => {
      e.preventDefault()
      const postObj = {
          title: title,
          message:comment,
          category_id: id,
          user_id: this.props.user.user.id
      }
      this.postPost(postObj)
  }

  postPost = (postObj) => {
      fetch('https://got-fansite-backend.herokuapp.com/posts', {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: localStorage.token
          },
          body: JSON.stringify({post:postObj})
      })
      .then(resp => resp.json())
      .then(post => this.setState({newPosts: [...this.state.newPosts, post]}))
      this.props.history.replace(`/forum/${postObj.category_id}`)
  }

  postComment = (commentObj) => {
    fetch("https://got-fansite-backend.herokuapp.com/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: localStorage.token
        },
        body:JSON.stringify({comment:commentObj})
    }).then(resp => resp.json())
    .then(comment => {
        this.setState({newComments: [...this.state.newComments, comment]})
    })
  }

  updatePost = (e,id,title, comment) => {
    const postObj = {
      title: title,
      message: comment
    }

   fetch(`https://got-fansite-backend.herokuapp.com/posts/${id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
    },
    body:JSON.stringify({post: postObj})
  })
  .then(resp => resp.json())
  .then(posts => this.setState({newPosts: posts}))
  this.props.history.goBack()
}

  updateComment = (e,id,comment) => {
    fetch(`https://got-fansite-backend.herokuapp.com/comments/${id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
    },
    body: JSON.stringify({comment:{message: comment}})
  })
  .then(resp => resp.json())
  .then(comments => this.setState({ newComments: comments.sort(function(a, b){return a.id-b.id}) }) )
  this.props.history.goBack();
  }

  render() {
    const { categories, newPosts, newProfiles, newComments } = this.state
    const { user, setLogin, handleSignUp } = this.props
    const location = window.location.href.split("/")
    return (
      <div className="forum">
      {!location.includes("create") ? <Breadcrumb posts={newPosts} categories={categories}/> : <div>.</div>}
      <hr/>
        <Switch>
          <Route exact path="/forum/comment/edit/:id" render={(props) => <EditComment {...props} updateComment={this.updateComment} comments={newComments}/>}/>
          <Route exact path="/forum/post/edit/:id" render={(props) => <EditPost {...props} updatePost={this.updatePost} posts={newPosts}/>}/>
          <Route path="/forum/create/:id" render={(props) => <PostCreate {...props} postCreate={this.postCreate} user={user}/>}/>
          <Route path="/forum/:categoryId/:id" render={(props) => <Post {...props} postComment={this.postComment} comments={newComments} posts={newPosts} user={user} profiles={newProfiles} setLogin={setLogin} handleSignUp={handleSignUp}/> }/>
          {categories.map( category => {
            const path = `/forum/${category.id}`;
            return <Route key={category.id} path={path} render={(props) => <Discussion {...props} user={user} profiles={newProfiles} category={category} posts={newPosts}/>}/>
          })}
          <Route path='/forum' render={(props) => <Category {...props} posts={newPosts} profiles={newProfiles} categories={categories} />}/>
        </Switch>
        <footer>
          
        </footer>
      </div>
    )
  }
}
export default withRouter(Forum)
