const {randomUUID} = require('crypto');

module.exports = function(app,banco){
    const Doacoes = require('../model/Doacoes');

    app.post('/Doacoes',cors(corsOptions),(request,response) =>{
        console.log("rota => POST: /Doacoes");
        const id = randomUUID()
        const id_usuario = request.body.id_usuario
        const id_instituicao = request.body.id_instituicao
        const produto = request.body.produto
        const data = request.body.data
        const trajetoria = request.body.trajetoria

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(id_usuario == ""){
            const resposta={
                status: true,
                msg: 'o id do usuario nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(id_instituicao == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(produto == ""){
            const resposta={
                status: true,
                msg: 'o produto não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(data == ""){
            const resposta={
                status: true,
                msg: 'a data não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(trajetoria == ""){
            const resposta={
                status: true,
                msg: 'a trajetoria não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const doacoes = new Doacoes(banco)
            doacoes.setId(id)
            doacoes.setIdUsuario(id_usuario)
            doacoes.setIdInstituicao(id_instituicao)
            doacoes.setProduto(produto)
            doacoes.setDataDoacao(data)
            doacoes.setTrajetoria(trajetoria)

            doacoes.create().then((resultadosBanco) => {
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        id_usuario: doacoes.getIdUsuario(),
                        id_institucao: doacoes.getidInstituicao()||"null",
                        produto: doacoes.getproduto(),
                        data: doacoes.getDataDoacao(),
                        trajetoria: doacoes.getTrajetoria()
                    }
                }
                console.log(resultadosBanco)
                response.status(200).send(resposta)
            }).catch((erro) => {
                console.error('Error retrieving users: ',erro)
            })
        }

    })

    app.get('/Doacoes',cors(corsOptions),(request,response) => {
        const doacoes = new Doacoes(banco)
        doacoes.read().then((resultadosBanco) => {
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
    app.put('/Doacoes',cors(corsOptions),(request,response) => {
        const id = request.body.id
        const id_usuario = request.body.id_usuario
        const id_institucao = request.body.id_instituicao
        const produto = request.body.produto
        const data = request.body.data
        const trajetoria = request.body.trajetoria

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(id_usuario == ""){
            const resposta={
                status: true,
                msg: 'o id do usuario nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(id_institucao == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(produto == ""){
            const resposta={
                status: true,
                msg: 'o produto não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(data == ""){
            const resposta={
                status: true,
                msg: 'a data não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(trajetoria == ""){
            const resposta={
                status: true,
                msg: 'a trajetoria não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const doacoes = new Doacoes(banco)
            doacoes.setId(id)
            doacoes.setIdUsuario(id_usuario)
            doacoes.setIdInstituicao(id_institucao)
            doacoes.setProduto(produto)
            doacoes.setDataDoacao(data)
            doacoes.setTrajetoria(trajetoria)

            doacoes.update().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        id_usuario: doacoes.getIdUsuario(),
                        id_institucao: doacoes.getidInstituicao(),
                        produto: doacoes.getproduto(),
                        data: doacoes.getDataDoacao(),
                        trajetoria: doacoes.getTrajetoria()
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

    app.delete('/Doacoes/:id',cors(corsOptions), (request,response) => {
        const id = request.params.id
        const doacoes = new Doacoes(banco)
        doacoes.setId(id)
        doacoes.delete().then((resultadosBanco) =>{
            const resposta = {
                status: true,
                msg: 'Excluido com sucesso',
                codigo: '008',
                dados: {
                  id: doacoes.getId(),
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