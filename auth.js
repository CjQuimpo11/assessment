const jwt = require("jsonwebtoken");
const secret = "ExpressAssessment";

module.exports.createAccessToken = (user) =>{
    const data ={
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    console.log(data);
    return jwt.sign(data, secret, {})
}


module.exports.verify = (req, res, next) =>{
    let token = req.headers.authorization;

    if(typeof token === "undefined"){
        return res.send({auth: "Failed No Token"})
        console.log(typeof token)
    }

    else{
        token = token.slice(7, token.length);
        jwt.verify(token, secret, (err, decodedToken)=>{
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            }
            else{
                console.log(decodedToken);
                req.user = decodedToken
                next();
            }
        })
    }
};

module.exports.verifyAdmin = (req, res, next) =>{
        if(req.user.isAdmin === true){
            next();
        }
        else{
            return res.send({
                auth:"Failed",
                message:"Action Forbidden"
            })
        }
}