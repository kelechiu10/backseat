const express = require('express')
const router = express.Router()

/** 
 * CRUD format
*/

/* GET ride listing. */
router.get('/', (req, res) => {
    const params = req.query
    if (params.id) {
        // if we are provided an id, we should only return that game
        res.json(gamesDB[params.id])
        return
    } else {
        res.json('the whole thing')
        return
    }

    // TODO: Add filtering so we only get the results we want (get games with price under $10). 
    res.status(200).json(gamesDB);
});

/* CREATE ride listing */
router.post('/', (req, res) => {
    //create a new ride

    // TODO: Take in the data from the request, create a games object using this data, and add this to our database.
    res.status(200).send(uuid);
});

/* UPDATE listing  */
router.put('/', (req, res) => {
    const params = req.body
    // verifying that id is in the request
    if (!params.id) {
        res.status(400).send("missing id in the request")
        return
    }

    // need the id of the person as well as the ID of the requested ride in order to be added
    
    // TODO: Given the ID and other fields from the request, update the corresponding item in our database.
    res.status(200).send("completed update");
});

/* DELETE games listing */
router.delete('/', (req, res) => {
    const params = req.body;
    // verifying that id is in the request
    if (!params.id) {
        res.status(400).send("missing id in the request")
        return;
    }
})

module.exports = router