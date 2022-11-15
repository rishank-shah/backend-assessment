const models = require("../models")
const jwt = require("jsonwebtoken")
 

exports.authCheck = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({
            error: true,
            message: "Please Login to continue.",
        });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(
        token,
        process.env.JWT_SECRET || "SECRET_KEY",
        async (err, payload) => {
            if (err) {
                return res.status(401).send({
                    error: true,
                    message: "Please Login to continue.",
                });
            }
            const { userId, email } = payload;
            const user = await models.user.findOne({
                where: {
                    email: email,
                    id: userId,
                },
            });
            if(user === null){
                return res.status(401).send({
                    error: true,
                    message: "Please Login to continue.",
                });
            }
            req.user = user;
            next();
        }
    );
};