const mongoose = require("mongoose");
const DataSchema = mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    userName:{type:String, unique:true},
    mobileNumber:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(value);
            },
            message:"Hey brother/sister please enter valid Bangaldeshi Mobile Number"
        }
    },
    country:{type:String, required:true},
    date:{type: Date, default: Date.now},
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return /\S+@\S+\.\S+/.test(value)
            },
             message:"Hey Crazy man, Your Email address is not valid!!"
        }
    },
    password:{type:String, required:true, minLength:8},
    caption:{type:String}
    // post:[{
    //     status:String,
    //     date:{type:Date,  default: Date.now},
    // }]
}, {versionKey:false});
const ProfileModel = mongoose.model("profiles", DataSchema);
module.exports = ProfileModel;
