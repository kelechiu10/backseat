const express = require('express')
const config = require('./config')
const server = express()
const cors = require('cors')
//const router = require('./api')

const ridesRouter = require('./api/rides')
const homeRouter = require('./api/index')
const contactRouter = require('./api/contact')
server.use(express.json())
server.use(express.urlencoded({ extended: true}))
//server.use('/api', router)

server.use('/rides', ridesRouter)
server.use('/',homeRouter)
server.use('/contact', contactRouter)
/*
server.get('/', (req, res) => {
    //get the homepage
    res.send('Big money moves yes')
})*/

server.listen(config.PORT, ()=> {
    console.log('App listening at https://localhost:' + config.PORT)
})

