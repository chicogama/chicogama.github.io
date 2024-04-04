class Mensagem {

    constructor() {
        if (JSON.parse(localStorage.getItem('mensagem'))) {
            this.mensagens = JSON.parse(localStorage.getItem('mensagem'));
        } else {

            this.mensagens = [];
        }
    }

    geraId() {
        return Math.floor(Math.random() * 1000)
    }

    gravarMsg() {
        this.formname = document.getElementById('nomeform').value;
        this.formmail = document.getElementById('mailform').value;
        this.formmsg = document.getElementById('msgform').value;

        this.novaMensagem({ id: this.geraId(), nome: this.formname, email: this.formmail, msg: this.formmsg })

        swal("Mensagem enviada", "Sua mensagem foi enviada", "success");

        document.getElementById('nomeform').value = "";
        document.getElementById('mailform').value = "";
        document.getElementById('msgform').value = "";

    }

    novaMensagem(msg) {
        this.mensagens.push(msg);
        console.log(this.mensagens)
        localStorage.setItem('mensagem', JSON.stringify(this.mensagens));
    }

    listarMsg() {
        this.msgRecebida = JSON.parse(localStorage.getItem('mensagem'));
        for (let i = 0; i < this.msgRecebida.length; i++) {
            let tr = tbody.insertRow();

            let td_name = tr.insertCell();
            let td_mail = tr.insertCell();
            let td_msg = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_name.innerText = this.msgRecebida[i].nome;
            td_mail.innerText = this.msgRecebida[i].email;
            td_msg.innerText = this.msgRecebida[i].msg;

            let deleteIcon = document.createElement('i');
            td_acoes.appendChild(deleteIcon);
            deleteIcon.classList.add("fa-regular")
            deleteIcon.classList.add("fa-trash-can");
            /* deleteIcon.setAttribute("onclick", "mensagem.deletarUma(" + this.arr[i].id + ")"); */

        }
    }


    limparMsg() {
        swal({
                title: "DELETANDO MENSAGENS",
                text: "Tem certeza que deseja deletar todas as mensagens?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    localStorage.clear();
                    /* alert("Mensagens excluídas"); */
                    window.location.reload();
                    swal("Mensagens deletadas", {
                        icon: "success",
                    });
                } else {
                    swal("Cancelado");
                }
            })

    }
}

var mensagem = new Mensagem();
/* var navbar = new Navbar(); */