module.exports = (error, _req, res, next) => {
    res.status(error.statusCode ? error.statusCode : 500).json({message: error.message});
    next();
}