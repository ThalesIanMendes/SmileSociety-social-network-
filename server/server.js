require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const server = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { default: NoWorkResult } = require('postcss/lib/no-work-result');
const saltRounds = 10;
server.use(express.json());
server.use(cors());

//add variaveis.env file in that folder 
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
});

server.post('/register', (req,res) => {
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err);
        }if(result.length == 0){
            bcrypt.hash(password, saltRounds, (erro, hash) => {
                db.query("INSERT INTO users (user, email, password) VALUES (?, ?, ?)", [user, email, hash], (err, response) => {
                    if(err){
                        res.send(err);
                    }
                    res.send({msg: "Cadastrado com sucesso!"});
                });
            });
        }else{
            res.send({msg: "Email já cadastrado, use outro!"});
        }
    });
});

server.post("/login", (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err){
            res.send(err)
        }
        if(result.length > 0){
            const usuario = result[0].user;
            const token = result[0].id;
            bcrypt.compare(password, result[0].password, (erro, result) =>{
                if(erro){
                    res.send(erro);
                }
                if(result){
                    
                    res.send({msg: "Usuario logado com sucesso!", user:usuario, token:token});
                }else{
                    res.send({msg:'Senha invalida!'})
                }
            }); 
        }else{
            res.send({msg:'Usuario não encontrado!'})
        }
    });
});





server.post("/post", (req,res) => {
    const owner = req.body.owner;
    const text = req.body.text;
    db.query("INSERT INTO posts (owner, text) VALUES (?, ?)", [owner, text], (err, response) => {
        if(err){
            res.send(err);
        }else{
            res.send({msg:'Post cadastrado!'})
        }
    });
});

server.post("/owner", (req,res) => {
    const id = req.body.id;
    db.query("SELECT user FROM users WHERE id = ?",[id], (erro, result) => {
        res.send(result);
    }); 
});

server.get("/postagens", (req,res) => {
    db.query("SELECT owner, text FROM posts", (err,result) => {   
        res.send(result);
    }) 
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: http://localhost:${process.env.PORT}`)
}); 