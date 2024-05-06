const cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = function(app,banco){
    const Instituicao = require('../model/Instituicao')

    app.post('/Instituicao',cors(corsOptions),(request,response) =>{
        console.log("rota => POST: /Instituicao");
        const cnpj = request.body.cnpj
        const nome_inst = request.body.nome_inst
        const email = request.body.email
        const senha = request.body.senha
        const rua = request.body.rua
        const numero = request.body.numero
        const bairro = request.body.bairro
        const cidade = request.body.cidade
        const estado = request.body.estado
        const CEP = request.body.CEP
        const descricao = request.body.descricao


        if (cnpj == ""){
            const resposta={
                status: true,
                msg: 'o cnpj não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(nome_inst == ""){
            const resposta={
                status: true,
                msg: 'o nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(email == ""){
            const resposta={
                status: true,
                msg: 'o primeiro nome não pode ser vazio',
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
        }else if(rua == ""){
            const resposta={
                status: true,
                msg: 'a rua não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(numero == ""){
            const resposta={
                status: true,
                msg: 'o numero não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(bairro == ""){
            const resposta={
                status: true,
                msg: 'o bairro não pode ser vazio',
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
        }else if(CEP == ""){
            const resposta={
                status: true,
                msg: 'o CEP não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(descricao == ""){
            const resposta={
                status: true,
                msg: 'a descricao não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const instituicao = new Instituicao(banco)
            instituicao.setCnpj(cnpj)
            instituicao.setNomeInst(nome_inst)
            instituicao.setEmail(email)
            instituicao.setSenha(senha)
            instituicao.setRua(rua)
            instituicao.setNumero(numero)
            instituicao.setBairro(bairro)
            instituicao.setCidade(cidade)
            instituicao.setEstado(estado)
            instituicao.setCEP(CEP)
            instituicao.setDescricao(descricao)

            instituicao.create().then((resultadosBanco) => {
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        cnpj: resultadosBanco.cnpj,
                        nome_inst: instituicao.getNomeInst(),
                        email: instituicao.getEmail(),
                        rua: instituicao.getRua(),
                        numero: instituicao.getNumero(),
                        bairro: instituicao.getBairro(),
                        cidade: instituicao.getCidade(),
                        estado: instituicao.getEstado(),
                        CEP: instituicao.getCEP(),
                        descricao: instituicao.getDescricao()
                    }
                }
                console.log(resultadosBanco)
                response.status(200).send(resposta)
            }).catch((erro) => {
                console.error('Error retrieving users: ',erro)
            })
        }

    })

    app.get('/Instituicao',cors(corsOptions),(request,response) => {
        const instituicao = new Instituicao(banco)
        instituicao.read().then((resultadosBanco) => {
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
    app.get('/Instituicao/:cnpj',cors(corsOptions),(request,response) => {
        const cnpj = request.params.cnpj
        const instituicao = new Instituicao(banco)
        instituicao.setCnpj(cnpj)
        instituicao.read(cnpj).then((resultadosBanco) => {
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
    app.post('/Login/Instituicao',cors(corsOptions),(request,response) => {
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

            const instituicao = new Instituicao(banco)
            instituicao.setEmail(email)
            instituicao.setSenha(senha)
            

            instituicao.login().then((respostaLogin) => {
                if (respostaLogin.status == true) { 
                    const resposta = {
                        cnpj: respostaLogin.cnpj,
                        nome_inst: respostaLogin.nome_inst,
                        email: respostaLogin.email,
                        descricao: respostaLogin.descricao
                    }
                response.status(200).send(resposta)
            } else {
                const resposta = {
                status: false,
                msg: "Usuário não logado",
                codigo: 401,
                }
                response.send(resposta, 404)
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
    app.put('/Instituicao/',cors(corsOptions),(request,response) => {
        const md5 = require('md5')
        const cnpj = request.body.cnpj
        const nome_inst = request.body.nome_inst
        const email = request.body.email
        const senha = request.body.senha
        const rua = request.body.rua
        const numero = request.body.numero
        const bairro = request.body.bairro
        const cidade = request.body.cidade
        const estado = request.body.estado
        const CEP = request.body.CEP
        const descricao = request.body.descricao


        if (cnpj == ""){
            const resposta={
                status: true,
                msg: 'o cnpj não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(nome_inst == ""){
            const resposta={
                status: true,
                msg: 'o nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(email == ""){
            const resposta={
                status: true,
                msg: 'o primeiro nome não pode ser vazio',
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
        }else if(rua == ""){
            const resposta={
                status: true,
                msg: 'a rua não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(numero == ""){
            const resposta={
                status: true,
                msg: 'o numero não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(bairro == ""){
            const resposta={
                status: true,
                msg: 'o bairro não pode ser vazio',
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
        }else if(CEP == ""){
            const resposta={
                status: true,
                msg: 'o CEP não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(descricao == ""){
            const resposta={
                status: true,
                msg: 'a descricao não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const instituicao = new Instituicao(banco)
            instituicao.setCnpj(cnpj)
            instituicao.setNomeInst(nome_inst)
            instituicao.setEmail(email)
            instituicao.setSenha(senha)
            instituicao.setRua(rua)
            instituicao.setNumero(numero)
            instituicao.setBairro(bairro)
            instituicao.setCidade(cidade)
            instituicao.setEstado(estado)
            instituicao.setCEP(CEP)
            instituicao.setDescricao(descricao)
            instituicao.update().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        cnpj: resultadosBanco.cnpj,
                        nome_inst: instituicao.getNomeInst(),
                        email: instituicao.getEmail(),
                        rua: instituicao.getRua(),
                        numero: instituicao.getNumero(),
                        bairro: instituicao.getBairro(),
                        cidade: instituicao.getCidade(),
                        estado: instituicao.getEstado(),
                        CEP: instituicao.getCEP(),
                        descricao: instituicao.getDescricao()
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

    app.delete('/Instituicao/',cors(corsOptions),(request,response) => {
        const cnpj = request.body.cnpj
        const instituicao = new Instituicao(banco)
        instituicao.setCnpj(cnpj)
        instituicao.delete().then((resultadosBanco) =>{
            const resposta = {
                status: true,
                msg: 'Excluido com sucesso',
                codigo: '008',
                dados: {
                  cnpj: instituicao.getCnpj(),
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