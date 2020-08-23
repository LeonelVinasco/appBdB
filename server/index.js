const keys = require('./keys')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())


const {Pool} = require('pg')
const pgClient = new Pool({
    user: keys.POSTGRES_User,
    host: keys.POSTGRES_Host,
    database: keys.POSTGRES_Database,
    password: keys.POSTGRES_Password,
    port: keys.POSTGRES_Port
})

pgClient.on('error', ()=> console.log('Lost PG connection'))

app.get('/', async (req, res)=>{
        res.send('<h1>Prueba BdB</h1>')
    })

    app.listen(3000, ()=>{
        console.log('Escuchando')
    })