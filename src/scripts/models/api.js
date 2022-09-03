import { Modal } from "./modal.js"

export class Api {
    static urlBase = "https://m2-rede-social.herokuapp.com/api/"
    static token = localStorage.getItem("@kenzieRedeSocual:token")
    static header = {
        "Content-Type": "application/json",
        Autorization: `token ${this.token}`
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
                                        localStorage.setItem("@kenzieRedeSocual:token", resp.uuid)
                                        for(let i of inputs) { i.value = "" }
                                        window.location.replace("../homePage/homePage.html")
                                    }
                                    return resp
                                })
                                .catch(erro => console.log(erro))
        return request
    }
}