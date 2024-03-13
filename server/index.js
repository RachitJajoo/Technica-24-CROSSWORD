const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Marks = require("./model/marks");
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/CROSSWORD')
.then(() =>{ 
    console.log('Connected!')
}).catch( (err)=>{
    console.log(err.message);
});

app.use(cors());
app.use(express.json());


app.post('/api/upload',  async (req , res , next)=>{
 try {
    const {name , teamname , regno , marks} = req.body;

    const user = await Marks.findOne({regno});
    if( user ) return res.json({status: false, msg : "You can only submit the form once."});
    console.log(marks);
    const data = await Marks.create(
        {
            name : name ,
            teamname : teamname,
            regno : regno,
            points : marks,
        }
    );
    return res.json({status : true});
 } catch (error) {
    next(error);
 }   
});


app.listen(8080, ()=>{
    console.log("Listening to port 8080!");
});