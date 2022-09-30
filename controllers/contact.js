const Contact = require('../models/Contact');


//add
module.exports.createContact = (info) =>{
    let cName = info.name;
    let cEmail = info.email;
    let cPhone = info.phone;

    let newContact = new Contact({
        name: cName,
        email: cEmail,
        phone: cPhone
    })

    return newContact.save()
    .then((savedContact, error)=>{
        if(error){
            return 'Failed to Save New Document';
        }

        else{
            return savedContact;
        }
    })
}
//display all
module.exports.displayAllContact = () =>{
    return Contact.find({})
    .then(outcome =>{
        return outcome;
    })
}

module.exports.displayContactId = (id) =>{
    return Contact.findById(id)
    .then(idSearch  =>{
        return idSearch;
    })
}

module.exports.updateContact = (id, details) =>{
    let cName = details.name;
    let cEmail = details.email;
    let cPhone = details.phone;

    let updatedContact = {
        name: cName,
        email: cEmail,
        phone: cPhone
    }

    return Contact.findByIdAndUpdate(id, updatedContact)
        .then((contactUpdated, err)=>{
            if(err){
                return false;
            }
            else{
                return true; 
            }
        })

}


module.exports.deleteContact = (id)=>{
    return Contact.findByIdAndRemove(id)
    .then((removedContact, err) =>{
        if(removedContact){
            return true;
        }
        else{
            return false;
        }
    })
}