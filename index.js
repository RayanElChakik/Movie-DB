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

// Creating a route when /hello <ID> invoked it sends status and a message with ID passed 
app.get('/hello/:ID',(req,res) =>{
    console.log('Testing Server route')
        res.json({status:200, message:`Hello, ${req.params.ID}`})
})

app.get('/hello',(req,res)=>{
    console.log('Testing Server route')
    res.json({status:200, message:"Hello"})
})

// Creating a route when /search?s=<SEARCH>  invoked with some conditions 
app.get('/search',(req,res) =>{
    let search = req.query.s;
    if(search){
        console.log('Server route with search parameter have been passed')
        res.status(200).json({status:200, message:'Ok', data:{search}})
    }else{
        console.log('Testing Server Route')
        res.status(500).json({status:500, error:true, message:"You have to provide a serach"})
    }
})


// Sever Creation that listens to port= 3000
app.listen(3000)