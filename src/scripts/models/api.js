import { Modal } from "./modal.js"

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
                                    headers: this.header,
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

    static async getUser() {
        const user_uuid = localStorage.getItem("@kenzieRedeSocial:user_uuid")
        const user = await fetch(`${this.urlBase}users/${user_uuid}/`, {
                                method: "GET",
                                headers: this.header
                            })
                            .then(resp => resp.json())
                            .then(resp => resp)
                            .catch(erro => console.log(erro))
        return user
    }

    static async getAllPosts() {
        const posts = await fetch(`${this.urlBase}posts/`, {
                                method: "GET",
                                headers: this.header
                            })
                            .then(resp => resp.json())
                            .then(resp => resp)
                            .catch(erro => console.log(erro))
        return posts
    }
}