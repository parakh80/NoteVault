const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
   title:{
     type:String,
     required:true
   },
   description:{
    type:String,
    required:true,
   },
   advice:{
    type:String,
   },
   tag:{
    type:String,
    default:'General'
   },
   date:{
   type:Date,
   default:Date.now
   }
})

module.exports =  mongoose.model('note',noteSchema);