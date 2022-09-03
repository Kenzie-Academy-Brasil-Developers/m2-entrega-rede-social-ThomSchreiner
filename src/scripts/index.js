import { Api } from "./models/api.js";
import { Modal } from "./models/modal.js";

class Login {
    static async loginAccount() {
        const inputs = document.querySelectorAll("form input")
        for(let i of inputs) {
            if(i.value == "") {
                return true
            }
        }
        
        const body  = {
            "email": inputs[0].value.toLowerCase(),
            "password": inputs[1].value
        }
        await Api.loginUser(body, inputs)
    }

    static events() {
        const form = document.querySelector("form")
        form.addEventListener("submit", (event) => {
            event.preventDefault()
            Login.loginAccount()
        })
    }
}

Login.events()



// setTimeout(() => {
//     Modal.loginErro("Essa conta não existe, logo não pode acessar a página dos posts")
// }, 1000)


