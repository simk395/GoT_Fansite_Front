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

    static postComment = (commentObj) => {
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: localStorage.token
            },
            body:JSON.stringify({comment:commentObj})
        }).then(resp => resp.json())
        .then(comment => {
            console.log(comment)
            const allComments = document.querySelector(".fp_allComments")
            const newComment = document.createElement("div")
            newComment.innerHTML = comment.message
            allComments.append(newComment)
        })
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