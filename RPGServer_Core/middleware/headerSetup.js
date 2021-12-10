const headerSetup = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next()
    }
}

module.exports = headerSetup