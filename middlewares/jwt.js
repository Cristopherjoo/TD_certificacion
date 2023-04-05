const jwt = require('jsonwebtoken');
const SECRETO = process.env.SECRETO || "12345";

const verificarToken = (req, res, next) => {

    let token;
    let tokenQuery = req.query.token;
    if(tokenQuery) token = tokenQuery;
    let tokenHeader = req.headers['authorization'];

    if(tokenHeader){
        tokenHeader = tokenHeader.split(" ");
        tokenHeader = tokenHeader[1];
        token = tokenHeader;
    }
    if(token){
        jwt.verify(token, SECRETO, (error, data) => {
            if(error) return res.status(401).json({code:401, message:"Token no válido."})
            req.usuario = data.usuario
            next();
        })
    }else{
        return res.status(401).json({code:401, message:"Debe proporcionar un token."})
    }
}


module.exports = {
    verificarToken
}