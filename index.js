const express = require('express')
const app = express()


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]


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


// Creating a movies/creat or movies/add route
// app.get('/movies/add',(req,res)=>{
//     res.send('Movie Creat')
// })

// Creating a movies/read or movies/get route
app.get('/movies/read',(req,res)=>{
    res.json({status:200 , data: movies})
})


// // Creating a movies/update or movies/edit route
app.get('/movies/edit',(req,res)=>{
    res.send('Movie Update')
})

// // Creating a movies/delete route
app.get('/movies/delete',(req,res)=>{
    res.send('Movie Delet')
})


// Route creation for sorting the list by Years
app.get('/movies/read/by-date',(req,res)=>{
    res.json({status:200 , data: movies.sort((oldYear, newYear) => newYear.year - oldYear.year)})
})

// Route creation for sorting the list by Highest Rating
app.get('/movies/read/by-rating' , (req, res) => {
    res.send({status:200, data: movies.sort((lowRate,highRate) => highRate.rating - lowRate.rating)})
})

// Route creation for sorting the list by its Title
app.get('/movies/read/by-title' , (req, res) => {
    res.send({status:200, data: movies.sort((oldChar,newChar) => oldChar.title.localeCompare(newChar.title))})
})

// // Route creation for reading an ID 
app.get('/movies/read/id/:ID',(req,res) =>{
    if(req.params.ID >=0 && req.params.ID < movies.length){
        res.json({status:200, data:movies[req.params.ID]})
    }else{
        res.status(404).json({status:404, error:true , message:`The movie ${req.params.ID} does not exist.`})
    }
    })
// Route creation for reading an movie title 
// app.get('/movies/read/id/:ID',(req,res) =>{
//     const result = movies.find( ({ title }) => title === req.params.ID );
//     let indexID = movies.findIndex(id => id.title === req.params.ID)
//     if(indexID >=0 && indexID < movies.length){
//     res.json({status:200, data:result})
//     // return
//     }else{
//     res.status(404).json({status:404, error:true , message:`The movie ${req.params.ID} does not exist.`})
//     }
//     })


// Route creation for creating a new object 
app.get('/movies/add',(req,res) =>{
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    if(!isNaN(year) && year.length===4 && year && title){
        if(rating){
        movies.push({title:title, year:year, rating:rating})
        res.status(200).json({status:200, message:'Ok', data:movies})
        console.log(year.length);
        }else{
            rating = 4;
            movies.push({title:title, year:year, rating:rating})
            res.status(200).json({status:200, message:'Ok', data:movies})
        }
    }else{
        res.status(403).json({status:403, error:true, message:"You cannot create a movie without providing a title and an appropriate year"})
    }
})
// Sever Creation that listens to port= 3000
app.listen(3000)