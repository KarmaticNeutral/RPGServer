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

exports.GetCreaturePurse = (creatureId, callback) => {
    connection.query('SELECT * FROM purse WHERE creature_id = ?', [creatureId], function(error, results, fields) {
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

exports.GetCreatureAttacks = (creatureId, callback) => {
    connection.query('SELECT * FROM attack WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetAlignments = (callback) => {
    connection.query('SELECT * FROM alignment', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })    
}

exports.GetAlignment = (alignmentId, callback) => {
    connection.query('SELECT * FROM alignment WHERE alignment_id = ?', [alignmentId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureTypes = (callback) => {
    connection.query('SELECT * FROM creautre_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })  
}

exports.GetCreatureType = (creatureTypeId, callback) => {
    connection.query('SELECT * FROM creautre_type WHERE creature_type_id = ?', [creatureTypeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureSize = (creatureSizeId, callback) => {
    connection.query('SELECT * FROM creautre_size WHERE creature_size_id = ?', [creatureSizeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetDamageTypes = (callback) => {
    connection.query('SELECT * FROM damage_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetDamageType = (type_id, callback) => {
    connection.query('SELECT * FROM damage_type WHERE damage_type_id = ?', [type_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureDamageModifications = (creatureId, callback) => {
    connection.query('SELECT * FROM damage_modification WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })  
}

exports.GetModificationTypes = (callback) => {
    connection.query('SELECT * FROM modifcation_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetModificationType = (modificationTypeId, callback) => {
    connection.query('SELECT * FROM modifcation_type WHERE modification_type_id = ?', [modificationTypeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetAbilities = (callback) => {
    connection.query('SELECT * FROM ability', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetAbility = (abilityId, callback) => {
    connection.query('SELECT * FROM ability WHERE ability_id = ?', [abilityId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetClassNames = (callback) => {
    connection.query('SELECT class_name FROM class', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureClasses = (creatureId, callback) => {
    connection.query('SELECT * FROM class_info JOIN class ON class.class_id = class_info.class_id WHERE creature_id = ?',  [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetBackgrounds = (callback) => {
    connection.query('SELECT * FROM background', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    }) 
}

exports.GetCreatureBackground = (creatureId, callback) => {
    connection.query('SELECT background_id FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        connection.query('SELECT * FROM background WHERE background_id = ?', [results], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })
}

exports.GetRaces = (callback) => {
    connection.query('SELECT * FROM race', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreatureRace = (creatureId, callback) => {
    connection.query('SELECT race_id FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        connection.query('SELECT * FROM race WHERE race_id = ?', [results], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })  
}

exports.GetMagicSchoolNames = (callback) => {
    connection.query('SELECT name from magic_school', [], (req, res) => {
        if (error) throw error
        callback(results)
    })
}

exports.GetMagicSchool = (magicSchoolId, callback) => {
    connection.query('SELECT * FROM magic_school WHERE magic_school_id = ?', [magicSchoolId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetSpell = (spellId, callback) => {
    connection.query('SELECT * FROM spell WHERE spell_id = ?', [spellId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetKnownSpells = (creatureId, callback) => {
    connection.query('SELECT * FROM known_spell JOIN spell ON known_spell.spell_id = spell.spell_id WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetFeature = (featureId, callback) => {
    connection.query('SELECT * FROM feature WHERE feature_id = ?', [featureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetSourceType = (sourceTypeId, callback) => {
    connection.query('SELECT * FROM source_type WHERE source_type_id = ?', [sourceTypeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}