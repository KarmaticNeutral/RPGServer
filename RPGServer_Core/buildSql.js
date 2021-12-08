fs = require('fs')
mysql = require('mysql')

connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password'
})

rpg = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'rpg',
    multipleStatements: true
})

async function runQueryFromFile(path, conn) {
    return new Promise(resolve => {
        fs.readFile(path, 'utf-8', (err, res) => {
            if (err) throw err
            standardQuery(conn, res).then((res) => {
                resolve(res)
            })
        })   
    })
}

async function standardQuery(conn, query) {
    return new Promise(resolve => {
        //console.log("Running: " + query)
        setTimeout(() => {
            resolve('Timed Out During Query')
        }, 30000)
        conn.query(query, function(err, results) {
            if (err) throw err
            //console.log("Succesful Query: ", query)
            //console.log("Results of Query", results)
            resolve(results)
        })
    })
}

async function build() {
    connection.connect((err) => {if (err) throw err})
    await runQueryFromFile('./sqlCommands/createDatabase.sql', connection)
    .catch((err) => {
        throw err
    })
    .then((res) => {
        //console.log("Build Res: ", res)
    })

    rpg.connect((err) => {if (err) throw err})
    await runQueryFromFile('./sqlCommands/createTables.sql', rpg)
    .catch((err) => {
        throw err
    })
    .then((res) => {
        //console.log("Build Res: ", res)
    })
    
    await runQueryFromFile('./sqlCommands/populateLookups.sql', rpg)
    .catch((err) => {
        throw err
    })
    .then((res) => {
        //console.log("Build Res: ", res)
    })

    await runQueryFromFile('./sqlCommands/createDMCreature.sql', rpg)
    .catch((err) => {
        throw err
    })
    .then((res) => {
        //console.log("Build Res: ", res)
        console.log("Build Complete")
    })
}

build()
