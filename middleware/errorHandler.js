const {contacts} = require('../contacts')

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500
    switch (statusCode) {
        case contacts.VALIDATION_ERROR:
            res.json({
                title:'Validation error',
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case contacts.UNAUTHORIZED:
            res.json({
                title:'Un Authorized error',
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case contacts.FORBIDDEN:
            res.json({
                title:'Forbidden error',
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case contacts.NOT_FOUND:
            res.json({
                title:'Not Found',
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case contacts.SERVER_ERROR:
            res.json({
                title:'Not working server',
                message:err.message,
                stackTrace:err.stack
            })
        default:
            console.log('Not error. All good!')
            break;
    }
}



module.exports=errorHandler