const express = require ('express')
const router = express.Router()
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')

const movies = require('../models/MovieList');

// Creating a movies/read or movies/get route
router.get('/read',(req,res)=>{
    movies.find()
    .then(searchData => {
        res.json({status:200 , data: searchData});
    }).catch(err => {
        console.log("Error!")
    })
})

// Route creation for sorting the list by Years
router.get('/read/by-date',(req,res)=>{
    movies.find()
    .then(searchData => {
        res.json({status:200 , data: searchData.sort((oldYear, newYear) => newYear.year - oldYear.year)});
    }).catch(err => {
        console.log("Error!")
    })
})

// Route creation for sorting the list by Highest Rating
router.get('/read/by-rating' , (req, res) => {
    movies.find()
    .then(searchData => {
        res.json({status:200, data: searchData.sort((lowRate,highRate) => highRate.rating - lowRate.rating)})
    }).catch(err => {
        console.log("Error!")
    })
})

// Route creation for sorting the list by its Title
router.get('/read/by-title' , (req, res) => {
    movies.find()
    .then(searchData => {
        res.json({status:200, data: searchData.sort((oldChar,newChar) => oldChar.title.localeCompare(newChar.title))})
    }).catch(err => {
        console.log("Error!")
    })
})
// Route creation for reading an ID 
router.get('/read/id/:ID',(req,res) => {
    movies.findById(req.params.ID).then(movieData => {
        res.json({status:200, data: movieData})
    }).catch(err => {
        res.status(404).json({status:404, error:true , message:`The movie ${req.params.ID} does not exist.`});
    })
})

// // Route creation for creating a new object 
router.post('/add',(req,res) =>{
    let title = req.query.title;
    let year = req.query.year;
    let rating = req.query.rating;
    if (!isNaN(year) && year.length===4 && year && title) {
        movies.create({
            title: req.query.title,
            year: req.query.year,
            rating: (rating && !isNaN(rating)) ? rating : 4
        }
        ).then(() => {
            movies.find()
                .then(moviesData => {
                    res.send({ status: 200, data: moviesData });
                }).catch(err => {
                    console.log("error, no entry found")
                })

        }).catch(err => { "error, connot create element" });
        //if rating is not a number or missing push 4 instead
    } else res.status(403).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' });
})

router.delete("/delete/:id", (req, res) => {
    movies.findByIdAndDelete(req.params.id).then(deletedMovie => {
        movies.find().then(moviesData => {
            res.send({ status: 200, data: moviesData });
        }).catch(err => {
            console.log("error, no entry find")
        })
    }).catch(err => {
        res.status(404).send({ status: 404, error: true, message: `the movie '${req.params.id}' does not exist` });
    })
});

// // Creating a route to update an item from the list 
router.put('/update/:ID',(req,res)=>{
    let fetchedID = req.params.ID
    let title = req.query.title
    let year = req.query.year
    let rating = req.query.rating
    movies.findById(fetchedID).then((updatedMovie) => {
        if (title && title !== undefined){
            updatedMovie.title = title
        }
        if (rating && !isNaN(rating)){
            updatedMovie.rating =rating
        } 
        if (year && !isNaN(year) && year.length === 4){
            updatedMovie.year = req.query.year
        }
        updatedMovie.save()
        movies.find().then(moviesData => {
            res.json({ status: 200, data: moviesData });
        }).catch(err => {
            console.log("error, no entry find")
        })
    }).catch(err => {
        res.status(404).json({ status: 404, error: true, message: `the movie '${req.params.id}' does not exist` })
    })
})

module.exports = router