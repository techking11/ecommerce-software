const AppError = require('../Utils/errorThrow');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, expireduration} = require('../Config/config.json');
const User = require('../Models/user');

exports.register = async (req, res, next ) => {
    try {
        let { name, email, password } = req.body;
        if( !name ) throw new AppError("Required: your full name !", 400);
        if( !email ) throw new AppError("Required: your email !", 400);
        if ( !password ) throw new AppError("Required: your password !", 400);

        password = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, password
        });

        return res.status(200).json({
            data: user,
            links: req.originalUrl
        });
    } catch (error) {
        error.code === 11000 && error.message == "Duplicate user !";
        next(error);
    }
};

exports.login = async ( req, res, next ) => {
    try {
        const { email, password } = req.body;
        if( !email ) throw new AppError("Required: your email !", 400);
        if ( !password ) throw new AppError("Required: your password !", 400);

        const findUser = await User.findOne({ email });
        if( findUser ) {
            const result = bcrypt.compare(password, findUser.password);
            if( result ) {
                const token = await jwt.sign(
                    {
                        id: findUser._id,
                        name: findUser.name,
                        email: findUser.email,
                        password: findUser.password
                    },
                    secret,
                    {
                        expiresIn: expireduration
                    }
                ); 

                return res.status(200).json({
                    token_type: "Bearer",
                    access_token: token,
                    expiresIn: expireduration,
                    userid: findUser._id,
                    links: req.originalUrl
                });
            }else {
                throw new AppError("Invalid username or password", 400);
            }
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}