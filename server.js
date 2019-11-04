const express = require('express');
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());
server.use(logger);
server.use('/api/accounts', accountsRouter)
server.use((req,res) => {
    res.status(404).send('Aint nobody got time for that')
})

server.get('/', (req,res) => {
    res.send(`<h2> Let's write some SQL`)
})

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`)

    next();
}

module.exports = server;