const {readFileSync} = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const notFoundPage = readFileSync('./pages/notFound.html')

app.use(express.static('./public'))

app.get('/api/creature/:creatureID', (req, res) => {
    creature = {
        id : req.params.creatureID,
        name : "Test Creature",
    }
    res.json(creature)
})

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, ()=>{console.log(`Server is listening on port ${port}...`)})

