class Servico {
   
    constructor(obj){
        obj = obj || {};
        this.id = obj.id;
        this.nome = obj.nome;
        this.valor = obj.valor;
        this.quantidadeEstoque = obj.quantidadeEstoque;
        this.observacao = obj.observacao;
        this.foto = obj.foto;
        this.dataCadastro = obj.dataCadastro;
    }

    constructor(id, nome, valor, dataCadastro) {
        this.id = id.id;
        this.nome = nome.nome;
        this.valor = valor.valor;
        this.dataCadastro = dataCadastro.dataCadastro;
    }
}