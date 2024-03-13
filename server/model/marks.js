const mongoose = require('mongoose');
const {Schema} = mongoose;

const marksSchema = new Schema(
    {
    
        name :{
            type :String,
            require :true,
        },
        teamname :{
            type :String,
            require :true,
        },
        regno :{
            type :String,
            require :true,
        },
        points:{
            type:Number,
            require:true,
        }
    },
);

const Marks = mongoose.model('Marks',marksSchema);


module.exports = Marks;