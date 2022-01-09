const express = require ('express')
const { Schema } = require('mongoose')
const users= express.Router()
const user = require('../models/Users')
const {registerValidation,loginValidation} = require('./validation')
const bcrypt = require('bcryptjs')
const { validate } = require('../models/Users')
const jwt = require('jsonwebtoken')

// Saved Users
// User 1: "name": Rayan
//          "userName": "new-rayan_2022",
//          "password": "mongoDB2022",
// User 2:     "name": Movie
//             "userName": "movies-2000",
//             "password": "movies222",
// User 3:     "name": Codi
//             "userName": "codi-users",
//             "password": "coditasks",

// User Route Succesfful Entry Message
users.get('/',(red,res)=>{
    res.json({messsage: 'User Entry!'})
})

// Read Users 
users.get('/read',(req,res) =>{
    user.find().then(data=>{
        res.json({status:200 , data: data});
            }).catch(err => res.json({message: err}))
})

// Route creation for sorting the list by its Title
users.get('/read/by-userName' , (req, res) => {
    user.find()
    .then(searchData => {
        res.json({status:200, data: searchData.sort((oldChar,newChar) => oldChar.userName.localeCompare(newChar.title))})
    }).catch(err => {
        console.log("Error!")
    })
})

// Route creation for sorting the list by Users
users.get('/read/by-user',(req,res)=>{
    user.find()
    .then(searchData => {
        res.json({status:200, data: searchData.sort((oldChar,newChar) => oldChar.userName.localeCompare(newChar.title))})
    }).catch(err => {
        console.log("Error!")
    })
})

// Route creation for adding users
users.post('/add',(req,res) =>{
    let userName = req.query.userName;
    let password = req.query.password;
    let name = req.query.name;
    // Data Validation 
    const {error} = registerValidation(req.query);
    if(error){
        return res.status(403).send({ status: 403, error: true, message: 'you cannot create an account without a userName and a password' });
    } else{
        // User Creation with crypted password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt);
        user.create({
            name: name,
            userName: userName,
            password: password
        }
        ).then(() => {
            user.find()
                .then(userData => {
                    res.send({ status: 200, data: userData });
                }).catch(err => {
                    console.log("error, no entry found")
                })
        }).catch(err => { "error, connot create element"});
    }
})

// Router for login Validation 
users.post('/login', async (req,res) =>{ 
    const {error} = loginValidation(req.query);
    if(error) return res.status(403).send({ status: 403, error: true, message: 'you cannot create an account without a userName and a password' });
    const fetchedUser = await user.findOne({userName: req.query.userName});
    if(!fetchedUser) return res.status(403).send({ status: 403, error: true, message: 'Invalid userName please enter a valid one!' });
    console.log(fetchedUser.password)
    console.log(req.query.password)
    const validPass = bcrypt.compare(req.query.password,fetchedUser.password)
    if(!validPass) return res.status(403).send({ status: 403, error: true, message: 'Invalid password please enter a valid one!' });
    // Creating and assigning a token
    const token = jwt.sign({_id: fetchedUser._id},process.env.TOKEN_SCERET)
    res.header('auth-token',token).json({token: token, message: 'Congrats! You have successfully logged in!'})
})

// Router Creation for deleting movies by id
users.delete("/delete/:id", (req, res) => {
    user.findByIdAndDelete(req.params.id).then(()=> {
        user.find().then(userData => {
            res.send({ status: 200, data: userData });
        }).catch(err => {
            console.log("error, no entry find")
        })
    }).catch(err => {
        res.status(404).send({ status: 404, error: true, message: `the movie '${req.params.id}' does not exist` });
    })
});

// Creating a route to update an item from the list 
users.put('/update/:ID',(req,res)=>{
    let fetchedID = req.params.ID
    let userName = req.query.userName
    let password = req.query.password
    let name = req.query.name;
    user.findById(fetchedID).then((updatedUser) => {
        const updateFunction = () =>{
            updatedUser.save()
            user.find().then(userData => {
                res.json({ status: 200, data: userData });
            }).catch(err => {
                console.log("error, no entry find")
            })
        }
        if (userName && userName !== undefined && userName !== ""){
            updatedUser.userName = userName
            updateFunction()
        } else if (password && password !== ""){
            updatedUser.password = password
            updateFunction()
        }else if (name && name !== ""){
            updatedUser.name = name
            updateFunction()
        } else{
            res.status(404).json({ status: 404, error: true, message: `the user id: '${req.params.ID}' does not exist` })
        }
    })
})

module.exports = users