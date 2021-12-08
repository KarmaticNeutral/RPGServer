const path = require('path')
const express = require('express')
//const https = require('https')
const app = express()
const port = process.env.PORT || 3000

const SqlService = require('./sqlService')
const { auth, requiresAuth } = require('express-openid-connect')
const fs = require('fs')
require('dotenv').config()
const logger = require('./middleware/logger.js')

key = fs.readFileSync("./cert/server.key", 'utf8')
cert = fs.readFileSync("./cert/server.cert", 'utf8')

// console.log(key)
// console.log(cert)

// https.createServer({ key: key, cert: cert }, app).listen(port, () => {console.log(`Server is listening on port ${port}...`)})

app.listen(port, () => {console.log(`Server is running on port ${port}...`)})

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
app.use([logger])
//app.use([requiresAuth(), logger])
//app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

//Working
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        SqlService.CreateUserIfNotExists(req.oidc.user, (results) => {})
        res.status(200).send("Logged In")
    } else {
        res.status(200).send("Logged Out")
    }
})

//Working
app.get('/api/creature/all', (req, res) => {
    SqlService.GetAllCreatures((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId', (req, res) => {
    SqlService.GetCreature(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//TODO
app.post('/api/creature/', (req, res) => {
    SqlService.UpsertCreature(req.body.creature, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId', (req, res) => {
    SqlService.DeleteCreature(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/user/creatures', (req, res) => {
    SqlService.GetUserCreatures(req.oidc.user, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/user', (req, res) => {
    res.status(200).json(req.oidc.user)
})

//Working
app.get('/api/item/:itemId', (req, res) => {
    SqlService.GetItem(req.params.itemId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/item/:itemId', (req, res) => {
    SqlService.DeleteItem(req.params.itemId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId/purse', (req, res) => {
    SqlService.GetCreaturePurse(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/purse', (req, res) => {
    SqlService.DeleteCreaturePurse(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/inventory/:creatureId', (req, res) => {
    SqlService.GetCreatureInventory(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/inventory/:itemId', (req, res) => {
    SqlService.DeleteItemFromInvetory(req.params.itemId, req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/inventory/:creatureId', (req, res) => {
    SqlService.DeleteCreatureInventory(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/inventory/all/:itemId', (req, res) => {
    SqlService.DeleteItemFromAllInventories(req.params.itemId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
}) 

//Working
app.get('/api/creature/:creatureId/languages', (req, res) => {
    SqlService.GetCreatureLanguages(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/languages/:languageId', (req, res) => {
    SqlService.DeleteCreatureLanguage(req.params.creatureId, req.params.languageId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId/attacks', (req, res) => {
    SqlService.GetCreatureAttacks(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/attacks/:attackId', (req, res) => {
    SqlService.DeleteAttack(req.params.attackId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/damagetype/', async (req, res) => {
    SqlService.GetDamageTypes((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/damagetype/:type_id', (req, res) => {
    SqlService.GetDamageType(req.params.type_id, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/alignment', (req, res) => {
    SqlService.GetAlignments((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creaturetype', (req, res) => {
    SqlService.GetAllCreatureTypes((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/alignment/:alignmentId', (req, res) => {
    SqlService.GetAlignment(req.params.alignmentId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId/classes', (req, res) => {
    SqlService.GetCreatureClasses(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//TODO
app.post('/api/creature/:creatureId/classes/:classId/level', (req, res) => {
    SqlService.PutLevelsInCreatureClass(req.params.creatureId, req.params.classId, 1, req.oidc.user, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")        
    })
})

//TODO
app.post('/api/creature/:creatureId/classes/:classId/level/:levels', (req, res) => {
    SqlService.PutLevelsInCreatureClass(req.params.creatureId, req.params.classId, req.params.levels, req.oidc.user, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")        
    })
})

//Working
app.get('/api/creature/type/:creatureTypeId', (req, res) => {
    SqlService.GetCreatureType(req.params.creatureTypeId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature_size', (req, res) => {
    SqlService.GetCreatureSizes((results) => {
    if (results)
        res.status(200).json(results)
    else
        res.status(503).send("Service Unavailable")       
    })
})

//Working
app.get('/api/creature_size/:sizeId', (req, res) => {
    SqlService.GetCreatureSize(req.params.sizeId, (results) => {
    if (results)
        res.status(200).json(results)
    else
        res.status(503).send("Service Unavailable")       
    })
})

//Working
app.get('/api/creature/:creatureID/damage_modification', (req, res) => {
    SqlService.GetCreatureDamageModifications(req.params.creatureID, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/damage_modification/:damageModificationId', (req, res) => {
    SqlService.DeleteCreatureDamageModification(req.params.damageModificationId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")        
    })
})

//Working
app.get('/api/modification_type', (req, res) => {
    SqlService.GetModificationTypes((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/modification_type/:type_id', (req, res) => {
    SqlService.GetModificationType(req.params.type_id, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/ability', (req, res) => {
    SqlService.GetAbilities((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/ability/:abilityId', (req, res) => {
    SqlService.GetAbility(req.params.abilityId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/class/name', (req, res) => {
    SqlService.GetClassNames((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/background', (req, res) => {
    SqlService.GetBackgrounds((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/race', (req, res) => {
    SqlService.GetRaces((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId/race', (req, res) => {
    SqlService.GetCreatureRace(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")        
    })
})

//Working
app.get('/api/creature/:creatureId/background', (req, res) => {
    SqlService.GetCreatureBackground(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/magic_school', (req, res) => {
    SqlService.GetMagicSchoolNames((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })  
})

//Working
app.get('/api/magic_school/:schoolId', (req, res) => {
    SqlService.GetMagicSchool(req.params.schoolId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/spell/:spellId', (req, res) => {
    SqlService.GetSpell(req.params.spellId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId/spell', (req, res) => {
    SqlService.GetCreatureKnownSpells(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/spell/:spellId', (req, res) => {
    SqlService.DeleteCreatureKnownSpell(req.params.creatureId, req.params.spellId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/feature/:featureId', (req, res) => {
    SqlService.GetFeature(req.params.featureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.get('/api/creature/:creatureId/proficiencies', (req, res) => {
    SqlService.GetCreatureProficiencies(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

//Working
app.delete('/api/creature/:creatureId/proficiencies/:proficiencyId', (req, res) => {
    SqlService.DeleteProficiency(req.params.creatureId, req.params.proficiencyId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})
