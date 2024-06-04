module.exports = class QrCode{
    
    constructor(){
        this._nome = null
        this._local = null
        this._conteudo = null
    }
    
    async create(){
        const qr = require('qr-image')
        const fs = require('fs')
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const qrCode = qr.image(this.getConteudo, { type: 'svg' })
            qrCode.pipe(fs.createWriteStream(`${this.getNome}.svg`))

        })
        return operacaoAssincrona
    }

    setLocal(Local) {
        this.__local = Local
    }
    getLocal() {
        return this._local
    }
    setConteudo(conteudo){
        this._conteudo = conteudo
    }
    getConteudo(){
        return this._conteudo
    }
    setNome(nome){
        this._nome = nome
    }
    getNome(){
        return this._nome
    }
}