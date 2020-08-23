const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const hbs = require('hbs')
const path= require('path')
const Request = require('request')

const cliente = express()
cliente.use(cors())
cliente.use(bodyParser.json())
cliente.use(bodyParser.urlencoded({extended: true}));

cliente.use(express.static(__dirname+'/public'))
const viewsPath = path.join(__dirname,'./src/views')
cliente.set('view engine', 'hbs')
cliente.set('views', viewsPath)

cliente.get('/', async (req, res) => {
    
    try {
        Request.get("http://localhost:5000/", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
    return res.render("home",{body:JSON.parse(body)})
});
    } catch (error) {
        console.log(error)
    }finally{

    }
    
    res.render("home");
})

cliente.listen(3001, ()=>{
    console.log('Escuchando 3001')
})