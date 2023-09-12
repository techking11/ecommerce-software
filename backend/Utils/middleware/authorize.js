const { secret } = require("../../Config/config.json");
const jwt = require('jsonwebtoken');

module.exports = async function ( req, res, next ) {
    try {
        const token = req.headers?.authorization.split(" ")[1];
        if( !token ) return res.sendStatus(401);

        jwt.verify(token, secret, (err, _data) => {
            if(err) res.sendStatus(401);
            else next();
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Token missing or invalid !'
        });
    }
}