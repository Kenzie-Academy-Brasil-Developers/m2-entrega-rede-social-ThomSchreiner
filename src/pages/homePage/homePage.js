import { Api } from "../../scripts/models/api.js";


export class Render {
    static getUser(user) {
        const imgUser = document.querySelector(".form__user .user img")
        const h2Nome = document.querySelector(".form__user .user h2")
        const pTrabalho = document.querySelector(".form__user .user p")
        const spanSeguidores = document.querySelector(".form__user .user span")

        if(user.image.split("", 8).join("") !== "https://") {
            imgUser.src = "../../assets/user.png"
        } else {
            imgUser.src = user.image
        }
        h2Nome.innerText = user.username
        pTrabalho.innerText = user.work_at
        spanSeguidores.innerText = `${user.followers_amount} seguidores`
    }

    static logOut() {
        const btnLogOut = document.querySelector("button[data-btn-logout]")
        
        btnLogOut.addEventListener("click", () => {
            localStorage.removeItem("@kenzieRedeSocial:user_uuid")
            localStorage.removeItem("@kenzieRedeSocial:token")
            localStorage.removeItem("@KenzieRedeSocial:countUsers")
            window.location.replace("../../../index.html")
        })
    }

    static getAllPosts(posts) {
        posts = posts.reverse()
        const ulPosts = document.querySelector("main ul")
        ulPosts.innerHTML = ""

        posts.forEach(post => {
            // post header
            const li = document.createElement("li")
            const divUser = document.createElement("div")
            const imgUser = document.createElement("img")
            const div2 = document.createElement("div")
            const h2Nome = document.createElement("h2")
            const pTrabalho = document.createElement("p")
            // post body
            const h2Titulo = document.createElement("h2")
            const pDescricao = document.createElement("p")
            // post footer
            const divFooter = document.createElement("div")
            const button = document.createElement("button")
            const imgLike = document.createElement("img")
            const spanLike = document.createElement("span")

            divUser.classList.add("user")
            h2Nome.classList.add("title-2")
            pTrabalho.classList.add("text-2")
            h2Titulo.classList.add("title-1")
            pDescricao.classList.add("text-1")
            divFooter.classList.add("user__footer")
            button.classList.add("btn", "btn__grey1")
            spanLike.classList.add("text-2")

            li.key = post.uuid
            li.id = post.uuid
            if(post.author.image.split("", 8).join("") !== "https://") {
                imgUser.src = "../../assets/user.png"
            } else {
                imgUser.src = post.author.image
            }
            imgUser.alt = post.author.username
            h2Nome.innerText = post.author.username
            pTrabalho.innerText = post.author.work_at
            h2Titulo.innerText = post.title
            pDescricao.innerText = post.description
            imgLike.src = "../../assets/heartBlack.png"
            imgLike.alt = "like"
            imgLike.id = post.uuid
            button.innerText = "Abrir Post"
            spanLike.innerText = post.likes.length

            div2.append(h2Nome, pTrabalho)
            divUser.append(imgUser, div2)
            divFooter.append(button, imgLike, spanLike)
            li.append(divUser, h2Titulo, pDescricao, divFooter)
            ulPosts.appendChild(li)
        })
    }

    static suggestionToFollow(users) {
        const user = []
        const jaFoi = []
        let maxUser = 3
        for(let i = 0; i < maxUser; i++) {
            let random = Math.floor(Math.random() * (11 - 1))
            if(!jaFoi.includes(random)) {
                user.push(users[i])
                jaFoi.push(random)
            } else {
                maxUser++
            }
        }
        
        this.renderSuggestedUsers(user)
    }

    static renderSuggestedUsers(users) {
        const ulAside = document.querySelector("aside ul")
        ulAside.innerHTML = ""

        users.forEach((user) => {
            const li = document.createElement("li")
            const divHeader = document.createElement("div")
            const img = document.createElement("img")
            const divBody = document.createElement("div")
            const h2Nome = document.createElement("h2")
            const pTrabalho = document.createElement("p")
            const divFooter = document.createElement("div")
            const button = document.createElement("button")

            li.classList.add("user")
            divHeader.classList.add("user__header")
            h2Nome.classList.add("title-2")
            pTrabalho.classList.add("text-2")
            button.classList.add("btn__outline__medium")

            li.key = user.uuid
            li.id = user.uuid
            if(user.image.split("", 8).join("") !== "https://") {
                img.src = "../../assets/user.png"
            } else {
                img.src = user.image
            }
            img.alt = user.username
            h2Nome.innerText = user.username
            pTrabalho.innerText = user.work_at
            button.innerText = "Seguir"
            button.id = user.uuid

            divBody.append(h2Nome, pTrabalho)
            divHeader.append(img, divBody)
            divFooter.appendChild(button)
            li.append(divHeader, divFooter)
            ulAside.appendChild(li)
        })
    }

    static createPost() {
        const form = document.querySelector(".form__user form")
        const input = document.querySelector(".form__user form input")
        const textarea = document.querySelector(".form__user form textarea")
        const button = document.querySelector(".form__user form button")
        const verificarBtn = {INPUT: false, TEXTAREA: false}

        for(let i of [input, textarea]) {
            i.addEventListener("keyup", () => {
                if(i.value == "") {
                    verificarBtn[i.tagName] = false
                } else {
                    verificarBtn[i.tagName] = true
                }
                
                if(verificarBtn.INPUT == true && verificarBtn.TEXTAREA == true) {
                    if(button.classList.contains("btn__disabled")) {
                        button.classList.remove("btn__disabled")
                        button.setAttribute("type", "submit")
                    }
                } else {
                    if(!button.classList.contains("btn__disabled")) {
                        button.classList.add("btn__disabled")
                        button.setAttribute("type", "button")
                    }
                }
            })
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault()

            for(let i of [input, textarea]) {
                if(i.value == "") {
                    return true
                }
            }

            const body = {
                title: input.value,
                description: textarea.value
            }

            Api.createPost(body, [input, textarea])
        })
    }
}

Render.logOut()
Api.getUser()
Api.getAllPosts()
Api.getSuggestedUsers()
Render.createPost()