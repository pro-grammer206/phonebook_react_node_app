const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const unknownEndpoint = require('./middlewares/unknownHandler')
const customMorganMiddleware = require('./middlewares/morgancustom')
const PORT = 3001;

//mock data-----------------------------------------------------
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//----------------------------------------------


//middlwares-----------------------------------------------------
app.use(express.json());
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//--------------------------------------------------------------------


app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

app.get('/info',(req,res)=>{
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toUTCString()}</p>`
    res.send(info)
})

app.get('/api/persons/:id',(req,res)=>{
    const {id} = req.params
    const person = persons.find(person=>person.id===Number(id))
    if(person){
        res.json(person)
    }else{
        res.statusMessage = "person not found"
        res.status(404).end()
    }
})
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person=>person.id!==id)
    res.status(204).end()
})

app.post('/api/persons',(req,res)=>{
    const {name,number} = req.body
    if(!name){
        return res.status(404).json({error:"name is mandatory"})
    }
    if(!number){
        return res.status(404).json({error:"number is mandatory"})
    }
    const ifPersonExists = persons.find(person=>person.name.toLowerCase()===name.toLowerCase())
    if(!ifPersonExists){
        const id = Math.floor(Math.random()*10000);
        const newPerson = {id,name,number}
        persons = persons.concat(newPerson)
         return res.json(newPerson)
    }
    return res.status(404).json({error:'name must be unique'})
})

  
app.use(unknownEndpoint)
app.listen(PORT)
