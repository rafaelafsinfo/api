require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql');

const Route_Usuario = require("./router/Route_Usuario")
const Route_Instituicao = require("./router/Route_Instituicao")

const app = express()
app.use(express.static('js'));
app.use(express.json())
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const banco = mysql.createPool({
    connectionLimit: 128,
    host: process.env.host,
    user: process.env.user,
    password: process.env.passworld,
    database: process.env.database});


app.get('/helloworld', cors(corsOptions) ,(req,res) => {
    return res.json({
        mensagem: 'Hello World'
    })
})

Route_Usuario(app,banco)
Route_Instituicao(app,banco)

app.listen(process.env.PORT ||3000, () => {
    console.log('connect')
})