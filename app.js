const express = require('express')
const app = express();
const router = require("./src/Routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//security middleware library import
const rateLimit = require('express-rate-limit')
const helemt = require('helmet');
const xssClean =require('xss-clean');
const  mongoSanitize=require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');

//security middleware library implimentation
app.use(cors());
app.use(helemt());
app.use(xssClean());
app.use(mongoSanitize());
app.use(hpp());
// app.use(bodyParser());

//bodyparser implementaion
app.use(bodyParser.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

//mongodb database connection stablish
const uri = "mongodb://127.0.0.1:27017/todo"; //if we use mongodb cloud then we will use mongodb cloud connection string
const options = {user:"", pass:"", autoIndex:true}
mongoose.connect(uri, options, (err)=>{
    if(err){
        
        console.log(err)
    }
    else{
        console.log("connection success")
    }
});

//roouting implementation
app.use("/api/v3", router);

//undefined router
app.use("*", (req, res)=>{
    res.status(404).json({"status":"fail", "data":"undefined route and not found"})
});
module.exports = app;