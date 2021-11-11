const { text } = require('express');

require('./buildSql')
mysql = require('mysql')

connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'rpg',
})

exports.CreateUserIfNotExists = (user, callback) => {
    if (!user)
        callback("No User Found")
    connection.query('SELECT * FROM user WHERE user.username = ?', [user.name], (error, results, fields) => {
        if (error) throw error
        if (results.length == 0)
            connection.query('INSERT INTO user (username, display_name, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, 1, NOW(), 1, NOW())', [user.name, user.nickname], (error, results, fields) => {
                if (error) throw error
                callback("Created")
            })
        else
            callback("Already Existed")
    })
}

exports.GetAllCreatures = (callback) => {
    connection.query('SELECT * FROM creature', function (error, results, fields) {
        if (error) throw error
        callback(results)
    });
}

exports.GetCreature = (creatureId, callback) => {
    connection.query('SELECT * FROM creature WHERE creatureId = ?', [creatureId], function (error, results, fields) {
        if (error) throw error
        callback(results)
    });
}

exports.GetUserCreatures = (user, callback) => {
    connection.query('SELECT * FROM user WHERE user.username = ?', [user.name], function (error, results, fields) {
        if (error) throw error
        userId = results.user_id
        connection.query('SELECT * FROM creature JOIN creature_access ON creature.creature_id = creature_access.creature_id', [], function (error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })
}

exports.GetUserId = (user, callback) => {
    connection.query('SELECT user_id FROM user Where username = ?', [user.name], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetItem = (itemId, callback) => {
    connection.query('SELECT * FROM item WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureInventory = (creatureId, callback) => {
    connection.query('SELECT * FROM inventory JOIN item ON inventory.item_id = item.item_id WHERE inventory.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureLanguage = (creatureId, callback) => {
    connection.query('SELECT * FROM known_language JOIN language ON known_language.language_id = language.language_id WHERE known_language.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetDamageTypes = async (callback) => {
    connection.query('SELECT * FROM damage_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetDamageType = async (type_id, callback) => {
    connection.query('SELECT * FROM damage_type WHERE damage_type_id = ?', [type_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}
