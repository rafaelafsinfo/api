const { request, response } = require('express');
const Usuario = require('../model/Usuario');
const usercontroler = require('../auth/usercontroler')
const {randomUUID} = require('crypto');

module.exports = function(app,banco){
    const Usuario = require('../model/Usuario')

    app.post('/Usuario',(request,response) =>{
        console.log("rota => POST: /Usuario");
        const id = randomUUID()
        const p_nome = request.body.p_nome
        const sobrenome = request.body.sobrenome
        const username = request.body.username
        const email = request.body.email
        const senha = request.body.senha
        const cidade = request.body.cidade
        const estado = request.body.estado

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(p_nome == ""){
            const resposta={
                status: true,
                msg: 'o primeiro nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(username == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(email == ""){
            const resposta={
                status: true,
                msg: 'o email não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(senha == ""){
            const resposta={
                status: true,
                msg: 'a senha não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cidade == ""){
            const resposta={
                status: true,
                msg: 'a cidade não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(estado == ""){
            const resposta={
                status: true,
                msg: 'o estado não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const usuario = new Usuario(banco)
            usuario.setId(id)
            usuario.setPNome(p_nome)
            usuario.setSobrenome(sobrenome)
            usuario.setUsername(username)
            usuario.setEmail(email)
            usuario.setSenha(senha)
            usuario.setCidade(cidade)
            usuario.setEstado(estado)

            usuario.create().then((resultadosBanco) => {
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        p_nome: usuario.getPNome(),
                        sobrenome: usuario.getSobrenome(),
                        username: usuario.getUsername(),
                        email: usuario.getEmail(),
                        cidade: usuario.getCidade(),
                        estado: usuario.getEstado()
                    }
                }
                console.log(resultadosBanco)
                response.status(200).send(resposta)
            }).catch((erro) => {
                console.error('Error retrieving users: ',erro)
            })
        }

    })

    app.get('/Usuario',(request,response) => {
        const usuario = new Usuario(banco)
        usuario.read().then((resultadosBanco) => {
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
    app.get('/Usuario/:email',(request,response) => {
        const usuario = new Usuario(banco)
        const email = request.params.email
        usuario.setEmail(email)
        usuario.read(email).then((resultadosBanco) => {
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
    app.post('/Login/Usuario',usercontroler.login)
    
    app.put('/Usuario',(request,response) => {
        const id = request.body.id
        const p_nome = request.body.p_nome
        const sobrenome = request.body.sobrenome
        const username = request.body.username
        const email = request.body.email
        const senha = request.body.senha
        const cidade = request.body.cidade
        const estado = request.body.estado

        if (id == ""){
            const resposta={
                status: true,
                msg: 'o id não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(p_nome == ""){
            const resposta={
                status: true,
                msg: 'o primeiro nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(username == ""){
            const resposta={
                status: true,
                msg: 'o nome de usuario não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(email == ""){
            const resposta={
                status: true,
                msg: 'o email não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(senha == ""){
            const resposta={
                status: true,
                msg: 'a senha não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(cidade == ""){
            const resposta={
                status: true,
                msg: 'a cidade não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(estado == ""){
            const resposta={
                status: true,
                msg: 'o estado não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const usuario = new Usuario(banco)
            usuario.setId(id)
            usuario.setPNome(p_nome)
            usuario.setSobrenome(sobrenome)
            usuario.setUsername(username)
            usuario.setEmail(email)
            usuario.setSenha(senha)
            usuario.setCidade(cidade)
            usuario.setEstado(estado)
            usuario.update().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        p_nome: usuario.getPNome(),
                        sobrenome: usuario.getSobrenome(),
                        username: usuario.getUsername(),
                        email: usuario.getEmail(),
                        cidade: usuario.getCidade(),
                        estado: usuario.getEstado()
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

    app.delete('/Usuario/:id', (request,response) => {
        const id = request.params.id
        const usuario = new Usuario(banco)
        usuario.setId(id)
        usuario.delete().then((resultadosBanco) =>{
            const resposta = {
                status: true,
                msg: 'Excluido com sucesso',
                codigo: '008',
                dados: {
                  id: usuario.getId(),
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