const exp = require("express");
const controller = require('./../controllers/users.js')
const auth = require('../auth')
const {verify, verifyAdmin} = auth

const route = exp.Router();


route.post('/register', (req, res)=>{
    let userDetails = req.body;
    controller.registerUser(userDetails)
        .then(outcome=>{
            res.send(outcome)
        })
});

// route.post('/login', controller.loginUser)

route.post('/login', (req, res)=>{
    let loginDetails = req.body;
    controller.loginUser(loginDetails)
        .then(outcome=>{
            res.send(outcome)
        })
})

route.get('/all', verify, verifyAdmin, (req,res)=>{
    
})


module.exports = route;