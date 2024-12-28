const jwt = require('jsonwebtoken')

const validateToken =(req,res,next)=>{
    let token
    let authHeader=req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.header({"x-powered-by":'Aganepes Ahmedow'})
                res.status(401)
                throw new Error('User is not authorization')
            }
            req.user=decoded.user
            next()
        })
        if(!token){
            res.status(401)
            throw new Error('User is not authorization or token is missing')
        }
    }
    
}


module.exports=validateToken