const mongoose = require('mongoose')

const phoneBookSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:3,
    required:true
  },
  number:{
    type:String,
    minLength:[8,'number must be minimum 3 digits with hyphen'],
    validate:{
      validator:function(v){
        return /\d{2,3}-\d{6,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  }
})
phoneBookSchema.set('toJSON',{
  transform:(document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact',phoneBookSchema)


