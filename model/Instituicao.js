module.exports = class Instituicao {
    constructor(banco){
        this._banco = banco;
        this._Cnpj = null;
        this._nome_inst = null;
        this._Email = null;
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
            const Cnpj = this.getCnpj() 
            const nome_inst = this.getNomeInst();
            const Email = this.getEmail();
            const senha = md5(this.getSenha());
            const rua = this.getRua()
            const numero = this.getNumero()
            const bairro = this.getBairro()
            const cidade = this.getCidade();
            const estado = this.getEstado();
            const cep = this.getCEP()
            const descricao = this.getDescricao()


            const parametros = [
                Cnpj,
                nome_inst,
                Email,
                senha,
                rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                descricao
            ];

            let sql = "INSERT INTO `tcc`.`Instituicao` (`Cnpj`, `NomeInst`, `Email`, `Senha`, `Rua`, `Numero`, `Bairro`, `Cidade`,`Estado`,`CEP`,`Descricao`) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
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
            
            const Email = this.getEmail();
            let params = [Email]
            let SQL = "";

            
            if (Email == null) {
                SQL = "SELECT Cnpj,NomeInst,Email,Rua,Numero,Bairro,Cidade,Estado,CEP,Descricao FROM Instituicao ORDER BY Email";
            } if (Email != null){
                SQL = "SELECT Cnpj,NomeInst,Email,Rua,Numero,Bairro,Cidade,Estado,CEP,Descricao FROM Instituicao where Email=? ORDER BY Email;";
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
            const Cnpj = this.getCnpj() 
            const NomeInst = this.getNomeInst();
            const Rua = this.getRua()
            const numero = this.getNumero()
            const bairro = this.getBairro()
            const cidade = this.getCidade();
            const estado = this.getEstado();
            const cep = this.getCEP()
            const descricao = this.getDescricao()

            const parametros = [
                NomeInst,
                Rua,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                descricao,
                Cnpj
            ];
            const sql = "update Instituicao set NomeInst=?,Rua=?,Numero=?,Bairro=?,Cidade=?,Estado=?,CEP=?,Descricao=? where Cnpj =?;";

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

            const Cnpj = this.getCnpj();
            let parametros = [Cnpj];
            let sql = "delete from Instituicao where Cnpj = ?";
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
            const Email = this.getEmail();
            const Senha = md5(this.getSenha());
            console.log(Email,Senha)
            const parametros = [Email, Senha];
            const sql = `SELECT COUNT(*) AS qtd, Cnpj,NomeInst,Email,Descricao FROM Instituicao WHERE Email = ? AND Senha = ?;`;

            this._banco.query(sql, parametros, (error, result) => {

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                   
                    if (result) {
                        const resposta = {
                            status: true,
                            Cnpj: result[0].Cnpj,
                            NomeInst: result[0].NomeInst,
                            Email: result[0].Email,
                            Descricao: result[0].Descricao
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

    setCnpj(Cnpj) {
        this._Cnpj = Cnpj
    }
    getCnpj() {
        return this._Cnpj
    }
    setNomeInst(nome_inst) {
        this._nome_inst = nome_inst;
    }
    getNomeInst() {
        return this._nome_inst;
    }
    setEmail(Email) {
        this._Email = Email;
    }
    getEmail() {
        return this._Email;
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