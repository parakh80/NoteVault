const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/NoteVault';


const connectMongo = async () => {
   
    await mongoose.connect(mongoURI);
  
    console.log('Connected to mongo succesfully')

}

module.exports =  connectMongo;