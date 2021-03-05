const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Big money moves yes')
})

app.listen(port, ()=> {
    console.log('App listening at https://localhost:3000')
})