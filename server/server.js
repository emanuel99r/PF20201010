
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
var contador=0;
let server = http.createServer(app);


const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname,"../public")));

let io = socketIO(server);

io.on('connection',(client)=>{
console.log('usuario conectado');

    client.on('disconnect',()=>{
        console.log('usuario desconectado');
    });
    client.on('enviarGrados',(mensaje)=>{
        console.log('Grados motor1: ',mensaje[0]);
        console.log('Grados motor2: ',mensaje[1]);
        console.log('Grados motor3: ',mensaje[2]);
        console.log('Grados motor4: ',mensaje[3]);
        console.log('Grados motor5: ',mensaje[4]);
        console.log('Grados motor6: ',mensaje[5]);
        client.broadcast.emit('grados',mensaje)
    });

    client.on('posicionHome',()=>{
        console.log('llegando a home')
        client.broadcast.emit('posicionHome','home')
    });    
    client.on('message',(cont)=>{
        client.broadcast.emit('message',cont)
    });   
    client.on('lim_1_inf',(lim_1_inf)=>{
        client.broadcast.emit('lim_1_inf',lim_1_inf)
    });  
    client.on('lim_1_sup',(lim_1_sup)=>{
        client.broadcast.emit('lim_1_sup',lim_1_sup)
    });  
    client.on('lim_2_inf',(lim_2_inf)=>{
        client.broadcast.emit('lim_2_inf',lim_2_inf)
    });  
    client.on('lim_2_sup',(lim_2_sup)=>{
        client.broadcast.emit('lim_2_sup',lim_2_sup)
    });  
    client.on('outRange',()=>{
        client.broadcast.emit('outRange')
    });  
    client.on('typeError',()=>{
        client.broadcast.emit('typeError')
    });  



});

app.get("/", (req, res) => {
    res.sendfile("index.html");
  });

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});