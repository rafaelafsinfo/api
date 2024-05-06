module.exports = class Instituicao {
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

            let sql = "INSERT INTO `tcc`.`Instituicao` (`cnpj`, `nome_inst`, `email`, `senha`, `rua`, `numero`, `bairro`, `cidade`,`estado`,`CEP`,`descricao`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
            this._banco.query(sql, parametros, function (error, result) {
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
    async read() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            
            const cnpj = this.getCnpj();
            let params = [cnpj]
            let SQL = "";

            
            if (cnpj == null) {
                SQL = "SELECT cnpj,nome_inst,email,rua,numero,bairro,cidade,estado,CEP,descricao FROM Instituicao ORDER BY email";
            } if (cnpj != null){
                SQL = "SELECT cnpj,nome_inst,email,rua,numero,bairro,cidade,estado,CEP,descricao FROM Instituicao where cnpj=? ORDER BY email;";
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
    async login(){
        const md5 = require('md5'); 
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            console.log(email,senha)
            const parametros = [email, senha];
            const sql = `SELECT COUNT(*) AS qtd, cnpj,nome_inst,email,descricao FROM Instituicao WHERE email = ? AND senha = ?;`;

            this._banco.query(sql, parametros, (error, result) => {
                console.log(result)

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                   
                    if (result[0].qtd > 0) {
                        const resposta = {
                            status: true,
                            cnpj: result[0].cnpj,
                            nome_inst: result[0].nome_inst,
                            email: result[0].email,
                            descricao: result[0].descricao
                        }
                        resolve(resposta);
                    } else {
                        const resposta = {
                            status: false,
                        }
                        resolve(resposta);
                    }

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

    async login(){
        const md5 = require('md5'); 
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            console.log(email,senha)
            const parametros = [email, senha];
            const sql = `SELECT COUNT(*) AS qtd, cnpj,nome_inst,email,descricao FROM Instituicao WHERE email = ? AND senha = ?;`;

            this._banco.query(sql, parametros, (error, result) => {

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                   
                    if (result) {
                       // console.log(result)
                        const resposta = {
                            status: true,
                            cnpj: result[0].cnpj,
                            nome_inst: result[0].nome_inst,
                            email: result[0].email,
                            descricao: result[0].descricao
                        }
                        resolve(resposta);
                    } else {
                        const resposta = {
                            status: false,
                        }
                        resolve(resposta);
                    }

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
        this._rua = Rua;
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