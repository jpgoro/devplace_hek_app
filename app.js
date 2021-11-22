/* import methodOverride from 'method-override';
import cors from "cors";
import express from "express"; */
const methodOverride = require('method-override');
const cors = require('cors');
const express = require('express');
//
const app = express();
const log = console.log;

let port = process.env.PORT || 3000;

let users = ["bart","lisa","homero","marge"];

app.use(methodOverride());
app.use(cors());
app.use(express.urlencoded({extended:true}))//agregado despues para trabajar con el form de html
app.use(express.json())//agregado despues para trabajar con el form de html


app.get("/users", (req, res) => {
    res.send(users); 
});

//Create antes de trabajar con el formulario de html
/* app.post("/user/create/:nombre", (req, res) => {
    users.push(req.params.nombre);
    res.send("usuario creado")
}); */

//Create modificado para trabajar con el formulario html
app.post("/user/create", (req, res) => { //Elimino el /:nombre porque lo envia desde el form
    users.push(req.body.nombre);
    res.send("usuario creado")
});

//Delete

app.delete("/user/delete/:nombre", (req, res) => {
    let nomelem = users.indexOf(req.params.nombre);
    users.splice(nomelem, 1);
    res.send("usuario eliminado");
    //tmb funciona con filter: users = users.filter(el=>el!= req.params.nombre)
});

//Put

app.put("/user/put/:nombre/:nombre2", (req, res)=>{
    users = users.map(el=>(el===req.params.nombre)?req.params.nombre2 : el)
    res.send("usuario modificado");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.listen(port, (req, res) => {
    log("start server");
});