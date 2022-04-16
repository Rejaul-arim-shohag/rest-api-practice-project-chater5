const ProfileModel = require("../Models/ProfileModel");
var jwt = require('jsonwebtoken');

//create user acount
exports.createProfile = (req, res)=>{
    const data = req.body;
    ProfileModel.create(data, (err, data)=>{
        if(err){
            res.status(500).json({"status":"fail", "data":err})
        }
        else{
            res.status(200).json({"status":"success", "data":data})
        }
    })
};

//user login system with token create 
exports.userLogin = (req, res)=>{
    const reqBody = req.body;
    ProfileModel.find(reqBody, (err, data)=>{
        if(!err && data.length>0){
            //jwt token create payload
            const payload = {
                // exp: Math.floor(Date.now() / 1000) + (24+60 * 60),
                expiresIn: '24h',
                firstName:data[0].firstName,
                lastName:data[0].lastName,
                userName:data[0].userName,
                date: data[0].date
            };
            const token = jwt.sign(payload, 'secretKey123');
            res.status(200).json({
                "status":"Login success",
                "data":data,
                "token":token
            });
        }
        else{
            res.status(401).json({"status":"Login fail", "data":err})
        }
    })
};

exports.userReadProfile=(req, res)=>{
    const userName = req.headers.userName;
    ProfileModel.find({userName}, (err, data)=>{
        if(err){
            res.status(404).json({"status":"Fail", "data":err})
        }
        else{
            res.status(200).json({"status":"Success", "data":data})
        }
    })

}

exports.updateProfile = (req, res)=>{
    const userName = req.headers.userName;
    const data = req.body;
    // const data = {$push:{status:pushData}}
    ProfileModel.updateOne(
        {userName:userName},{$set:data},{upsert:true}, 
        (err, data)=>{
            if(err){
                res.status(400).json({"Status":"Fail", "data":err})
            }
            else{
                res.status(200).json({"Status":"Success","data":data})
            }
    })
}