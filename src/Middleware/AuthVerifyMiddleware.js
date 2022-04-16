const jwt = require('jsonwebtoken');
module.exports=(req, res, next)=>{
    const token = req.headers.token;
    jwt.verify(token, 'secretKey123', (err, decoded)=>{
        if(err){
            res.status(401).json({"status":err});
        }
        else{
            //catch userName from decoded and set the request headers, jar jonno userRead  data get korer somay amdr k abr query ta bola na lage, chaile query ba params diye korte partam
            const userName = decoded.userName;
            req.headers.userName = userName;
            next();
        }
    })
}