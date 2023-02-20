const mongoose = require('mongoose')
//DB url


if(process.argv.length<2){
    console.log('give password as argument');
    process.exit(1)
}


const password = process.argv[2]
const name=process.argv[3]
const number = process.argv[4]



const mongoDBUrl = `mongodb+srv://m001-student:${password}@sandbox.8cath.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(mongoDBUrl )

const phoneBookSchema = new mongoose.Schema({
    name:String,
    number:String
})

const Contact = mongoose.model('Contact',phoneBookSchema)

if(name && number){
    const contact = new Contact({name,number})
    contact.save().then(result=>{
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    Contact.find({}).then(result=>{
        console.log('Phonebook:')
        result.forEach(data=>console.log(data.name,data.number))
        mongoose.connection.close()
    })
}
