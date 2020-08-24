const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('hbs')
const path= require('path')
const Request = require('request')
const keys = require('./keys')

const cliente = express()
cliente.use(cors())
cliente.use(bodyParser.json())
cliente.use(bodyParser.urlencoded({extended: true}));

cliente.use(express.static(__dirname+'/public'))
const viewsPath = path.join(__dirname,'./src/views')
cliente.set('view engine', 'hbs')
cliente.set('views', viewsPath)

const {Pool} = require('pg')
const pgClient = new Pool({
    user: keys.POSTGRES_USER,
    host: keys.POSTGRES_HOST,
    database: keys.POSTGRES_DATABASE,
    password: keys.POSTGRES_PASSWORD,
    port: keys.POSTGRES_PORT
})
pgClient.on('error', ()=> console.log('Lost PG connection'))


cliente.get('/', async (req, res) => {
 let data;   
//     try {
//         Request.get("http://localhost:5000/", (error, response, body) => {
          

//     if(error) {
//         return console.dir(error);
//     }
//     data=body; 
//     console.dir(JSON.parse(body));
    
// });
// return res.render("home",{employee:JSON.parse(data)})
//     } catch (error) {
//         console.log(error)
//         return res.render("home",{body:JSON.parse(body)})
//     }finally{
//         //res.render("home",{body:JSON.parse(data)});
//     }
    let sql={
        text:`select * from employee`
    }
    let result;
    try {
        result= await pgClient.query(sql)
        data=result.rows;
        return res.render("home", {data:data});
    }catch (error) {
        console.log(error)
        return res.send({error:error});
    }finally{

    }
    //res.status(200).render("home", {data:JSON.parse(data)});
})

cliente.listen(3001, ()=>{
    console.log('Escuchando 3001')
})