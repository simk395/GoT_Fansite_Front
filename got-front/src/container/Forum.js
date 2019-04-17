import React, { Component } from 'react'
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { Adapter } from '../Adapter'
import Category from '../component/Category'
import Discussion from '../component/Discussion'
import Post from '../component/Post'
import PostCreate from '../component/PostCreate'
import EditPost from '../component/EditPost'
import EditComment from '../component/EditComment'
import { Breadcrumb } from 'react-bootstrap'


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
  
  componentWillMount(){
    Adapter.getCategory().then(categories => this.setState({categories:categories}));
    Adapter.getPosts().then(posts => this.setState({posts: posts, newPosts: posts}))
    Adapter.getUser().then(profiles => this.setState({profiles:profiles, newProfiles: profiles}))
    Adapter.getComments().then(comments => this.setState({comments:comments, newComments: comments}));
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
      fetch('http://localhost:3000/posts', {
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
  render() {
    const { categories, newPosts, newProfiles, newComments } = this.state
    const { user, setLogin, handleSignUp } = this.props
    return (
      <div className="forum">
      <Breadcrumb>
      <Breadcrumb.Item>
          <Link to="/forum"> Forum </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active="false">
          Library
        </Breadcrumb.Item>
      </Breadcrumb>
      <hr/>
        <Switch>
          <Route exact path="/forum/comment/edit/:id" render={() => <EditComment comments={newComments}/>}/>
          <Route exact path="/forum/post/edit/:id" render={() => <EditPost posts={newPosts}/>}/>
          <Route path="/forum/create/:id" render={(props) => <PostCreate {...props} postCreate={this.postCreate} user={user}/>}/>
          <Route path="/forum/:categoryId/:id" render={() => <Post posts={newPosts} user={user} profiles={newProfiles} setLogin={setLogin} handleSignUp={handleSignUp}/> }/>
          {categories.map( category => {
            const path = `/forum/${category.id}`;
            return <Route key={category.id} path={path} render={(props) => <Discussion {...props} user={user} profiles={newProfiles} category={category} posts={newPosts}/>}/>
          })}
          <Route path='/forum' render={() => <Category categories={categories} />}/>
        </Switch>
      </div>
    )
  }
}

// {categories.map(category => {
//   const path = `/forum/${category.id}`
//   <Route path={path} render={(props) => <Discussion {...props} user={user} profiles={newProfiles} id={category.id} posts={posts} categories={categories}/> }/>
//   )}
// }
// <Route path='/forum' render={() => <Category categories={categories} />}/>
export default withRouter(Forum)
