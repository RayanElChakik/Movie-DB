const express = require('express')
const app = express()


// When server receives url will send OK
app.get('/',(req,res) =>{
    console.log('Testing Server')
    res.send('OK!')
})


// Creating a route when /test invoked it sends a status and a message 
app.get('/test',(req,res) =>{
    console.log('Testing Server route')
    res.json({status:200, message:"ok"})
})

// Creating a route when /time invoked it sends status and a time message
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
let time = hours + ":" + minutes + ":" + seconds;

app.get('/time',(req,res) =>{
    console.log('Testing Server route')
    res.json({status:200, message:time})
})


// Sever Creation that listens to port= 3000
app.listen(3000)