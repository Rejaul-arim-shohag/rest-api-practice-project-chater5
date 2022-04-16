const TodoListModel = require("../Models/TodoListModel");
// const date = new Date();

exports.createTodo =(req,res)=>{
    const todoSubject = req.body.todoSubject;
    const todoDescription = req.body.todoDescription;
    const userName = req.headers.userName;
    const todoStatus = "New";
    const todoCreatedDate = Date.now();
    const todoUpdateDate =Date.now();

    const data = {
        todoSubject:todoSubject,
        todoDescription:todoDescription,
        userName:userName,
        todoStatus:todoStatus,
        todoCreatedDate:todoCreatedDate,
        todoUpdateDate:todoUpdateDate,
    };
    TodoListModel.create(data, (err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            res.status(200).json({"Status":"Success", "Data":data})
        }
    })

}

exports.selcetTodo = (req, res)=>{
    const userName = req.headers.userName;
    console.log(userName)
    TodoListModel.find({userName:userName}, (err, data)=>{
        if(!err){
            res.status(200).json({"Status":"Success", "Data":data})
        }
        else{
            res.status(400).json({"Status":"Fail", "data":err})
        }
    })
}

exports.updateTodo=(req, res)=>{
    const todoSubject= req.body.todoSubject;
    const todoDescription = req.body.todoDescription;
    const id = req.body.id;
      const postBody = {
        todoSubject:todoSubject,
        todoDescription:todoDescription,
        todoUpdateDate:Date.now(),
    }
    TodoListModel.updateOne({_id:id},{$set:postBody},{upsert:true},(err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            res.status(200).json({"Status":"Success", "Data":data})
        }
    })
}

exports.updateTodoStatud = (req, res)=>{
    const reqId = req.body.id;
    const updatedTodoStatus = req.body.todoStatus;
    const updateTime = Date.now();
    const postBody = {
        todoStatus:updatedTodoStatus,
        todoUpdateDate:updateTime
    }

    TodoListModel.updateOne({_id:reqId}, {$set:postBody},{upsert:true}, (err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            res.status(200).json({"Status":"Success", "Data":data})
        }
    })
}

exports.removeTodo = (req, res)=>{
    const id = req.body.id;
    TodoListModel.remove({_id:id}, {justOne:true}, (err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            res.status(200).json({"Status":"Success","Data":data})
        }
    })
}

exports.todoFindByStatus = (req, res)=>{
    const todoStatus = req.body.todoStatus;
    TodoListModel.find({todoStatus:todoStatus}, (err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            res.status(200).json({"Staus":"Success", "Data":data})
        }
    })
}

exports.selectTodoByDate = (req, res)=>{
    const userName =  req.headers.userName;
    const fromDate = req.body.formDate;
    const toDate = req.body.toDate;
    TodoListModel.find({userName:userName, todoCreatedDate:{$gte:new Date(fromDate), $lte:new Date(toDate)}}, (err, data)=>{
        if(err){
            res.status(400).json({"Status":"Fail", "Data":err})
        }
        else{
            console.log(data.length)
            res.status(200).json({"Status":"Success", "Data":data})
        }
    })
}