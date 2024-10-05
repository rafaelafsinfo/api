module.exports = class locais {
    constructor(banco){
        this._banco = banco;
        this._id = null;
        this._cep = null;
        this._estado = null;
        this._cidade = null
        this._bairro = null
        this._rua = null
        this._complemento = null

    }

    async create() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const Cep = this.getCep()
            const estado = this.getEstado()
            const cidade = this.getCidade()
            const bairro = this.getbairro()
            const rua = this.getRua()
            const Complemento = this.getComplemento()
            


            const parametros = [id,Cep,estado,cidade,bairro,rua,Complemento];


            let sql = "INSERT INTO `tcc`.`locais` (`id`, `cep`, `estado`, `cidade`, `bairro`, `rua`,`complemento`) VALUES (?,?,?,?,?,?,?);";
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {   
                    console.log("reject => locais.create(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => locais.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read() {
        
        const operacaoAssincrona = new Promise((resolve, reject) => {
            
            const cpf = this.getCep();
            let params = [cpf]
            let SQL = "";

            
            if (cpf == null) {
                SQL = "SELECT id,cep,estado,cidade,bairro,rua,complemento FROM locais ORDER BY cep";
            } if (cpf != null){
                SQL = "SELECT id,cep,estado,cidade,bairro,rua,complemento FROM locais where cep=? ORDER BY cep;";
            }

            this._banco.query(SQL, params, function (error, result) {
                if (error) {
                    console.log("reject => locais.Read(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => locais.Read(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        return operacaoAssincrona;
    }

    async update() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const id = this.getId() 
            const Cep = this.getCep()
            const estado = this.getEstado()
            const cidade = this.getCidade()
            const bairro = this.getbairro()
            const rua = this.getRua()
            const Complemento = this.getComplemento()
            


            const parametros = [Cep,estado,cidade,bairro,rua,Complemento,id];

            const sql = "update locais set cep=?,estado=?,cidade=?,bairro=?,rua=?,complemento=? where id = ?";

            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => locais.update(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => locais.update(): " + JSON.stringify(result))
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
            let sql = "delete from locais where id = ?"; 
            this._banco.query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => locais.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                    console.log("resolve => locais.delete(): " + JSON.stringify(result))
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
    setCep(Cep){
        this._id_usuario = Cep
    }
    getCep(){
        return this._id_usuario
    }
    setEstado(Estado){
        this._estado = Estado
    }
    getEstado(){
        return this._estado
    }
    setCidade(Cidade){
        this._cidade = Cidade
    }
    getCidade(){
        return this._cidade
    }
    setbairro(bairro){
        this._bairro = bairro
    }
    getbairro(){
        return this._bairro
    }
    setRua(rua){
        this._rua = rua
    }
    getRua(){
        return this._rua
    }
    setComplemento(Complemento){
        this._complemento = Complemento
    }
    getComplemento(){
        return this._complemento
    }

}