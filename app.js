const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const SqlService = require('./sqlService')
const { auth, requiresAuth } = require('express-openid-connect')
require('dotenv').config()

app.use(
    express.static('./public'),
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
    })
)

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out')
})

app.get('/api/creature/all', requiresAuth(), (req, res) => {
    res.json(SqlService.GetAllCreatures())
})

app.get('/api/creature/:creatureId', requiresAuth(), (req, res) => {
    res.json(SqlService.GetCreature(req.params.creatureId))
})

app.get('/api/user/creatures', requiresAuth(), (req, res) => {
    res.json(SqlService.GetUserCreatures(req.oidc.user))
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, () => {console.log(`Server is listening on port ${port}...`)})

