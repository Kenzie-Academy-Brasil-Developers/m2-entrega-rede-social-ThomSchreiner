export class Modal {
    static body = document.querySelector("body")
    static modal = document.querySelector(".modal")
    static div = document.querySelector(".modal div")
    static p = document.querySelector(".modal p")
    static span = document.querySelector(".modal span")
    static button = document.querySelector(".modal button")

    static loginErro(mensagem) {
        this.p.innerText = "Cadastro não autorizado"
        this.span.innerText = mensagem
        this.modal.classList.add("show__modal")
        this.div.classList.add("div")
    }

    static signupErro(mensagem) {
        this.p.innerText = "Atenção!"
        this.span.innerText = mensagem
        this.modal.classList.add("show__modal")
        this.div.classList.add("div")
    }

    static eventCloseModal() {
        this.button.addEventListener("click", () => {
            this.modal.classList.add("close__modal")
            setTimeout(() => {
                this.modal.classList.remove("show__modal")
                this.div.classList.remove("div")
                this.modal.classList.remove("close__modal")
            }, 800)
        })
    }
}

Modal.eventCloseModal()
