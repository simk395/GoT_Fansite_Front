const host = "http://localhost:3000/"

export class Adapter{ 
    static getCategory = () => {
        return fetch(`${host}/categories`)
            .then(resp => resp.json())
        }
    
    static getPosts = () => {
        return fetch(`${host}/posts`)
        .then(resp => resp.json())
    }

    static getComments = () => {
        return fetch(`${host}/comments`)
        .then(resp => resp.json())
    }

    static getUser = () => {
        return fetch(`${host}/api/v1/users`)
        .then(resp => resp.json())
    }
    static getLikes = () => {
        return fetch("http://localhost:3000/user_likes_comments")
        .then(resp => resp.json())
    }

    static getDislikes = () => {
        return fetch("http://localhost:3000/user_dislikes_comments")
        .then(resp => resp.json())
    }
    static deleteComment = (commentId) => {
      fetch(`http://localhost:3000/comments/${commentId}`,{
      method: "DELETE",
      headers: {'Content-Type': 'application/json'}
    })
    .then(resp => {
      document.querySelector(`div[data-id="${commentId}"]`).remove()
    })
    }
}