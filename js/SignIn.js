let listaUsuarios = buscarDadosDoLocalStorage("usuarios")

const formularioHTML = document.getElementById("form-login")

formularioHTML.addEventListener("submit", (ev) => {
    ev.preventDefault()

    const email = document.getElementById("inputEmail").value
    const password = document.getElementById("inputPassword").value

    const usuarioLogado = listaUsuarios.find((valor) => valor.email === email && valor.password === password)

    if (!usuarioLogado) {
        alert("E-mail ou senha não existem")
        return;
    } else {
        guardarDadosLocalStorage("usuarioLogado", usuarioLogado)


        window.location.href = './Tasks.html'
    }

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