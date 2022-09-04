import { Api } from "../../scripts/models/api.js";


class Render {
    static async getUser() {
        const user = await Api.getUser()
        
        const imgUser = document.querySelector(".form__user .user img")
        const h2Nome = document.querySelector(".form__user .user h2")
        const pTrabalho = document.querySelector(".form__user .user p")
        const spanSeguidores = document.querySelector(".form__user .user span")

        imgUser.src = user.image
        h2Nome.innerText = user.username
        pTrabalho.innerText = user.work_at
        spanSeguidores.innerText = `${user.followers_amount} seguidores`
    }

    static logOut() {
        const btnLogOut = document.querySelector("button[data-btn-logout]")
        
        btnLogOut.addEventListener("click", () => {
            localStorage.removeItem("@kenzieRedeSocial:user_uuid")
            localStorage.removeItem("@kenzieRedeSocial:token")
            window.location.replace("../../../index.html")
        })
    }

    static async getAllPosts() {
        const posts = await Api.getAllPosts()
        this.renderPosts(posts.results)
    }

    static renderPosts(posts) {
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
            imgUser.src = post.author.image
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

}

Render.getUser()
Render.logOut()
Render.getAllPosts()