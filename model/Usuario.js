const { promise } = require("bcrypt/promises");

module.exports = class Usuario {
    constructor(banco){
        this._banco = banco;
        this._id = null;
        this._p_nome = null;
        this._sobrenome = null;
        this._username = null;
        this._email = null;
        this._senha = null;
        this._cidade = null;
        this._estado = null;

    }

    async create() {
        
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


            const parametros = [id,p_nome,sobrenome,username,email,senha,cidade,estado];

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
            let params = [email]
            let SQL = "";

            
            if (email == null) {
                SQL = "SELECT id,p_nome,sobrenome,username,email,cidade,estado FROM Usuario ORDER BY email";
            } if (email != null){
                SQL = "SELECT id,p_nome,sobrenome,username,email,cidade,estado FROM Usuario where email=? ORDER BY email;";
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


    async updatepass() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const p_nome = this.getPNome();
            const sobrenome = this.getSobrenome();
            const username = this.getUsername();
            const cidade = this.getCidade();
            const estado = this.getEstado();

            const parametros = [p_nome,sobrenome,username,cidade,estado,id];

            const sql = "update Usuario set p_nome=?,sobrenome=?,username=?,cidade=?,estado=? where id = ?";

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
        return operacaoAssincrona
    }


    async update() {
        const md5 = require("md5");
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const p_nome = this.getPNome();
            const sobrenome = this.getSobrenome();
            const username = this.getUsername();
            const senha = md5(this.getSenha())
            const cidade = this.getCidade();
            const estado = this.getEstado();


            const parametros = [p_nome,sobrenome,username,senha,cidade,estado,id];

            const sql = "update Usuario set p_nome=?,sobrenome=?,username=?,cidade=?,senha=?,estado=? where id = ?";

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

    async sendrec(){
        const nodemailer = require('nodemailer')
        console.log('depuracao')
        const operacaoAssincrona = new promise((resolve,reject) => {
            const codigo = Math.floor(Math.random() * (99999 - 0 + 1)) + 0;
            const transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth:{
                    user: process.env.email,
                    pass: process.env.senhaemail
                }
            })
            const from = 'awstccsde@gmail.com'
            const to = this.getEmail()
            const subject = 'Recuperação de Senha'
            const text = `**olá**
            Este endereço de e-mail foi informado para recuperação digite o codigo abaixo dentrodo aplicativo para prosseguir com a recuperação da mesma
            
            ${codigo}
            
            sistema de doação emergencial`;

            transporter.sendMail({
                from,
                to,
                subject,
                text
            }),(err,info) =>{
                if(err){
                    console.log(err)
                    console.log(info.messageId)
                    reject(err);
                }else{
                    console.log('Email enviado com sucesso!');
                    console.log(info.messageId)
                    resolve(info)
                }
            }
        })
        return operacaoAssincrona;
    }

    async login(){
        const dotenv = require('dotenv')
        const jose = require('jose')
        const {createSecretKey} = require('crypto')
        const md5 = require('md5'); 
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const email = this.getEmail();
            const senha = md5(this.getSenha());
            console.log(email,senha)
            const parametros = [email, senha];
            const sql = `SELECT COUNT(*) AS qtd, id,p_nome,sobrenome,email FROM Usuario WHERE email = ? AND senha = ?;`;

            this._banco.query(sql, parametros, (error, result) => {

                
                console.log(result)

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                   
                    if (result[0].qtd > 0) {
                        const payload = {
                            email: email,
                            senha: senha,
                        }

                        const secret = new TextEncoder().encode(
                            process.env.passworld,
                        )
                        const alg = 'HS256'
                    
                        const token = new jose.SignJWT({ 'urn:example:claim': true })
                        .setProtectedHeader({ alg })
                        .setIssuedAt()
                        .setIssuer('urn:example:issuer')
                        .setAudience('urn:example:audience')
                        .setExpirationTime('2h')
                        .sign(secret)

                        

                        const resposta = {
                            status: true,
                            id: result[0].id,
                            p_nome: result[0].p_nome,
                            sobrenome: result[0].sobrenome,
                            email: result[0].email,
                            token: token
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

    setId(id) {
        this._id = id
    }
    getId() {
        return this._id
    }
    setPNome(P_nome) {
        this._p_nome = P_nome;
    }
    getPNome() {
        return this._p_nome;
    }
    setSobrenome(sobrenome) {
        this._sobrenome = sobrenome;
    }
    getSobrenome() {
        return this._sobrenome;
    }
    setUsername(username) {
        this._username = username;
    }
    getUsername() {
        return this._username;
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
}