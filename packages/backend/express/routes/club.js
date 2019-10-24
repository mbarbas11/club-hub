const express = require('express')
const router = express.Router()
const admin = require('firebase-admin');
const { ClubSchema } = require('@clubhub/common/models');


/* GET users listing. */
router.post('/', async (req, res, next) => {
    const db = admin.firestore();


    await db.collection('users').add({
        id : '1241'
    })
    res.send('respond with a resource')
})

module.exports = router
