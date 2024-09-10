require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql');

const Route_Doacoes = require("./router/Route_Doacoes")
const Route_Instituicao = require("./router/Route_Instituicao")
const Route_Usuario = require("./router/Route_Usuario");
const Route_Locais = require('./router/Route_Locais');

const app = express()
app.use(express.static('js'));
app.use(express.json())
/*app.use(cors({
    origin: '*'
  }))*/

const banco = mysql.createPool({
    connectionLimit: 128,
    host: process.env.host,
    user: process.env.user,
    password: process.env.passworld,
    database: process.env.database});


app.get('/helloworld' ,(req,res) => {
    return res.json({
        mensagem: 'Hello World'
    })
})

Route_Doacoes(app,banco)
Route_Instituicao(app,banco)
Route_Usuario(app,banco)
Route_Locais(app,banco)

app.listen(process.env.PORT ||3000, () => {
    console.log('connect')
})