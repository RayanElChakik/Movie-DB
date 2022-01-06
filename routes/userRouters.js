const express = require ('express')
const users= express.Router()
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const user = require('../models/Users')

// const userList = new user({
//     userName: "new-rayan_2022",
//     password: "mongoDB2022",
// },
// { "userName":"movies-2000"
//   "password": "movies222"
// }
// )

// User Route Succesfful Entry Message
users.get('/',(red,res)=>{
    res.json({messsage: 'User Entry!'})
})

// // //Post
users.get('/read',(req,res) =>{
    user.find().then(data=>{
        res.json({status:200 , data: data});
            }).catch(err => res.json({message: err}))
})

// Creating a Registration route
users.get('/register',(req,res)=>{
        const{userName,password} = req.query;
        if(!userName && !password){
            res.json({status:400, message:'You must enter both your username and password'})
        }
        if(userName === usersList.userName && password === usersList.password){
            res.json({status:200 , message:'Sucessful Access!'})
        }
        else{
            res.json({message:'Unauthenticated user access! Please enter a valid user and password'})
        }
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
    if (password !="" && userName != "" && password && userName) {
        user.create({
            userName: userName,
            password: password,
        }
        ).then(() => {
            user.find()
                .then(userData => {
                    res.send({ status: 200, data: userData });
                }).catch(err => {
                    console.log("error, no entry found")
                })
        }).catch(err => { "error, connot create element"});
    } else res.status(403).send({ status: 403, error: true, message: 'you cannot create an account without a userName and a password' });
})

//Router Creation for deleting movies by id
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

// // Creating a route to update an item from the list 
users.put('/update/:ID',(req,res)=>{
    let fetchedID = req.params.ID
    let userName = req.query.userName
    let password = req.query.password
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
        } else{
            res.status(404).json({ status: 404, error: true, message: `the user id: '${req.params.ID}' does not exist` })
        }
    })
})

module.exports = users