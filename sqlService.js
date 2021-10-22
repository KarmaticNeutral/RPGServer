mysql = require('mysql')
connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'rpg',
})

exports.GetAllCreatures = () => {
    connection.query('SELECT * FROM creature', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    });
}

exports.GetCreature = (creatureId) => {
    connection.query('SELECT * FROM `creature` WHERE `creatureId` = ?', [creatureId], function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    });
}

exports.GetUserCreatures = (user) => {
    connection.query('SELECT `userId` FROM `user` WHERE `user.username` = ?', [user.name], function (error, result, fileds) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        userId = results[0].solution
    })
    connection.query('SELECT * FROM `creature` JOIN `creature_access` ON `creature.creatureId` = `creature_access.creatureId` WHERE `userId` = ?', [userId], function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    });
}