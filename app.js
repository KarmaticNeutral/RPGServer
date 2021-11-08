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
    res.status(200).send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out')
})

app.get('/api/creature/all', (req, res) => {
    res.status(200).json(SqlService.GetAllCreatures())
})

app.get('/api/creature/:creatureId', (req, res) => {
    res.status(200).json(SqlService.GetCreature(req.params.creatureId, req.oidc.user))
})

app.get('/api/user/creatures', (req, res) => {
    res.status(200).json(SqlService.GetUserCreatures(req.oidc.user))
})

app.get('/api/user', (req, res) => {
    res.status(200).json(SqlService.GetUserId(req.oidc.user))
})

app.get('/api/item/:itemId', (req, res) => {
    res.status(200).json(SqlService.GetItem(req.oidc.itemId))
})

app.get('/api/inventory/:creatureId', (req, res) => {
    res.status(200).json(SqlService.GetCreatureInventory(req.oidc.creatureId))
})

app.get('/api/creature/:creatureId/languages', (req, res) => {
    res.status(200).json(SqlService.GetCreatureLanguages(req.oidc.creatureId))
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, () => {console.log(`Server is listening on port ${port}...`)})
