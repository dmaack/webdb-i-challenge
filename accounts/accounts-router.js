const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

// CREATE Requests
router.post('/', (req,res) => {
    const newAccount = req.body

    db('accounts')
    .insert(newAccount)
    .then(added => {
        res.status(201).json({ message: 'You have successfully created a new account'})
    })
    .catch(err => {
        res.status(500).json({ error: 'Could not add new account to the database'})
    })
})
// READ Requests
router.get('/', (req,res) => {

    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(() => {
        res.status(500).json({ error: 'Failed to get accounts from database'})
    })
})


// UPDATE Requests

// DELETE Requests


module.exports = router