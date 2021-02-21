const express = require('express')
const config = require('./config')
const server = express()
const cors = require('cors')

const ridesRouter = require('./api/rides')
const usersRouter = require('./api/users')

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //res.header("Access-Control-Allow-Methods", "GET POST PUT DELETE")
    next()
})
server.use(express.json())
server.use(express.urlencoded({ extended: true})) 

server.use('/rides', ridesRouter)
server.use('/users', usersRouter)

server.listen(config.PORT, ()=> {
    console.log('App listening at https://localhost:' + config.PORT)
})

