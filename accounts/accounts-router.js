const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

// CREATE Requests
router.post('/', validateAccountBody, (req,res) => {
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

router.get('/:id', validateAccountId, (req,res) => {
    const id = req.params.id
    db('accounts')
        .where({id: req.params.id})
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to get this account'})
        })
})


// UPDATE Requests
router.put('/:id', validateAccountBody, (req,res) => {
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


//MIDDLEWARE

function validateAccountBody(req, res, next) {
    if(!req.body.name || !req.body.budget) {
        res.status(400).json({ error: 'Please provide a name(string) AND budget(number) for this account'})
    } else if(req.body.budget < 0) {
        res.status(400).json({ error: 'Please provide a budget greater than or equal to 0'})
    }else { 
        next();
    }
}

function validateAccountId(req, res, next) {
    const id = req.params.id

    db('accounts')
    .where({id: req.params.id})
    .then(account => {
        if(account) {
            next();
        } else {
            res.status(404).json({ error: 'No account with that ID exists'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'Server error'})
    })

} 
module.exports = router