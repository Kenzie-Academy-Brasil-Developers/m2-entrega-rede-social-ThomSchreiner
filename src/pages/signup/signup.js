import { Api } from "../../scripts/models/api.js"

class Signup {
    static async createAccount() {
        const inputs = document.querySelectorAll("form input")
        for(let i of inputs) {
            if(i.value == "") {
                return true
            }
        }
        
        const body  = {
            "username": inputs[0].value,
            "email": inputs[1].value.toLowerCase(),
            "password": inputs[2].value,
            "work_at": inputs[3].value,
            "image": inputs[4].value
        }
        await Api.createAccount(body, inputs)
    }

    static events() {
        const form = document.querySelector("form")
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            Signup.createAccount()
        })
    }
}

Signup.events()