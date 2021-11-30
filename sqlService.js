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
    connection.query('SELECT * FROM creature WHERE creature_id = ?', [creatureId], function (error, results, fields) {
        if (error) throw error
        callback(results)
    });
}

exports.UpdateCreature = (creature, userId, callback) => {
    connection.query('UPDATE creature SET creature_name = ?, race_id = ?, background_id = ?, creature_type_id = ?, creature_size_id = ?, armor_class = ?, ac_type = ?, challenge_rating = ?, current_hitpoints = ?, max_hitpoints = ?, temporary_hitpoints = ?, expended_hitdie = ?, speed = ?, climb_speed = ?, fly_speed = ?, swim_speed = ?, str_score = ?, dex_score = ?, con_score = ?, wis_score = ?, int_score = ?, cha_score = ?, failed_death_saves = ?, passed_death_saves = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', 
    [creature.creature_name, creature.race_id, creature.background_id, creature.creature_type_id, creature.creature_size_id, creature.armor_class, creature.ac_type, creature.challenge_rating, creature.current_hitpoints, creature.max_hitpoints, creature.temporary_hitpoints, creature.expended_hitdie, creature.speed, creature.climb_speed, creature.fly_speed, creature.swim_speed, creature.str_score, creature.dex_score, creature.con_score, creature.wis_score, creature.int_score, creature.cha_score, creature.failed_death_saves, creature.passed_death_saves, userId, creature.creature_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.CreateCreature = (creature, userId, callback) => {
    connection.query('INSERT INTO creature (creature_name, race_id, background_id, creature_type_id, creature_size_id, armor_class, ac_type, challenge_rating, current_hitpoints, max_hitpoints, temporary_hitpoints, expended_hitdie, speed, climb_speed, fly_speed, swim_speed, str_score, dex_score, con_score, wis_score, int_score, cha_score, failed_death_saves, passed_death_saves, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [creature.creature_name, creature.race_id, creature.background_id, creature.creature_type_id, creature.creature_size_id, creature.armor_class, creature.ac_type, creature.challenge_rating, creature.current_hitpoints, creature.max_hitpoints, creature.temporary_hitpoints, creature.expended_hitdie, creature.speed, creature.climb_speed, creature.fly_speed, creature.swim_speed, creature.str_score, creature.dex_score, creature.con_score, creature.wis_score, creature.int_score, creature.cha_score, creature.failed_death_saves, creature.passed_death_saves, userId, userId], function(error, results, fields) {
        if (error) throw error
        connection.query('INSERT INTO creature_access (creature_id, user_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', [creature.creature_id, userId, userId, userId], function(error, results2, fields) {
            if (error) throw error
            callback(results, results2)
        })
        callback(results)
    })
}

exports.DeleteCreature = (creatureId, callback) => {
    connection.query('DELETE FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
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

exports.CreateCreatureAccess = (userId, creatureId, callback) => {
    connection.query('INSERT INTO creature_access (creature_id, user_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', [userId, creatureId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteCreatureAccess = (creatureId, userId, callback) => {
    connection.query("DELETE FROM creature_access WHERE creatureId = ?, userId = ?", [creatureId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
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

exports.CreateItem = (item, userId, callback) => {
    connection.query('INSERT INTO item (name, description, item_data, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, NOW(), ?, NOW())', [item.name, item.description, item.item_data, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.UpdateItem = (item, userId, callback) => {
    connection.query('UPDATE item SET name = ?, description = ?, item_data = ?, last_updated_by = ?, last_updated_date = NOW() WHERE item_id = ?', [item.name, item.description, item.item_data, userId, item.item_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteItem = (itemId, callback) => {
    connection.query('DELETE FROM item WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.GetCreaturePurse = (creatureId, callback) => {
    connection.query('SELECT * FROM purse WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        if (results.length == 0) {
            connection.query('INSERT INTO purse (creature_id, platinum_count, gold_count, electrum_count, silver_count, copper_count, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, 0, 0, 0, 0, 0, 1, NOW(), 1, NOW())', [creatureId], function(error, results, fields) {
                if (error) throw error
                connection.query('SELECT * FROM purse WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                    callback(results)
                })
            })
        } else {
            callback(results)
        }
    })
}

exports.UpdatePurse = (purse, userId, callback) => {
    connection.query('UPDATE purse SET platinum_count = ?, gold_count = ?, electrum_count = ?, silver_count = ?, copper_count = ?, last_updated_by = ?, last_updated_date = NOW() WHERE purse_id = ?', [purse.platinum_count, purse.gold_count, purse.electrum_count, purse.silver_count, purse.copper_count, userId, purse.purse_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.CreatePurse = (purse, userId, callback) => {
    connection.query('INSERT INTO purse (creature_id platinum_count, gold_count, electrum_count, silver_count, copper_count, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, NOW())', [purse.creature_id, purse.platinum_count, purse.gold_count, purse.electrum_count, purse.silver_count, purse.copper_count, userId, userId], function(error, results, fields) {
        if (error) throw errror
        callback(results)
    })
}

exports.DeletePurse = (purseId, callback) => {
    connection.query('DELETE FROM purse WHERE purse_id = ?', [purseId], function(error, results, fields) {
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

exports.CreateInventory = (itemId, creatureId, userId, callback) => {
    connection.query('INSERT INTO inventory (item_id, creature_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', [itemId, creatureId, userId, userId], function(error, results, fields,) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteInventoryItem = (itemId, creatureId, callback) => {
    connection.query('DELETE FROM inventory WHERE item_id = ? AND creature_id = ?', [itemId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteCreatureInventory = (creatureId, callback) => {
    connection.query('DELETE FROM inventory WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteItemFromInventory = (itemId, callback) => {
    connection.query('DELETE FROM inventory WHERE item_id = ?', [itemId], function(error, results, fields) {
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

exports.CreateCreatureLanguage = (creatureId, languageId, userId, callback) => {
    connection.query('INSERT INTO known_language (creature_id, language_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW()', [creatureId, languageId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteCreatureLanguage = (creatureId, languageId, callback) => {
    connection.query('DELETE FROM known_language WHERE creature_id = ? AND language_id = ?', [creatureId, languageId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
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

exports.CreateCreatureDamageModification = (creatureId, damageTypeId, modificationTypeId, userId, callback) => {
    connection.query('INSERT INTO damage_modification (creature_id, damage_type_id, modification_type_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, NOW(), ?, NOW()', [creatureId, damageTypeId, modificationTypeId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.DeleteCreatureDamageModification = (damageModificationId, callback) => {
    connection.query('DELETE FROM damage_modification WHERE damage_modification_id = ?', [damageModificationId], function(error, results, fields) {
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

exports.PutLevelsInCreatureClass = (creatureId, classId, levels, userId, callback) => {
    connection.query('SELECT * FROM class_info WHERE class_id = ? AND creature_id = ?', [classId, creatureId], function(error, results, fields) {
        if (error) throw error
        //TODO detect if there is already a row, if there is update it.
        // if not create a new row
    })
}

exports.GetBackgrounds = (callback) => {
    connection.query('SELECT * FROM background', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    }) 
}

//TODO make this better with a JOIN
exports.GetCreatureBackground = (creatureId, callback) => {
    connection.query('SELECT background_id FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        connection.query('SELECT * FROM background WHERE background_id = ?', [results], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })
}

exports.UpdateCreatureBackground = (creatureId, backgroundId, userId, callback) => {
    connection.query('UPDATE creature SET background_id = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', [backgroundId, userId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
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

exports.UpdateCreatureRace = (creatureId, raceId, userId, callback) => {
    connection.query('UPDATE creature SET race_id = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', [raceId, userId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
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

exports.GetCreatureKnownSpells = (creatureId, callback) => {
    connection.query('SELECT * FROM known_spell JOIN spell ON known_spell.spell_id = spell.spell_id WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

exports.CreateCreatureKnownSpell = (creatureId, spellId, sourceTypeId, sourceId, userId, callback) => {
    connection.query('INSERT INTO known_spell (spell_id, creature_id, source_type_id, source_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, NOW(), ?, NOW())', [spellId, creatureId, sourceTypeId, sourceId, userId, userId], function(error, results, fields) {
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