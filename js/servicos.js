const URL = ' http://localhost:3400/produtos';
let modoEdicao = false;

let listaServicos = [];



let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaServico = document.querySelector('table>tbody');
let modalServico = new bootstrap.Modal(document.getElementById("modal-servico"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    id: document.getElementById('id'),
    nome: document.getElementById('nome'),
    valor: document.getElementById('valor'),
    dataCadastro: document.getElementById('dataCadastro')
}

btnAdicionar.addEventListener('click', () =>{
    modoEdicao = false;
    tituloModal.textContent = "Adicionar cliente"
    limparModalCliente();
    modalServico.show();
});

btnSalvar.addEventListener('click', () => {
   
    let servico = obterServicoDoModal();

 
    if(!servico.nome || !servico.valor){
        alert("Nome e Valor são obrigatórios.")
        return;
    }

    

    (modoEdicao) ? atualizarClienteBackEnd(servico) :  adicionarServicoBackEnd(servico);

});

btnCancelar.addEventListener('click', () => {
    modalServico.hide();
});

function obterServicoDoModal(){

    return {
        id: formModal.id.value,
        nome: formModal.nome.value,
        valor: formModal.valor.value,
        dataCadastro: (formModal.dataCadastro.value) 
                ? new Date(formModal.dataCadastro.value).toISOString()
                : new Date().toISOString()
                
    };
    
}
 
function obterClientes() {

    fetch(URL, {
        method: 'GET',
        headers :{
            'Authorization': obterToken()
        }
    })
        .then(response => response.json())
        .then(servico => {
            listaServicos = servico;
            popularTabela(servico);
        })
        .catch()
}

function editarServico(id){
    modoEdicao = true;
    tituloModal.textContent = "Editar cliente"

    let servico = listaServicos.find(servicos => servicos.id == id);//talvez
    
    atualizarModalCliente(servico);
   
    modalServico.show();

}

function atualizarModalCliente(servico){

    formModal.id.value = servico.id;
    formModal.nome.value = servico.nome;
    formModal.valor.value = servico.valor;
    formModal.dataCadastro.value = servico.dataCadastro.substring(0,10);
}

function limparModalCliente(){

    formModal.id.value ="";
    formModal.nome.value = "";
    formModal.valor.value = "";
    formModal.dataCadastro.value = "";
}

function excluirservico(id){

    let servico = listaServicos.find(c => c.id == id);

    if(confirm("Deseja realmente excluir o cliente " + servico.nome)){
        excluirServicoBackEnd(servico);
       
    }
    popularTabela(listaServicos);
}

function criarLinhaNaTabela(servico) {
    // 1° Criar uma linha da tabela OK
    let tr = document.createElement('tr');

    // 2° Criar as TDs OK
    let tdId = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdValor = document.createElement('td');
    let tdDataCadastro = document.createElement('td');
    let tdAcoes = document.createElement('td');


    // 3° Atualizar as Tds com os valores do cliente OK
    tdId.textContent = servico.id;
    tdNome.textContent = servico.nome;
    tdValor.textContent= servico.valor;
    tdDataCadastro.textContent = new Date(servico.dataCadastro).toLocaleDateString();
    

    tdAcoes.innerHTML = `<button onclick="editarServico(${servico.id})" class="btn btn-outline-primary btn-sm mr-3">
                             Editar
                         </button>
                         <button onclick="excluirservico(${servico.id})" class="btn btn-outline-primary btn-sm mr-3">
                             Excluir
                         </button>`;



    // 4° Adicionar as TDs dentro da linha criei. OK
    tr.appendChild(tdId);
    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdDataCadastro);
    tr.appendChild(tdAcoes);

    // 5° Adicionar a linha na tabela.
    tabelaServico.appendChild(tr);
}

function popularTabela(servico) {

    // Limpar a tabela...
    tabelaServico.textContent = "";

    servico.forEach(servico => {
        criarLinhaNaTabela(servico);
    });
}

function adicionarServicoBackEnd(servico){

    servico.dataCadastro = new Date().toISOString();

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(servico)
    })
    .then(response => response.json())
    .then(response => {

        let novoServico = new Servico(response);
        listaServicos.push(novoServico);

        popularTabela(listaServicos)

        modalServico.hide();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}


function atualizarClienteBackEnd(servico){

    fetch(`${URL}/${servico.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body : JSON.stringify(servico)
    })
    .then(response => response.json())
    .then(() => {
        atualizarServicoNaLista(servico, false);
        modalServico.hide();

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.log(error)
    })
}

function excluirServicoBackEnd(servico) {
    fetch(`${URL}/${servico.id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível excluir o cliente.');
        }
        return response.text();
    })
    .then(() => {
        atualizarServicoNaLista(servico, true);
        modalServico.hide();
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cliente excluído com sucesso!',
            showConfirmButton: false,
            timer: 2500
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function atualizarServicoNaLista(servico, removerServicos){

    let indice = listaServicos.findIndex((c) => c.id == servico.id);

    (removerServicos) 
        ? listaServicos.splice(indice, 1)
        : listaServicos.splice(indice, 1, servico);

    popularTabela(listaServicos);
    
}

obterClientes();