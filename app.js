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
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

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
app.put('/api/creature/', (req, res) => {
    SqlService.UpdateCreature(req.body.creature, (results) => {
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
app.get('/api/purse/:creatureId', (req, res) => {
    SqlService.GetCreaturePurse(req.params.creatureId, (results) => {
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
app.get('/api/creature/:creatureId/languages', (req, res) => {
    SqlService.GetCreatureLanguage(req.params.creatureId, (results) => {
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
app.get('/api/creature/type', (req, res) => {
    console.log("Ran creature Type")
    SqlService.GetAllCreatureTypes((results) => {
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
app.get('/api/creature/:creatureID/damage_modification', (req, res) => {
    SqlService.GetCreatureDamageModifications(req.params.creatureID, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/modification_type', (req, res) => {
    SqlService.GetModificationTypes((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/modification_type/:type_id', (req, res) => {
    SqlService.GetModificationType(req.params.type_id, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/ability', (req, res) => {
    SqlService.GetAbilities((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/ability/:abilityId', (req, res) => {
    SqlService.GetAbility(req.params.abilityId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/class/name', (req, res) => {
    SqlService.GetClassNames((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId/class', (req, res) => {
    SqlService.GetCreatureClasses(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/background', (req, res) => {
    SqlService.GetBackgrounds((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId/background', (req, res) => {
    SqlService.GetCreatureBackground(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/magic_school', (req, res) => {
    SqlService.GetMagicSchoolNames((results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })  
})

app.get('/api/magic_school/:schoolId', (req, res) => {
    SqlService.GetMagicSchool(req.params.schoolId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/spell/:spellId', (req, res) => {
    SqlService.GetSpell(req.params.spellId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/creature/:creatureId/spell', (req, res) => {
    SqlService.GetKnownSpells(req.params.creatureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/feature/:featureId', (req, res) => {
    SqlService.GetFeature(req.params.featureId, (results) => {
        if (results)
            res.status(200).json(results)
        else
            res.status(503).send("Service Unavailable")
    })
})

app.get('/api/sourceType/:sourceTypeId', (req, res) => {
    SqlService.GetSourceType(req.params.sourceTypeId, (results) => {
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
