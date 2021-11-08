//require('./buildSql')
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
    connection.query('SELECT `userId` FROM `user` WHERE `user.username` = ?', [user.name], function (error, results, fields) {
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

exports.GetUserId = (user) => {
    connection.query('SELECT user_id FROM user Where username = ?', [user.name], function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    })
}

exports.GetItem = (itemId) => {
    connection.query('SELECT * FROM item WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    })
}

exports.GetCreatureInventory = (creatureId) => {
    connection.query('SELECT * FROM inventory JOIN item ON inventory.item_id = item.item_id WHERE inventory.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    })
}

exports.GetCreatureLanguage = (creatureId) => {
    connection.query('SELECT * FROM known_language JOIN language ON known_language.language_id = language.language_id WHERE known_language.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        return results[0].solution
    })
}
