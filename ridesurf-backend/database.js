var admin = require("firebase-admin")
var serviceAccount = require('./ridesurf-53842-firebase-adminsdk-il1lb-e0207371c9.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://ridesurf-53842.firebaseapp.com'
})

module.exports = admin.firestore()