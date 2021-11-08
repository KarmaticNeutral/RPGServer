const authorize = (req, res, next) => {
    if (!req.oidc.isAuthenticated()) {
        return res.status(401).send("Not Signed In")
    } else {
        next()
    }
}

module.exports = authorize