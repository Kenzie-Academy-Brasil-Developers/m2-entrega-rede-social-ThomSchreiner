import { Modal } from "./modal.js"
import { Render } from "./render.js"

export class Api {
    static urlBase = "https://m2-rede-social.herokuapp.com/api/"
    static token = localStorage.getItem("@kenzieRedeSocial:token")
    static header = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.token}`
    }

    static async createAccount(body, inputs) {
        const request = await fetch(`${this.urlBase}users/`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify(body)
                                })
                                .then(resp => resp.json())
                                .then(resp => {
                                    if(resp.email == "user with this email already exists.") {
                                        Modal.signupErro("Já existe outro usuário com este endereço de email.")

                                    } else {
                                        for(let i of inputs) { i.value = "" }
                                        window.location.replace("../../../index.html")
                                    }
                                    console.log(resp)
                                    return resp
                                })
                                .catch(erro => console.log(erro))
        return request
    }

    static async loginUser(body, inputs) {
        const request = await fetch(`${this.urlBase}users/login/`, {
                                    method: "POST",
                                    headers: this.header,
                                    body: JSON.stringify(body)
                                })
                                .then(resp => resp.json())
                                .then(resp => {
                                    if(resp.non_field_errors) {
                                        Modal.signupErro("O email que você inseriu não está cadastrado, confira seu email ou cadastre-se")
                                    } else {
                                        for(let i of inputs) { i.value = "" }
                                        localStorage.setItem("@kenzieRedeSocial:token", resp.token)
                                        localStorage.setItem("@kenzieRedeSocial:user_uuid", resp.user_uuid)
                                        window.location.replace("./src/pages/homePage/homePage.html")
                                    }
                                    return resp
                                })
                                .catch(erro => console.log(erro))
        return request
    }

    static getUser() {
        const user_uuid = localStorage.getItem("@kenzieRedeSocial:user_uuid")
        const user = fetch(`${this.urlBase}users/${user_uuid}/`, {
                            method: "GET",
                            headers: this.header
                        })
                        .then(resp => resp.json())
                        .then(resp => {
                            Render.getUser(resp)
                            return resp
                        })
                        .catch(erro => console.log(erro))
    }

    static async getSuggestedUsers() {
        const storageCountUser = localStorage.getItem("@KenzieRedeSocial:countUsers")
        let user = ""
        if(storageCountUser == null) {
            user = await fetch(`${this.urlBase}users/?limit=1&offset=1`, {
                                method: "GET",
                                headers: this.header
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                localStorage.setItem("@KenzieRedeSocial:countUsers", resp.count)
                                randomUser(resp.count)
                                return resp
                            })
                            .catch(erro => console.log(erro))
        } else {
            randomUser(storageCountUser)
        }
        
        async function randomUser(countUsers) {
            const offSet = Math.floor(Math.random() * (countUsers-10 - 10) + 10)

            user = await fetch(`${Api.urlBase}users/?limit=10&offset=${offSet}`, {
                                method: "GET",
                                headers: Api.header
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                Render.suggestionToFollow(resp.results)
                                return resp
                            })
                            .catch(erro => console.log(erro))
        }

        return user
    }

    static getAllPosts() {
        const postCount = fetch(`${this.urlBase}posts/`, {
                                method: "GET",
                                headers: this.header
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                getLastPosts(resp.count)
                                return resp
                            })
                            .catch(erro => console.log(erro))

        async function getLastPosts(countPosts) {
            const posts = await fetch(`${Api.urlBase}posts/?limit=50&offset=${countPosts-50}`, {
                                    method: "GET",
                                    headers: Api.header
                                })
                                .then(resp => resp.json())
                                .then(resp => {
                                    Render.getAllPosts(resp.results)
                                    return resp
                                })
                                .catch(erro => console.log(erro))
            return posts
        }
    }

    static async createPost(body, inputs) {
        const post = await fetch(`${this.urlBase}posts/`, {
                                method: "POST",
                                headers: this.header,
                                body: JSON.stringify(body)
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                for(let i of inputs) { i.value = "" }
                                Api.getAllPosts()
                                return resp
                            })
                            .catch(erro => console.log(erro))
        return post
    }

    static async like(body, coracao, countLike) {
        const like = await fetch(`${this.urlBase}likes/`, {
                                method: "POST",
                                headers: this.header,
                                body: JSON.stringify(body)
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                coracao.setAttribute("data-like", resp.uuid)
                                coracao.src = "../../assets/heartRed.png"
                                countLike.innerText = +countLike.innerText + 1
                                return resp
                            })
                            .catch(erro => console.log(erro))
        return like
    }

    static async desLike(idLike, coracao, countLike) {
        const like = await fetch(`${this.urlBase}likes/${idLike}/`, {
                                method: "DELETE",
                                headers: this.header,
                            })
                            .then(resp => {
                                coracao.setAttribute("data-like", "false")
                                coracao.src = "../../assets/heartBlack.png"
                                countLike.innerText = +countLike.innerText - 1
                                return resp
                            })
                            .catch(erro => console.log(erro))
        return like
    }

    static async follow(body, button) {
        const follow = await fetch(`${this.urlBase}users/follow/`, {
                                method: "POST",
                                headers: this.header,
                                body: JSON.stringify(body)
                            })
                            .then(resp => resp.json())
                            .then(resp => {
                                button.setAttribute("data-follow", resp.uuid)
                                button.classList.add("btn__outline__medium__active")
                                button.innerText = "Seguindo"
                                return resp
                            })
                            .catch(erro => console.log(erro))
        return follow
    }

    static async unFollow(idFollow, button) {
        const follow = await fetch(`${this.urlBase}users/unfollow/${idFollow}/`, {
                                method: "DELETE",
                                headers: this.header
                            })
                            .then(resp => {
                                button.setAttribute("data-follow", "false")
                                button.classList.remove("btn__outline__medium__active")
                                button.innerText = "Seguir"
                                return resp
                            })
                            .catch(erro => console.log(erro))
        return follow
    }
}