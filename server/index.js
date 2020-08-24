const keys = require('./keys')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));


const {Pool} = require('pg')
const pgClient = new Pool({
    user: keys.POSTGRES_USER,
    host: keys.POSTGRES_HOST,
    database: keys.POSTGRES_DATABASE,
    password: keys.POSTGRES_PASSWORD,
    port: keys.POSTGRES_PORT
})

pgClient.on('error', ()=> console.log('Lost PG connection'))

pgClient
    .query(`CREATE TABLE IF NOT EXISTS employee (
        employee_number NUMERIC PRIMARY KEY, 
        fullname VARCHAR(50) NOT NULL, 
        function VARCHAR(50) NOT NULL, 
        boss_number NUMERIC)` 
        )
    .catch(err => console.log(err))

pgClient
.query(`CREATE OR REPLACE FUNCTION setboss(boss NUMERIC,employee NUMERIC) 
        RETURNS TABLE (employee_number NUMERIC, boss_number NUMERIC) AS
            $BODY$
                UPDATE employee
                SET boss_number=$1
                WHERE employee_number=$2
                RETURNING employee_number, boss_number;
            $BODY$
        LANGUAGE sql VOLATILE;` 
    )
.catch(err => console.log(err))

pgClient
.query(`CREATE OR REPLACE FUNCTION employee(
            employeeNumber NUMERIC, 
            fullname VARCHAR(50),
            function VARCHAR(50),
            bossNumber NUMERIC) 
        RETURNS TABLE (employee_number NUMERIC) AS
            $BODY$
                INSERT INTO employee(employee_number, fullname, function, boss_number)
                VALUES ($1,$2,$3,$4)
                RETURNING employee_number;
            $BODY$
        LANGUAGE sql VOLATILE;`)
.catch(err => console.log(err))

app.get('/', async (req, res) => {
    let sql={
        text:`select * from employee`
    }
    let result;
    try {
        result= await pgClient.query(sql)
    }catch (error) {
        console.log(error)
        return res.send({error:error});
    }finally{

    }
    res.status(200).send(result.rows);
})

app.post('/employee/add', async (req, res) => {
    let id;
    let name;
    let functionEmployee;
    let bossNumber;
    console.log(req._body)
    
    if(req._body){
       id=req.body.field.id;
       name=req.body.field.fullname;
       functionEmployee=req.body.field.func;
       bossNumber=  req.body.field.boss == ''?null:req.body.field.boss;
    }else{
        console.log("query")
        id=req.query.id;
        name=req.query.fullname;
        functionEmployee=req.query.func;
        bossNumber=  req.query.boss == ''?null:req.query.boss;
    
    }

    if (id=='') return res.status(500).send({error:"Id field can not be empty"})
    if (name=='') return res.status(500).send({error:"Name field can not be empty"})
    if (functionEmployee=='') return res.status(500).send({error:"function field can not be empty"})

    try{
        let sql={
            text:`SELECT * FROM employee($1,$2,$3,$4)`,
            values: [id,
                    name,
                    functionEmployee,
                    bossNumber]
        }
        resultado= await pgClient.query(sql)
    }catch (error){
        console.log(error.code)
        if(error.code=="23505"){
            return res.send({"error":error,"errorcode":"23505"});
        }
        return res.status(500).send({error:error});
    }finally{
        
    }   
    res.status(200).send({"mensaje":"Realizado"});
})

app.post('/employee/setboss', async (req, res) => {
    let bossNumber=  req.query.boss == ''?null:req.query.boss;
    let id=req.query.id;
    if (id=='') return res.send({error:"El campo número de empleado no puede ser vacío"})
    let resultado;
    console.log(req.query)
    try{
        let sql={
            text:`SELECT * FROM setboss($1,$2)`,
            values: [bossNumber,
                    id]
        }
        resultado= await pgClient.query(sql)
        console.log(resultado.rows)
    }catch (error){
        console.log(error)
        return res.send({error:error});
    }finally{
        
    }   
    res.status(200).send({"mensaje":"Realizado"});
})

app.listen(3000, ()=>{
    console.log('Escuchando')
})

module.exports=app;