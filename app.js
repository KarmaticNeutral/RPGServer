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
const basicCallback = (results) => {
    if (results)
        res.status(200).json(results)
    else
        res.status(503).send("Service Unavailable")
}

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
    SqlService.GetAllCreatures()
})

app.get('/api/creature/:creatureId', (req, res) => {
    SqlService.GetCreature(req.params.creatureId, basicCallback)
})

app.get('/api/user/creatures', (req, res) => {
    SqlService.GetUserCreatures(req.oidc.user, basicCallback)
})

app.get('/api/user', (req, res) => {
    res.status(200).json(req.oidc.user)
})

app.get('/api/item/:itemId', (req, res) => {
    SqlService.GetItem(req.params.itemId, basicCallback)
})

app.get('/api/purse/:creatureId', (req, res) => {
    SqlService.GetCreaturePurse(req.params.creatureId, basicCallback)
})

app.get('/api/inventory/:creatureId', (req, res) => {
    SqlService.GetCreatureInventory(req.params.creatureId, basicCallback)
})

app.get('/api/creature/:creatureId/languages', (req, res) => {
    SqlService.GetCreatureLanguage(req.params.creatureId, basicCallback)
})

app.get('api/creature/attacks/:creatureId', (req, res) => {
    SqlService.GetCreatureAttacks(req.params.creatureId, basicCallback)
})

app.get('/api/damagetype/', async (req, res) => {
    SqlService.GetDamageTypes(basicCallback)
})

app.get('/api/damagetype/:type_id', (req, res) => {
    SqlService.GetDamageType(req.params.type_id, basicCallback)
})

app.get('/api/alignment', (req, res) => {
    SqlService.GetAlignments(basicCallback)
})

app.get('/api/alignment/:alignmentId', (req, res) => {
    SqlService.GetAlignment(req.params.alignmentId, basicCallback)
})

app.get('/api/creature/:creatureId/classes', (req, res) => {
    SqlService.GetCreatureClasses(req.params.creatureId, basicCallback)
})

app.get('/api/creature/type', (req, res) => {
    SqlService.GetCreatureTypes(basicCallback)
})

app.get('/api/creature/type/:creatureTypeId', (req, res) => {
    SqlService.GetCreatureType(req.params.creatureTypeId, basicCallback)
})

app.get('/api/creature/:creatureID/damage_modification', (req, res) => {
    SqlService.GetCreatureDamageModifications(req.params.creatureID, basicCallback)
})

app.get('/api/modification_type', (req, res) => {
    SqlService.GetModificationTypes(basicCallback)
})

app.get('/api/modification_type/:type_id', (req, res) => {
    SqlService.GetModificationType(req.params.type_id, basicCallback)
})

app.get('/api/ability', (req, res) => {
    SqlService.GetAbilities(basicCallback)
})

app.get('/api/ability/:abilityId', (req, res) => {
    SqlService.GetAbility(req.params.abilityId, basicCallback)
})

app.get('/api/class/name', (req, res) => {
    SqlService.GetClassNames(basicCallback)
})

app.get('/api/creature/:creatureId/class', (req, res) => {
    SqlService.GetCreatureClasses(req.params.creatureId, basicCallback)
})

app.get('/api/background', (req, res) => {
    SqlService.GetBackgrounds(basicCallback)
})

app.get('/api/creature/:creatureId/background', (req, res) => {
    SqlService.GetCreatureBackground(req.params.creatureId, basicCallback)
})

app.get('/api/magic_school', (req, res) => {
    SqlService.GetMagicSchoolNames(basicCallback)  
})

app.get('/api/magic_school/:schoolId', (req, res) => {
    SqlService.GetMagicSchool(req.params.schoolId, basicCallback)
})

app.get('/api/spell/:spellId', (req, res) => {
    SqlService.GetSpell(req.params.spellId, basicCallback)
})

app.get('/api/creature/:creatureId/spell', (req, res) => {
    SqlService.GetKnownSpells(req.params.creatureId, basicCallback)
})

app.get('/api/feature/:featureId', (req, res) => {
    SqlService.GetFeature(req.params.featureId, basicCallback)
})

app.get('/api/sourceType/:sourceTypeId', (req, res) => {
    SqlService.GetSourceType(req.params.sourceTypeId, basicCallback)
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, () => {console.log(`Server is listening on port ${port}...`)})
