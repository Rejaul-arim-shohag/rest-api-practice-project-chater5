const mongoose = require("mongoose");
const TodoSchema = mongoose.Schema({ 
    userName:{type:String},
    todoSubject:{type:String, required:true},
    todoDescription:{type:String},
    todoStatus:{type:String},
    todoCreatedDate:{type:Date},
    todoUpdateDate:{type:Date},
}, {versionKey:false});
const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;
