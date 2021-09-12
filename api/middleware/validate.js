// const Users = require("../users/users-model")

function validateUser (req,res, next) {
    const {username, password} = req.body

    if(username && password){
        next()
    } else{
        res.status(401).json({message: "Username and password required"})
    }
}

module.exports = {
    validateUser
}