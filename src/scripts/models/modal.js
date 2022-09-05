export class ModalErro {
    static body = document.querySelector("body")
    static modal = document.querySelector(".modal__erro")
    static div = document.querySelector(".modal__erro div")
    static p = document.querySelector(".modal__erro p")
    static span = document.querySelector(".modal__erro span")
    static button = document.querySelector(".modal__erro button")

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

export class Modal {
    static eventOpenModal(event) {
        const modal = document.querySelector(".modal")
        const div = document.querySelector(".modal div")
        const imgUser = document.querySelector(".modal div img")
        const h2Nome = document.querySelector(".modal div h2")
        const pTrabalho = document.querySelector(".modal div p")
        const h2Titulo = document.querySelector(".modal__titulo")
        const pDescricao = document.querySelector(".modal__descricao")


        if(event.target.getAttribute("data-modal") == "open") {
            imgUser.src = event.target.closest("li").children[0].children[0].src
            h2Nome.innerText = event.target.closest("li").children[0].children[1].children[0].innerText
            pTrabalho.innerText = event.target.closest("li").children[0].children[1].children[1].innerText
            h2Titulo.innerText = event.target.closest("li").children[1].innerText
            pDescricao.innerText = event.target.closest("li").children[2].innerText
            
            modal.classList.add("show__modal")
            div.classList.add("appear__modal")
        } else {
            modal.classList.add("close__modal")
            div.classList.add("hidden__modal")
            setTimeout(() => {
                modal.classList.remove("show__modal")
                div.classList.remove("appear__modal")
                modal.classList.remove("close__modal")
                div.classList.remove("hidden__modal")
            }, 500)
        }
    }

    static eventCloseModal() {
        const button = document.querySelector(".modal div button[data-modal]")
        button.addEventListener("click", Modal.eventOpenModal)
    }
}

ModalErro.eventCloseModal()
