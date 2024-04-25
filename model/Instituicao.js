module.exports = class Usuario {
    constructor(banco){
        this._banco = banco;
        this._cnpj = null;
        this._nome_inst = null;
        this._email = null;
        this._senha = null;
        this._rua = null;
        this._numero = null;
        this._bairro = null;
        this._cidade = null;
        this._estado = null;
        this._CEP = null
        this._descricao = null

    }

    async create() {
        
        const md5 = require("md5");
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const cnpj = this.getCnpj() 
            const nome_inst = this.getNomeInst();
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            const rua = this.getRua()
            const numero = this.getNumero()
            const bairro = this.getBairro()
            const cidade = this.getCidade();
            const estado = this.getEstado();
            const cep = this.getCEP()
            const descricao = this.getDescricao()


            const parametros = [
                cnpj,
                nome_inst,
                email,
                senha,
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                descricao
            ];

            let sql = "INSERT INTO `tcc`.`Institiocao` (`cnpj`, `nome_inst`, `email`, `senha`, `rua`, `numero`, `bairro`, `cidade`,`estado`,`CEP`,`descricao`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {   
                    console.log("reject => Institiocao.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Institiocao.create(): " + JSON.stringify(result))
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
                SQL = "SELECT cnpj,nome_inst,email,rua,numero,bairro,cidade,estado,CEP,descricao FROM Instituicao ORDER BY email";
            } if (email != null && senha != null){
                SQL = "SELECT cnpj,nome_inst,email,rua,numero,bairro,cidade,estado,CEP,descricao FROM Instituicao where email=? and senha = ? ORDER BY email;";
            }

            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    console.log("reject => Instituicao.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Instituicao.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        return operacaoAssincrona;
    }

    async update() {
        const md5 = require("md5");
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const cnpj = this.getCnpj() 
            const nome_inst = this.getNomeInst();
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            const rua = this.getRua()
            const numero = this.getNumero()
            const bairro = this.getBairro()
            const cidade = this.getCidade();
            const estado = this.getEstado();
            const cep = this.getCEP()
            const descricao = this.getDescricao()


            const parametros = [
                cnpj,
                nome_inst,
                email,
                senha,
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                descricao
            ];
            const sql = "update Instituicao set nome_inst=?,email=?,senha=?,rua=?,numero=?,bairro=?,cidade=?,estado=?,CEP=?,descricao=? where cnpj =?;";

            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Instituicao.update(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => Instituicao.update(): " + JSON.stringify(result))
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

            const cnpj = this.getCnpj();
            let parametros = [cnpj];
            let sql = "delete from Instituicao where cnpj = ?";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => Instituicao.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    console.log("resolve => Instituicao.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }

    setCnpj(cnpj) {
        this._cnpj = cnpj
    }
    getCnpj() {
        return this._cnpj
    }
    setNomeInst(nome_inst) {
        this._nome_inst = nome_inst;
    }
    getNomeInst() {
        return this._nome_inst;
    }
    setEmail(email) {
        this._email = email;
    }
    getEmail() {
        return this._email;
    }
    setSenha(senha) {
        this._senha = senha;
    }
    getSenha() {
        return this._senha;
    }
    setRua(Rua) {
        this._cidade = Rua;
    }
    getRua() {
        return this._rua;
    }
    setNumero(numero) {
        this._numero = numero;
    }
    getNumero() {
        return this._numero;
    }
    setBairro(bairro) {
        this._bairro = bairro;
    }
    getBairro() {
        return this._bairro;
    }
    setCidade(cidade) {
        this._cidade = cidade;
    }
    getCidade() {
        return this._cidade;
    }
    setEstado(estado) {
        this._estado = estado;
    }
    getEstado() {
        return this._estado;
    }
    setCEP(CEP){
        this._CEP = CEP
    }
    getCEP(){
        return this._CEP
    }
    setDescricao(descricao){
        this._descricao = descricao
    }
    getDescricao(){
        return this._descricao
    }
}