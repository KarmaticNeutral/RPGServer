const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url == '/')
    {
        res.write('Welcome to our home page.')
        res.end()
    } else if (req.url == '/about') {
        res.write('Here is a short history')
        res.end()
    } else {
        res.write(`
        <h1> Oops! </h1>
        <p> The page you are looking for doesn't exist. <a href="/"> Return Home </a></p>
        `)
        res.end()
    }
    
})

server.listen(5000)
