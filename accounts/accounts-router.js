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
    .catch(err => {
        res.status(500).json({ error: 'Failed to get accounts from database'})
    })
})


// UPDATE Requests
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const updates= req.body;

    db('accounts')
    .where({id: req.params.id})
    .update(updates)
    .then(success => {
        res.status(201).json({ message: `You successfully updated the account with ID ${id}`})
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to update you account changes'})
    })
})

// DELETE Requests
router.delete('/:id', (req,res) => {
    const id = req.params.id

    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(success => {
        res.status(201).json({ message: `Account with ID ${id} was successfully deleted`})
    })
    .catch(err => {
        res.status(500).json({ error: `Failed to delete the account with ID ${id}`})
    })
})


module.exports = router