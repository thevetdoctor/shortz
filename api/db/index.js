const mongoose = require('mongoose');
const { config } = require('dotenv');

config();
const dbUri = process.env.DB_URI;

const db = async() => {
    
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection error');
        console.log(dbUri ? '' : 'dburi missing');
        // process.exit(1);
    }
    
};

module.exports = db;