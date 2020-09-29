const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verification(){
    return function(req, rest, next){
        var tokenWithBearer = req.headers.authorization; //init with Bearer token authorization
        
        if(tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1]; //split
            
            jwt.verify(token, config.secret, function(err, decoded){ //verify token apabila tersedia
                if(err){
                    return rest.status(401).send({auth:false, message:'Token not register!'});
                }else {
                    req.auth = decoded;
                    next(); //lanjut proses berikutnya
                }
            });
        }else {
            return rest.status(401).send({auth:false, message:'Token not available!'}); //status message
        }
    }
}

module.exports = verification