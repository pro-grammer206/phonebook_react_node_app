const express = require('express')
const app = express()
const config = require('./utils/config')
const morgan = require('morgan')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')


//add cors middleware
const cors = require('cors')




mongoose.set('strictQuery',false)
const url = config.MONGODB_URI




//add routers
const contactRouter = require('./routers/contactRouter')


// eslint-disable-next-line no-unused-vars
const customMorganMiddleware = require('./middlewares/morgancustom')



//middlwares-----------------------------------------------------
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//--------------------------------------------------------------------

//contact route
app.use('/api/persons',contactRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



app.listen(config.PORT,() => {
  mongoose.connect(url).then(() => {
    logger.info('connected to mongodb')})
    .catch(err => {
      logger.error('error connecting to mongodb '+err.message)
    })
})

module.exports = app