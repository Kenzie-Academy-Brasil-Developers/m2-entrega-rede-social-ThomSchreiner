import { Api } from "../../scripts/models/api.js";
import { Render } from "../../scripts/models/render.js";


class HomePage {
    static logOut() {
        const btnLogOut = document.querySelector("button[data-btn-logout]")
        
        btnLogOut.addEventListener("click", () => {
            localStorage.removeItem("@kenzieRedeSocial:user_uuid")
            localStorage.removeItem("@kenzieRedeSocial:token")
            localStorage.removeItem("@KenzieRedeSocial:countUsers")
            window.location.replace("../../../index.html")
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

    static like() {
        
    }
}

HomePage.logOut()
Api.getUser()
Api.getAllPosts()
Api.getSuggestedUsers()
HomePage.createPost()