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
    
    static postComments = (id, message) => {
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "applcation.json"
            },
            body:JSON.stringify({
                post_id: id, profile_id: 1, message: message
            })
        }).then(resp => {
            const allComments = document.querySelector(".forum__post__comments")
            const newComment = document.createElement("div")
            newComment.innerText = message
            allComments.append(newComment)
        })
    }
}