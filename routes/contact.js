const exp = require('express');
const controller = require('../controllers/contact');
const auth = require('../auth');
const {verify, verifyAdmin} = auth;


//Routing
const route = exp.Router();



//create

route.post('/create', (req, res) => {
    let data = req.body
    controller.createContact(data)
    .then(outcome =>{
        res.send(outcome);
    })
});

//display

route.get('/all', (req, res)=>{
    controller.displayAllContact()
    .then(outcome =>{
        res.send(outcome);
    })
})

route.get('/:id', (req, res)=>{
    let contactId = req.params.id
    controller.displayContactId(contactId)
        .then(outcome =>{
            res.send(outcome)
        })
}) 


route.put('/:id', (req, res)=>{
    let id = req.params.id;
    let details = req.body;

    let cName = details.name;
    let cEmail = details.email;
    let cPhone = details.phone;
        if(cName !=='' && cEmail !=='' && cPhone !==''){
            controller.updateContact(id, details)
                .then(outcome =>{
                    res.send(outcome);
                    
                })    
        }
        else{
            res.send({message: 'Incorrect Input, Make sure details are complete'})
        }
          
})

//delete

route.delete('/:id/delete', (req, res)=>{
    let contactId = req.params.id;
    controller.deleteContact(contactId)
    .then(outcome=>{
        res.send(outcome);
    })
})



module.exports = route;

