const morgan = require('morgan')
const customMorganMiddleware = morgan.token('body',function getContent(req){
    if(req.method==='POST'){
        return JSON.stringify(req.body)
    }
    return ""
})
module.exports =customMorganMiddleware