const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  //res.sendFile("index.html")
    res.json({"message":"Ok"})
})

module.exports = router