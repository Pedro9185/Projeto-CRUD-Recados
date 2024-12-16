//Busca usuario logado
const usuarioLogado = buscarDadosDoLocalStorage("usuarioLogado");
//verifica se tem um usuario logado
document.addEventListener("DOMContentLoaded", () => {
  if (!usuarioLogado.email) {
    window.location.href = "./SignIn.html";
  } else {
    mostrarRecados();
  }
});
const listaRecados = usuarioLogado.tasks;
let indiceAtualizacao = -1;

//mostra recados na tela
document.addEventListener("DOMContentLoaded", mostrarRecados());

const formularioCadastro = document.getElementById("form-cadastro");
const formularioUpdate = document.getElementById("form-editar");
const modalExcluir = new bootstrap.Modal("#modal-excluir");
const modalEditar = new bootstrap.Modal("#modal-editar");

formularioCadastro.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const descricao = document.getElementById("inputDescricao").value;
  const detalhamento = document.getElementById("inputDetalhe").value;
  const feedbackHTML = window.document.getElementById("feedback");

  if (!descricao) {
    feedbackHTML.innerHTML =
      '<p style="color: red">O campo descrição não pode estar vazio</p>';

    setTimeout(() => {
      feedbackHTML.innerHTML = "";
    }, 2000);

    return;
  }

  const novoRecado = {
    id: gerarId(),
    descricao: descricao,
    detalhamento: detalhamento,
  };

  listaRecados.push(novoRecado);
  salvarRecados();
  mostrarRecados();
  formularioCadastro.reset();
});

function gerarId() {
  return new Date().getTime();
}

function mostrarRecados() {
  const tbody = document.getElementById("lista-recados");

  tbody.innerHTML = "";

  listaRecados.forEach((recado, indice) => {
    tbody.innerHTML += `
            <tr id="${recado.id}">
                <td>${indice + 1}</td>
                <td>${recado.descricao}</td>
                <td>${recado.detalhamento}</td>
                <td>
                    <button class="btn btn-danger m-1"  aria-label="Excluir" onclick="mostrarModalExcluir(${indice}, ${
      recado.id
    })">
                        <i class="bi bi-trash3">Excluir</i>
                    </button>
                     <button class="btn btn-success m-1" aria-label="Editar" onclick="mostrarModalEditar(${indice})">
                        <i class="bi bi-pencil-square">Editar</i>
                    </button>
                </td>
            </tr>
        `;
  });
}

formularioUpdate.addEventListener("submit", (ev) => {
  ev.preventDefault();

  if (!formularioUpdate.checkValidity()) {
    formularioUpdate.classList.add("was-validated");
    return;
  }

  const descricaoAtualizado = document.getElementById(
    "descricaoAtualizado"
  ).value;
  const detalheAtualizado = document.getElementById("detalheAtualizado").value;

  listaRecados[indiceAtualizacao].descricao = descricaoAtualizado;
  listaRecados[indiceAtualizacao].detalhamento = detalheAtualizado;

  // atualizar storage
  guardarDadosLocalStorage("recados", listaRecados);

  // atualizar html
  mostrarRecados();

  modalEditar.hide();
  formularioUpdate.classList.remove("was-validated");
  formularioUpdate.reset();
  mostrarAlerta("success", "recado atualizado com sucesso!");
  indiceAtualizacao = -1;
});

function mostrarModalEditar(index) {
  const taskAtualizar = listaRecados[index];

  modalEditar.show();
  const descricaoUpdate = document.getElementById("descricaoAtualizado");
  const detalhesUpdate = document.getElementById("detalheAtualizado");

  descricaoUpdate.value = taskAtualizar.descricao;
  detalhesUpdate.value = taskAtualizar.detalhamento;

  indiceAtualizacao = index;
  salvarRecados();
}
function salvarRecados() {
  const listaUsuarios = buscarDadosDoLocalStorage("usuarios");
  const acharUsuario = listaUsuarios.findIndex(
    (v) => v.email === usuarioLogado.email
  );
  listaUsuarios[acharUsuario].tasks = listaRecados;

  guardarDadosLocalStorage("usuarios", listaUsuarios);
  guardarDadosLocalStorage("usuarioLogado", usuarioLogado);
}

function mostrarModalExcluir(index, idRecado) {
  modalExcluir.show();
  const botaoExcluir = document.getElementById("btn-delete");

  botaoExcluir.setAttribute("onclick", `apagarRecado(${index}, ${idRecado})`);
}
function apagarRecado(index, idRecado) {
  usuarioLogado.tasks.splice(index, 1);
  guardarDadosLocalStorage("usuarioLogado", usuarioLogado);
  const trExcluir = document.getElementById(idRecado);
  trExcluir.remove();
  modalExcluir.hide();
  salvarRecados();

  mostrarRecados();
}

function editarRecado(index, idRecado) {}

function sair() {
  salvarRecados();
  window.location.href = "/Projeto-CRUD-Recados/SignIn.html";
  localStorage.removeItem("usuarioLogado");
}

function guardarDadosLocalStorage(chave, valor) {
  const valorJSON = JSON.stringify(valor);
  localStorage.setItem(chave, valorJSON);
}

function buscarDadosDoLocalStorage(chave) {
  const dadosJSON = localStorage.getItem(chave);
  if (dadosJSON) {
    const dadosConvertidos = JSON.parse(dadosJSON);
    return dadosConvertidos;
  } else {
    return [];
  }
}

function buscarDadosStorage(chave) {
  const resultado = localStorage.getItem(chave);

  return JSON.parse(resultado) ?? [{}];
}
