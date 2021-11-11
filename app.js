const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const SqlService = require('./sqlService')
const { auth, requiresAuth } = require('express-openid-connect')
const fs = require('fs')
require('dotenv').config()
const logger = require('./middleware/logger.js')

const notFoundPage = fs.readFileSync('./pages/notFound.html')

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
)

app.use([requiresAuth(), logger])

app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        SqlService.CreateUserIfNotExists(req.oidc.user, (results) => {})
        res.status(200).send("Logged In")
    } else {
        res.status(200).send("Logged Out")
    }
})

app.get('/api/creature/all', (req, res) => {
    SqlService.GetAllCreatures((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId', (req, res) => {
    SqlService.GetCreature(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/user/creatures', (req, res) => {
    SqlService.GetUserCreatures(req.oidc.user, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/user', (req, res) => {
    res.status(200).json(req.oidc.user)
})

app.get('/api/item/:itemId', (req, res) => {
    SqlService.GetItem(req.params.itemId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/inventory/:creatureId', (req, res) => {
    SqlService.GetCreatureInventory(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId/languages', (req, res) => {
    SqlService.GetCreatureLanguage(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/damagetype/', async (req, res) => {
    SqlService.GetDamageTypes((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/damagetype/:type_id', (req, res) => {
    SqlService.GetDamageType(req.params.type_id, (results) => {    
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, () => {console.log(`Server is listening on port ${port}...`)})
