module.exports = class Doacoes {
    constructor(banco){
        this._banco = banco;
        this._id = null;
        this._id_usuario = null;
        this._id_instituicao = null;
        this._produto = null
        this._data_doacao = null
        this._trajetoria = null

    }

    async create() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const idUsuario = this.getIdUsuario()
            const idInstituicao = this.getidInstituicao()
            const produto = this.getproduto()
            const data = this.getDataDoacao()
            


            const parametros = [id,idUsuario,idInstituicao,produto,data];

            let sql = "INSERT INTO `tcc`.`Doacoes` (`id`, `id_usuario`, `id_instituicao`, `produto`, `data_doacao`, `trajetoria`) VALUES (?,?,?,?,?,0);";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {   
                    console.log("reject => Doacoes.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Doacoes.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            
            const id = this.getId();
            let params = [id]
            let SQL = "";

            
            if (id == null) {
                SQL = "SELECT D.id, D.produto, D.data_doacao, D.trajetoria, U.p_nome, U.sobrenome, U.username, U.email, I.NomeInst, I.email, I.rua, I.numero, I.bairro, I.cidade, I.estado, I.CEP, I.descricao FROM Doacoes D INNER JOIN Usuario U ON D.id_usuario = U.id INNER JOIN Instituicao I ON D.id_instituicao = I.cnpj ORDER BY id";
            } if (id != null){
                SQL = "SELECT D.id, D.produto, D.data_doacao, D.trajetoria, U.p_nome, U.sobrenome, U.username, U.email, I.NomeInst, I.email, I.rua, I.numero, I.bairro, I.cidade, I.estado, I.CEP, I.descricao FROM Doacoes D INNER JOIN Usuario U ON D.id_usuario = U.id INNER JOIN Instituicao I ON D.id_instituicao = I.cnpj where id=? ORDER BY id;";
            }

            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    console.log("reject => Doacoes.Read(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Doacoes.Read(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        return operacaoAssincrona;
    }

    async update() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const idUsuario = this.getIdUsuario()
            const idInstituicao = this.getidInstituicao()
            const produto = this.getproduto()
            const data = this.getDataDoacao()
            const trajetoria = this.getTrajetoria()


            const parametros = [idUsuario,idInstituicao,produto,data,trajetoria,id];

            const sql = "update Doacoes set id_usuario=?,id_instituicao=?,produto=?,data_doacao=?,trajetoria=? where id = ?";

            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Doacoes.update(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Doacoes.update(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        return operacaoAssincrona;
    }

    async delete() {
        //cria uma promise que retornará dados referentes a execução de 
        //uma instrução sql no banco.
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const id = this.getId();
            let parametros = [id];
            let sql = "delete from Doacoes where id = ?"; 
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Doacoes.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    console.log("resolve => Doacoes.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }

    setId(id) {
        this._id = id
    }
    getId() {
        return this._id
    }
    setIdUsuario(idUsuario){
        this._id_usuario = idUsuario
    }
    getIdUsuario(){
        return this._id_usuario
    }
    setIdInstituicao(idInstituicao){
        this._id_instituicao = idInstituicao
    }
    getidInstituicao(){
        return this._id_instituicao
    }
    setProduto(produto){
        this._produto = produto
    }
    getproduto(){
        return this._produto
    }
    setDataDoacao(data){
        this._data_doacao = data
    }
    getDataDoacao(){
        return this._data_doacao
    }
    setTrajetoria(trajetoria){
        this._trajetoria = trajetoria
    }
    getTrajetoria(){
        return this._trajetoria
    }

}