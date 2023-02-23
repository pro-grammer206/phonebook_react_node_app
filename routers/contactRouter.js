const router = require('express').Router()
const Contact = require('../models/contact')


router.get('/',(req,res) => {
  Contact.find({}).then(result => {
    res.json(result)
  })
})
  .post('/',(req,res,next) => {
    const { name,number } = req.body
    if(!name){
      return res.status(404).json({ error:'name is mandatory' })
    }
    if(!number){
      return res.status(404).json({ error:'number is mandatory' })
    }
    if(req.body===null){
      return res.status(400).json({ error:'content missing' })
    }
    const contact = new Contact({ name,number })
    contact.save().then(savedContact => res.json(savedContact)).catch(err => next(err))
  })
  .get('/info',(req,res) => {
    Contact.find({}).then(result => {
      const info = `Phonebook has info for ${result.length} people as on ${new Date().toUTCString()}`
      res.send(info)
    })
  })
  .get('/:id',(req,res) => {
    const { id } = req.params
    Contact.findById(id).then(contact => {
      if(contact){
        res.json(contact)
      }else{
        res.status(404).end()
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ err:'malforamtted id' })
    })
  })
  .put('/:id',(req,res,next) => {
    const { name,number } = req.body
    const contact = { name,number }
    Contact.findByIdAndUpdate(req.params.id,contact,{ new:true,runValidators: true, context: 'query' })
      .then(updatedContact => {res.json(updatedContact)})
      .catch(error => next(error))
  })
  .delete('/:id',(req,res,next) => {
    const id = req.params.id
    Contact.findByIdAndRemove(id).then(() => res.status(204).end()).catch(error => next(error))
  })



module.exports = router