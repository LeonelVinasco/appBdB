const express=require('express')
const keys = require('./keys')
const bodyParser = require('body-parser')
const cors = require('cors')
const {Pool} = require('pg')

const app = express()
app.use(cors())
app.use(bodyParser.json())


const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('error', ()=> console.log('Lost PG connection'))
       
pgClient
    .query('CREATE TABLE IF NOT EXISTS employee (employee_number NUMERIC PRIMARY KEY, fullname VARCHAR(50) NOT NULL, function VARCHAR(50) NOT NULL, boss_number NUMERIC)'
        )
    .catch(err => console.log(err))



pgClient
.query('CREATE )'
    )
.catch(err => console.log(err))

app.get('/', async (req, res)=>{
//const values = await pgClient.query('SELECT * FROM values')

    res.send('<h1>Prueba BdB</h1>')
})

app.listen(5000, ()=>{
    console.log('Escuchando')
})