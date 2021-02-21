const express = require('express')
const router = express.Router()
const db = require('../database')


/** 
 * CRUD format
*/

/* GET ride listing. */
router.get('/', async (req, res) => {
    const params = req.query
    const ridesRef = db.collection('users')
    let queryRef = ridesRef
    const keys = Object.keys(params)
    for(key in params) {
        console.log(key)
        console.log(params[key])
        queryRef = queryRef.where(key, '==', params[key])
    }
    snapshot = await queryRef.get();
    res.status(200).send(snapshot.docs.map(doc => doc.data()))
})


module.exports = router
