const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce');
        console.log('MongonDB Connected !');
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = connectDB;