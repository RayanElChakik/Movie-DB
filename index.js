const express = require('express')
const app = express()
const crudRoutes = require('./routes/crudRoutes')
const oldRoutes = require('./routes/oldRoutes')
require('dotenv/config')
const mongoose = require('mongoose');
const users = require('./routes/userRouters')

// Midleware Creation
app.use(express.json());
app.use('/movies',crudRoutes)
// To use the old routes add /add before the rest of the route tags
app.use('/app',oldRoutes)
app.use('/user',users)

//connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Successfully connected to MongoDB database!");
});


// // When server receives url will send OK
app.get('/',(req,res) =>{
    console.log('Testing Server')
    res.send('OK!')
})

//  Creating a movies/update or movies/edit route
// router.get('/edit',(req,res)=>{
//     res.send('Movie Update')
// })

// // // Creating a movies/delete route
// // router.get('/delete',(req,res)=>{
// //     res.send('Movie Delet')
// // })
//  Creating a movies/creat or movies/add route
// app.get('/movies/add',(req,res)=>{
//     res.send('Movie Creat')
// })

// // Creating a route when /test invoked it sends a status and a message 
// app.get('/test',(req,res) =>{
//     console.log('Testing Server route')
//     res.json({status:200, message:"ok"})
// })

// // Creating a route when /time invoked it sends status and a time message
// let date = new Date();
// let hours = date.getHours();
// let minutes = date.getMinutes();
// let seconds = date.getSeconds();
// let time = hours + ":" + minutes + ":" + seconds;

// app.get('/time',(req,res) =>{
//     console.log('Testing Server route')
//     res.json({status:200, message:time})
// })

// // Creating a route when /hello <ID> invoked it sends status and a message with ID passed 
// app.get('/hello/:ID',(req,res) =>{
//     console.log('Testing Server route')
//         res.json({status:200, message:`Hello, ${req.params.ID}`})
// })

// app.get('/hello',(req,res)=>{
//     console.log('Testing Server route')
//     res.json({status:200, message:"Hello"})
// })

// // Creating a route when /search?s=<SEARCH>  invoked with some conditions 
// app.get('/search',(req,res) =>{
//     let search = req.query.s;
//     if(search){
//         console.log('Server route with search parameter have been passed')
//         res.status(200).json({status:200, message:'Ok', data:{search}})
//     }else{
//         console.log('Testing Server Route')
//         res.status(500).json({status:500, error:true, message:"You have to provide a serach"})
//     }
// })

// // Route creation for sorting the list by Highest Rating
// app.get('/read/by-rating' , (req, res) => {
//     movies.find()
//     .then(moviesData => {
//         res.send({status:200, data: movies.moviesItem .sort((lowRate,highRate) => highRate.rating - lowRate.rating)})
//     }).catch(err => {
//         console.log("error, no entry found")
//     })
// })


// Sever Creation that listens to port= 3000
const port = 3000;
app.listen(port)