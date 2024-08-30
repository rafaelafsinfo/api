const { request, response } = require('express');
const Usuario = require('../model/Usuario');
const { v4: uuidv4 } = require('uuid');

module.exports = function(app,banco){
    const Usuario = require('../model/Usuario')

    app.post('/Usuario',(request,response) =>{
        console.log("rota => POST: /Usuario");
        const id = uuidv4()
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
    app.post('/Login/Usuario',(request,response) => {
        console.log("rota: POST: /login/aluno")
        const email = request.body.email
        const senha = request.body.senha
        if (email == null || senha == "") {
            //cria um objeto json de resposta.
            const resposta = {
              status: false,
              msg: 'email ou senha não podem ser vazios',
              codigo: '001',
              dados: "{}",
            }
            //envia a resposta para o cliente
            //http code = 200
            response.status(200).send(resposta);

          }else{

            const usuario = new Usuario(banco)
            usuario.setEmail(email)
            usuario.setSenha(senha)


            usuario.login().then((respostaLogin) => {
                console.log(respostaLogin.status)
                if (respostaLogin.status == true) { 
                    const resposta = {
                        id: respostaLogin.id,
                        p_nome: respostaLogin.p_nome,
                        sobrenome: respostaLogin.sobrenome,
                        email: respostaLogin.email,
                        token: respostaLogin.token,
                        mensagem: 'login realizado com sucesso'
                    }
                    response.status(200).send(resposta)
            } else {
                const resposta = {
                status: false,
                msg: "Usuário não logado",
                codigo: 401,
                }
                console.log(resposta)
                response.status(404).send(resposta)
            }
            }).catch((erro) => {
            const resposta = {
                status: false,
                msg: 'erro ao executar',
                codigo: '005',
                dados: erro,
            }


            response.status(201).send(erro);
            });
        }
    })

    app.patch('/Usuario', (request, response) => {
        const id = request.body.id
        const senha = request.body.senha
        const p_nome = request.body.p_nome
        const sobrenome = request.body.sobrenome
        const username = request.body.username
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
        }else if(sobrenome == ""){
            const resposta={
                status: true,
                msg: 'o sobrenome não pode ser vazio',
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
            usuario.setSenha(senha)
            usuario.setPNome(p_nome)
            usuario.setSobrenome(sobrenome)
            usuario.setUsername(username)
            usuario.setCidade(cidade)
            usuario.setEstado(estado)
            usuario.updatepass().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        id: resultadosBanco.id,
                        p_nome: usuario.getPNome(),
                        sobrenome: usuario.getSobrenome(),
                        username: usuario.getUsername(),
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
    
    app.put('/Usuario',(request,response) => {
        const id = request.body.id
        const p_nome = request.body.p_nome
        const sobrenome = request.body.sobrenome
        const username = request.body.username
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
        }else if(sobrenome == ""){
            const resposta={
                status: true,
                msg: 'o sobrenome não pode ser vazio',
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