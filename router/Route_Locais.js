const {randomUUID} = require('crypto');
const Locais = require('../model/Locais');

module.exports = function(app,banco){

    app.post('/Locais',(request,response) =>{
        console.log("rota => POST: /Locais");
        const id = randomUUID()
        const cep = request.body.cep
        const estado = request.body.estado
        const cidade = request.body.cidade
        const bairro = request.body.bairro
        const rua = request.body.rua
        const complemento = request.body.complemento

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cep == ""){
            const resposta={
                status: true,
                msg: 'o id do usuario nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(estado == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cidade == ""){
            const resposta={
                status: true,
                msg: 'o cidade não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(bairro == ""){
            const resposta={
                status: true,
                msg: 'a bairro não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(rua == ""){
            const resposta={
                status: true,
                msg: 'a rua não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const locais = new Locais(banco)
            locais.setId(id)
            locais.setCep(cep)
            locais.setEstado(estado)
            locais.setCidade(cidade)
            locais.setbairro(bairro)
            locais.setRua(rua)
            locais.setComplemento(complemento)

            locais.create().then((resultadosBanco) => {
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        cep: locais.getCep(),
                        estado: locais.getEstado(),
                        cidade: locais.getCidade(),
                        bairro: locais.getbairro(),
                        rua: locais.getRua(),
                        complemento: locais.getComplemento()
                    }
                }
                console.log(resultadosBanco)
                response.status(200).send(resposta)
            }).catch((erro) => {
                console.error('Error retrieving users: ',erro)
            })
        }

    })

    app.get('/Locais',(request,response) => {
        const locais = new Locais(banco)
        locais.read().then((resultadosBanco) => {
            const resposta = {
                status: true,
                msg: 'Executado com sucesso',
                dados: resultadosBanco,
                codigo: '003'
            }
            response.status(200).send(resposta)
        }).catch((erro) => {
            const resposta = {
                status: false,
                codigo: '004',
                msg: 'erro ao executar',
                dados: erro
              }
              console.error(erro)
              response.status(200).send(resposta)
        })
    })
    app.get('/Locais/:cep',(request,response) => {
        const locais = new Locais(banco)
        const cep = request.params.cep
        locais.setCep(cep)
        locais.read(cep).then((resultadosBanco) => {
            const resposta = {
                status: true,
                msg: 'Executado com sucesso',
                dados: resultadosBanco,
                codigo: '003'
            }
            response.status(200).send(resposta)
        }).catch((erro) => {
            const resposta = {
                status: false,
                codigo: '004',
                msg: 'erro ao executar',
                dados: erro
              }
              console.error(erro)
              response.status(200).send(resposta)
        })
    })
    app.put('/Locais',(request,response) => {
        const id = request.body.id
        const cep = request.body.cep
        const estado = request.body.estado
        const cidade = request.body.cidade
        const bairro = request.body.bairro
        const rua = request.body.rua
        const complemento = request.body.complemento

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cep == ""){
            const resposta={
                status: true,
                msg: 'o id do usuario nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(estado == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cidade == ""){
            const resposta={
                status: true,
                msg: 'o cidade não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(bairro == ""){
            const resposta={
                status: true,
                msg: 'a bairro não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(rua == ""){
            const resposta={
                status: true,
                msg: 'a rua não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const locais = new Locais(banco)
            locais.setId(id)
            locais.setCep(cep)
            locais.setEstado(estado)
            locais.setCidade(cidade)
            locais.setbairro(bairro)
            locais.setrua(rua)
            locais.setComplemento(complemento)

            locais.update().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        cep: locais.getCep(),
                        estado: locais.getEstado(),
                        cidade: locais.getCidade(),
                        bairro: locais.getbairro(),
                        rua: locais.getRua(),
                        complemento: locais.getComplemento()
                    },
                }
                response.status(200).send(resposta)
            }).catch((erro) =>{
                const resposta = {
                    status: false,
                    msg: 'erro ao executar',
                    codigo: '010',
                    dados: erro,
                  }
                  console.error(erro)
                  response.status(200).send(resposta);
            })
        }
    })

    app.delete('/locais/:id', (request,response) => {
        const id = request.params.id
        const locais = new Locais(banco)
        locais.setId(id)
        locais.delete().then((resultadosBanco) =>{
            const resposta = {
                status: true,
                msg: 'Excluido com sucesso',
                codigo: '008',
                dados: {
                  id: locais.getId(),
                },
              }
              response.status(200).send(resposta)
        }).catch((erro) => {
            const resposta = {
                status: false,
                msg: 'erro ao executar',
                codigo: '009',
                dados: erro,
               }
            console.error(erro)
            response.status(200).send(resposta)
        })
    })
}