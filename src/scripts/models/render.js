import { Api } from "./api.js"

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

    static getAllPosts(posts) {
        posts = posts.reverse()
        const ulPosts = document.querySelector("main ul")
        const user_uuid = localStorage.getItem("@kenzieRedeSocial:user_uuid")
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
            imgLike.alt = "like"
            imgLike.id = post.uuid
            button.innerText = "Abrir Post"
            spanLike.innerText = post.likes.length

            let verificarLike = post.likes.find((element) => {
                if(element.user.uuid == user_uuid) {
                    return true
                }
            })
            if(verificarLike == undefined) {
                imgLike.setAttribute("data-like", "false")
                imgLike.src = "../../assets/heartBlack.png"
            } else {
                imgLike.setAttribute("data-like", verificarLike.uuid)
                imgLike.src = "../../assets/heartRed.png"
            }

            div2.append(h2Nome, pTrabalho)
            divUser.append(imgUser, div2)
            divFooter.append(button, imgLike, spanLike)
            li.append(divUser, h2Titulo, pDescricao, divFooter)
            ulPosts.appendChild(li)

            imgLike.addEventListener("click", eventLike)
        })
    }

    static suggestionToFollow(users) {
        const user = []
        const jaFoi = []
        let maxUser = 3
        for(let i = 0; i < maxUser; i++) {
            let random = Math.floor(Math.random() * (51 - 1))
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
        const user_uuid = localStorage.getItem("@kenzieRedeSocial:user_uuid")
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
            button.id = user.uuid

            let verifyFollow = user.followers.find((element) => {
                if(element.followers_users_id.uuid == user_uuid) {
                    return true
                }
            })
            if(verifyFollow == undefined) {
                button.setAttribute("data-follow", "false")
                button.innerText = "Seguir"
            } else {
                button.setAttribute("data-follow", verificarLike.uuid)
                button.classList.add("btn__outline__medium__active")
                button.innerText = "Seguindo"
            }

            divBody.append(h2Nome, pTrabalho)
            divHeader.append(img, divBody)
            divFooter.appendChild(button)
            li.append(divHeader, divFooter)
            ulAside.appendChild(li)

            button.addEventListener("click", follow)
        })
    }
}

function eventLike(event) {
    if(event.target.getAttribute("data-like") == "false") {
        const body = { "post_uuid": event.target.id }
        Api.like(body, event.target, event.target.nextElementSibling)
    } else {
        Api.desLike(event.target.getAttribute("data-like"), event.target, event.target.nextElementSibling)
    }
}

function follow(event) {

    if(event.target.getAttribute("data-follow") == "false") {
        const body = { "following_users_uuid": event.target.id }
        Api.follow(body, event.target)
    } else {
        Api.unFollow(event.target.getAttribute("data-follow"), event.target)
    }
}