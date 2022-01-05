const express = require('express')
const app = express()


// When server receives url will send OK
app.get('/',(req,res) =>{
    console.log('Testing Server')
    res.send('OK!')
})

// Sever Creation that listens to port= 3000
app.listen(3000)