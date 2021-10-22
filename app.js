const {readFileSync} = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const port = 5000

const notFoundPage = readFileSync('./pages/notFound.html')

app.use(express.static('./public'))

app.all('*', (req,res) => {
    res.status(404).send(notFoundPage)
})

app.listen(port, ()=>{console.log(`Server is listening on port ${port}...`)})

