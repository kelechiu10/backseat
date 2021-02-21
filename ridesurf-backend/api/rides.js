const express = require('express')
const { doc } = require('../database')
const router = express.Router()
const db = require('../database')
const FieldValue = require('firebase-admin').firestore.FieldValue

/** 
 * CRUD format
*/

/* GET ride listing. */
router.get('/', async (req, res) => {
    const params = req.query
    const ridesRef = db.collection('rides')
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

/* CREATE ride listing */
router.post('/', (req, res) => {
    if (req.body) {
        const docRef = db.collection('rides').doc(req.body.rideID)
        docRef.set(req.body)
        
        const usersRef = db.collection('users').doc(req.body.sharerUid)
        usersRef.set({
            sharerUid: req.body.sharerUid,
            rides: FieldValue.arrayUnion(req.body.rideID)},
            {merge: true}
        )

        res.status(200).send("Added ride")
    } else {
        res.status(400).send("No ride to add")
    }
})

/* UPDATE listing  */
router.put('/', async (req, res) => {
    //sharerUid, rideID
    const params = req.body
    // verifying that id is in the request
    if (!params.sharerUid || !params.rideID) {
        res.status(400).send("missing id in the request")
        return
    } else {
        const ridesRef = db.collection('rides').doc(params.rideID)
        const result = await ridesRef.update({
            passengerIDs: FieldValue.arrayUnion(params.sharerUid),
            passengers: FieldValue.increment(1)
        })
    }

    // need the id of the person as well as the ID of the requested ride in order to be added
    
    // TODO: Given the ID and other fields from the request, update the corresponding item in our database.
    res.status(200).send("completed update")
})

/* DELETE ride listing */
router.delete('/', (req, res) => {
    const params = req.body;
    // verifying that id is in the request
    if (params.rideID) {
        db.collection('rides').doc(params.rideID).delete()
        db.collection('users').doc(params.sharerUid).update({
            rides: FieldValue.arrayRemove(req.body.rideID)
        })
        res.status(200).send("completed delete")
    }

})

module.exports = router
