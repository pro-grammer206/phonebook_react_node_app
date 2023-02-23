const router = require('express').Router()
const Note = require('../models/notes')

router.get('/',(req,res) => {
  Note.find({})
    .then(results => res.json(results))
    .catch(err => console.log(err))
})

router.post('/',(req,res,next) => {
  const { title,author,description,important } = req.body
  if(title && author && description && important){
    const note = new Note({ title,author,description,important })
    note.save()
      .then(savedNote => res.status(200).json(savedNote))
      .catch(err => next(err))
  }else{
    res.json({ error:'invalid parameters' })
  }
})


module.exports = router