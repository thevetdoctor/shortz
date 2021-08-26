const mongoose = require('mongoose');
const dbUri = 'mongodb+srv://obar:animalworld@urlshortener.0ukzi.mongodb.net/urlshortener?retryWrites=true&w=majority';

const db = async() => {

    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connected');
    } catch (error) {
        console.log('DB connection error');
        process.exit(1);
    }
    
};

module.exports = db;