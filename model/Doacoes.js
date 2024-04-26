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
        
        const md5 = require("md5");
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const idUsuario = this.getIdUsuario()
            const idInstituicao = this.getidInstituicao()
            const produto = this.getproduto()
            const data = this.getDataDoacao()
            const trajetoria = this.getTrajetoria()


            const parametros = [id,idUsuario,idInstituicao,produto,data,trajetoria];

            let sql = "INSERT INTO `tcc`.`Usuario` (`id`, `p_nome`, `sobrenome`, `username`, `email`, `senha`, `cidade`, `estado`) VALUES (?,?,?,?,?,?,?,?);";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {   
                    console.log("reject => Usuario.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Usuario.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            
            const email = this.getEmail();
            const senha = this.getSenha()
            let params = [email,senha]
            let SQL = "";

            
            if (email == null || senha == null) {
                SQL = "SELECT id,p_nome,sobrenome,username,email,cidade,estado FROM Usuario ORDER BY email";
            } if (email != null && senha != null){
                SQL = "SELECT id,p_nome,sobrenome,username,email,cidade,estado FROM Usuario where email=? and senha = ? ORDER BY email;";
            }

            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    console.log("reject => Usuario.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Usuario.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        return operacaoAssincrona;
    }

    async update() {
        const md5 = require("md5");
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const p_nome = this.getPNome();
            const sobrenome = this.getSobrenome();
            const username = this.getUsername();
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            const cidade = this.getCidade();
            const estado = this.getEstado();


            const parametros = [p_nome,sobrenome,username,email,senha,cidade,estado,id];

            const sql = "update Usuario set p_nome=?,sobrenome=?,username=?,email=?,senha=?,cidade=?,estado=? where id = ?";

            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Usuario.update(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Usuario.update(): " + JSON.stringify(result))
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
            let sql = "delete from Usuario where id = ?";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Usuario.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    console.log("resolve => Usuario.delete(): " + JSON.stringify(result))
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