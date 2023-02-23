const mongoose = require('mongoose')
const process = require('process')
mongoose.set('strictQuery',false)

const url = process.env.MONGODB_NOTES
console.log('connecting to',url)

mongoose.connect(url).then(() => {
  console.log('connected to mongodb')
}).catch(err => {
  console.log('error connecting to mongodb '+err.message)
})

const noteSchema = new mongoose.Schema({
  title:String,
  author:String,
  description:String,
  important:Boolean
})
noteSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note',noteSchema)


