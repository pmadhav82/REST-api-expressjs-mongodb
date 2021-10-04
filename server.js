const express = require("express");
const app = express();
const mongoose = require("mongoose");

//accept json
app.use(express.json());


//connect to database
const url = "mongodb://localhost:27017/student";
mongoose.connect(url,{useNewUrlParser:true});
let db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error',(err)=>{
    console.error(err);
})

db.once('open',()=>{
    console.log("connect successfully..")
})



//use student route
const studentRouter = require("./routes/students");
app.use("/students", studentRouter);

app.listen(8000, ()=>{
    console.log("server is running on port 8000");
})