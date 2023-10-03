let listaUsuarios = buscarDadosDoLocalStorage("usuarios")
const listaRecados = buscarDadosDoLocalStorage("tasks")

const cadastroHTML = window.document.getElementById('form-signup')

document.addEventListener("submit", (ev) => {
    ev.preventDefault()

    const email = document.getElementById('inputEmail').value
    const password = document.getElementById('inputPassword').value
    const repassword = document.getElementById('inputRepassword').value

    const feedbackHTML = window.document.getElementById('feedback')

    if (password !== repassword) {

        feedbackHTML.innerHTML = '<p style="color: red">As senhas não conferem, verifique sua senha e tente novamente</p>'

        setTimeout(() => {
            feedbackHTML.innerHTML = ''
        }, 2000)
        return;
    }

    const novoUsuario = {
        email: email,
        password: password,
        tasks: listaRecados
    }

    const existe = listaUsuarios.some((e) => e.email === email)

    if (existe) {
        alert("Esse e-mail já está em uso, tente novamente com outro e-mail")
        return;
    }

    listaUsuarios.push(novoUsuario)

    guardarDadosLocalStorage("usuarios", listaUsuarios)

    cadastroHTML.reset()

    alert("Usuario criado com Sucesso")

    window.location.href = "./SignIn.html"
})


function guardarDadosLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)
    localStorage.setItem(chave, valorJSON)
}

function buscarDadosDoLocalStorage(chave) {
    const dadosJSON = localStorage.getItem(chave)
    if (dadosJSON) {
        const dadosConvertidos = JSON.parse(dadosJSON)
        return dadosConvertidos;
    } else {
        return []
    }
}