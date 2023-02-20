const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to',url)

mongoose.connect(url).then(result=>{
    console.log('connected to mongodb')
}).catch(err=>{
    console.log('error connecting to mongodb '+err.message)
})

const phoneBookSchema = new mongoose.Schema({
    name:String,
    number:String
})
phoneBookSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact',phoneBookSchema);

