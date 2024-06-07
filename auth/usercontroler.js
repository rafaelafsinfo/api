import Usuario from "../model/Usuario";
import bcrypt from 'bcrypt'
import jwt from 'jose'

import * as dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.passworld

const login = (req,res) => {
    try{
        Usuario.findone({email: req.body.email}, (error,usuario) =>{
            if(!usuario){
                return res.status(401).json({
                    statusCode: 401,
                    message: "Usuário não encontrado!",
                    data: {
                        email: req.body.email
                     }
                })
            }
            const validacaoPassword = bcrypt.compareSync(req.body.senha,usuario.senha)
            if (!validacaoPassword) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Não autorizado!",
                })
            }
            const token = jwt.SignJWT({name: usuario.email},SECRET,{
                expiresIn: 2*60
            })
            res.status(200).json({
                statusCode: 200,
                message: "Login realizado com sucesso!",
                data: {
                    token
                    
                }
            })

        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const verificarToken = (req,res,next) =>{
    const tokenHeader = req.headers["authorization"]
    const token = tokenHeader && tokenHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!",
        })
    }

    try {

        jwt.verify(token, SECRET);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Token não valido."
        })
    }
}

export default{
    login,
    verificarToken
}