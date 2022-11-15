const Joi = require('joi');
const models = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

const registerUser = async (req, res) => {
    try{
        const value = await registerSchema.validateAsync({
            email : req.body.email,
            password : req.body.password,
        })
        const [user, created] = await models.user.findOrCreate({
            where: {
                email: value.email,
            },
            defaults: {
                email: value.email,
                password: value.password,
            },
        });
    
        if (!created) {
            return res.status(400).json({
                message: "Email already exists",
                error: true,
            })
        }
    
        return res.status(201).json({
            success: true,
            message: "User created",
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Please enter email and password correctly",
            data: err,
        })
    }
}

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginUser = async (req, res) => {
    try{
        const value = await loginSchema.validateAsync({
            email : req.body.email,
            password : req.body.password,
        })
        const user = await models.user.findOne({
            where: {
                email: value.email,
            },
        });

        if(user === null){
            return res.status(400).json({
                error: true,
                message: "User doesnt exist",
                data: null,
            })
        }
    
        bcrypt.compare(value.password, user.password, function(err, result) {
            if(err || !result){
                return res.status(400).json({
                    error: true,
                    message: "Please enter a correct password",
                    data: err,
                })
            }
            else{
                const token = jwt.sign(
                    { userId: user.id, email: user.email },
                    process.env.JWT_SECRET || "SECRET_KEY"
                );
               return res.json({
                    success: true,
                    messsage: "Logged in",
                    data: {
                        token,
                        user:{
                            id: user.id,
                            email: user.email,
                        },
                    },
               })
           }
        });
    }catch(err){
        console.log(err)
        return res.status(400).json({
            error: true,
            message: "Something went wrong. Please try again",
            data: err,
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
}