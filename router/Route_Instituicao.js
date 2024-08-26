module.exports = function(app,banco){
    const Instituicao = require('../model/Instituicao')

    app.post('/Instituicao',(request,response) =>{
        console.log("rota => POST: /Instituicao");
        const Cnpj = request.body.Cnpj
        const NomeInst = request.body.NomeInst
        const Email = request.body.Email
        const senha = request.body.senha
        const rua = request.body.rua
        const numero = request.body.numero
        const bairro = request.body.bairro
        const cidade = request.body.cidade
        const estado = request.body.estado
        const CEP = request.body.CEP
        const Descricao = request.body.Descricao


        if (Cnpj == ""){
            const resposta={
                status: true,
                msg: 'o Cnpj não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(NomeInst == ""){
            const resposta={
                status: true,
                msg: 'o nome não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(Email == ""){
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
        }else if(Descricao == ""){
            const resposta={
                status: true,
                msg: 'a Descricao não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const instituicao = new Instituicao(banco)
            instituicao.setCnpj(Cnpj)
            instituicao.setNomeInst(NomeInst)
            instituicao.setEmail(Email)
            instituicao.setSenha(senha)
            instituicao.setRua(rua)
            instituicao.setNumero(numero)
            instituicao.setBairro(bairro)
            instituicao.setCidade(cidade)
            instituicao.setEstado(estado)
            instituicao.setCEP(CEP)
            instituicao.setDescricao(Descricao)

            instituicao.create().then((resultadosBanco) => {
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        Cnpj: resultadosBanco.Cnpj,
                        NomeInst: instituicao.getNomeInst(),
                        Email: instituicao.getEmail(),
                        rua: instituicao.getRua(),
                        numero: instituicao.getNumero(),
                        bairro: instituicao.getBairro(),
                        cidade: instituicao.getCidade(),
                        estado: instituicao.getEstado(),
                        CEP: instituicao.getCEP(),
                        Descricao: instituicao.getDescricao()
                    }
                }
                console.log(resultadosBanco)
                response.status(200).send(resposta)
            }).catch((erro) => {
                console.error('Error retrieving users: ',erro)
            })
        }

    })




    app.post('/Login/Instituicao',(request,response) => {
        const Email = request.body.Email
        const Senha = request.body.Senha
        if (Email == "" || Senha == "") {
            //cria um objeto json de resposta.
            const resposta = {
              status: false,
              msg: 'Email ou senha não podem ser vazios',
              codigo: '001',
              dados: "{}",
            }
            //envia a resposta para o cliente
            //http code = 200
            response.status(200).send(resposta);
      
          }else{

            const instituicao = new Instituicao(banco)
            instituicao.setEmail(Email)
            instituicao.setSenha(Senha)
            

            instituicao.login().then((respostaLogin) => {
                console.log(respostaLogin)
                if (respostaLogin.status == true) { 
                    const resposta = {
                        Cnpj: respostaLogin.Cnpj,
                        NomeInst: respostaLogin.NomeInst,
                        Email: respostaLogin.Email,
                        Descricao: respostaLogin.Descricao
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




    app.get('/Instituicao',(request,response) => {
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




    app.get('/Instituicao/:Email',(request,response) => {
        const Email = request.params.Email
        const instituicao = new Instituicao(banco)
        instituicao.setEmail(Email)
        instituicao.read(Email).then((resultadosBanco) => {
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




    app.patch('/Instituicao/',(request,response) => {
        const md5 = require('md5')
        const Cnpj = request.body.Cnpj
        const NomeInst = request.body.NomeInst
        const rua = request.body.Rua
        const numero = request.body.Numero
        const bairro = request.body.Bairro
        const cidade = request.body.Cidade
        const estado = request.body.Estado
        const CEP = request.body.CEP
        const Descricao = request.body.Descricao


        if (Cnpj == ""){
            const resposta={
                status: true,
                msg: 'o Cnpj não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else if(NomeInst == ""){
            const resposta={
                status: true,
                msg: 'o nome não pode ser vazio',
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
        }else if(Descricao == ""){
            const resposta={
                status: true,
                msg: 'a Descricao não pode ser vazio',
                codigo: '001',
                dados: "{}"
            }
            response.status(200).send(resposta);
        }else{
            const instituicao = new Instituicao(banco)
            instituicao.setCnpj(Cnpj)
            instituicao.setNomeInst(NomeInst)
            instituicao.setRua(rua)
            instituicao.setNumero(numero)
            instituicao.setBairro(bairro)
            instituicao.setCidade(cidade)
            instituicao.setEstado(estado)
            instituicao.setCEP(CEP)
            instituicao.setDescricao(Descricao)
            instituicao.update().then((resultadosBanco) =>{
                const resposta = {
                    status: true,
                    msg: 'Executado com sucesso',
                    codigo: '002',
                    dados: {
                        Cnpj: instituicao.getCnpj(),
                        NomeInst: instituicao.getNomeInst(),
                        rua: instituicao.getRua(),
                        numero: instituicao.getNumero(),
                        bairro: instituicao.getBairro(),
                        cidade: instituicao.getCidade(),
                        estado: instituicao.getEstado(),
                        CEP: instituicao.getCEP(),
                        Descricao: instituicao.getDescricao()
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




    app.delete('/Instituicao/',(request,response) => {
        const Cnpj = request.body.Cnpj
        const instituicao = new Instituicao(banco)
        instituicao.setCnpj(Cnpj)
        instituicao.delete().then((resultadosBanco) =>{
            const resposta = {
                status: true,
                msg: 'Excluido com sucesso',
                codigo: '008',
                dados: {
                  Cnpj: instituicao.getCnpj(),
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