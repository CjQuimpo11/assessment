const auth = require("../auth");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const salt = Number(process.env.SALT);


module.exports.registerUser = (data) =>{
    let fName = data.fullName;
    let email = data.email;
    let password = data.password;
    let newUser = new User ({
        fullName: fName,
        email: email,
        password: bcrypt.hashSync(password, salt),

    })
    return User.findOne({email:email}).then(emailResult=>{
        if(emailResult !=null){
            return {message: 'Email Already Registered'}
        }

        else{
            return newUser.save().then((user, rejected)=>{
                if(user){
                    return true;
                }
                else{
                    return {message: 'Failed to Register Account'}
                }
            })
        }
    })
}


//Login

// module.exports.loginUser = (req, res) =>{
//     console.log(req.body)

//     User.findOne({email: req.body.email})
//     .then(foundUser =>{
//         if(foundUser === null){
//             return res.send({message: "User Not Found"})
//         }
//         else{
//             const isPasswordCorrect = bcrypt.compareSync(req.body.password, foundUser.password)
//             console.log(isPasswordCorrect)
        
//             if(isPasswordCorrect){
//                 return res.send({accessToken: auth.createAccessToken(foundUser)})
//             }
//             else{
//                 return res.send(false);
//             }
//         }

//     })
//     .catch(err=> res.send(err));
// }

module.exports.loginUser = (data) =>{
    let email = data.email;
    let password = data.password;
    
    return User.findOne({email: data.email})
        .then(foundUser=>{
            if(foundUser === null){
                return {message: "User Not Found"}
            }
            else{
                const isPasswordCorrect = bcrypt.compareSync(data.password, foundUser.password)
                console.log(isPasswordCorrect)
                        
                 if(isPasswordCorrect){
                        return {accessToken: auth.createAccessToken(foundUser)}
                    }

                else{
                         return {message: "Password incorrect"};
                        }
            }

        })

}

//Functionalities
module.exports.displayAllUser = () =>{
    return User.find({})
    .then(findOutcome =>{
        return findOutcome;
    })
}

module.exports.displayUserId = (id) =>{
    return User.findById(id)
    .then(idSearch=>{
        return idSearch;
    })
}

module.exports.getAllAdminUser = ()=>{
    return User.find({isAdmin: true})
        .then(findAdmin =>{
            return findAdmin;
        })
}

module.exports.deleteUser = (id)=>{
    return User.findByIdAndRemove(id)
        .then((removedUser, err)=>{
            if(removedUser){
                return `User ${id} has been removed`
            }
            else{
                return 'Failed to Remove User'
            }
        })
}