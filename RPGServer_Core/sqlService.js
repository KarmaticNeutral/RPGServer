const { NullOrUndefined } = require('./util/tools')

require('./buildSql')
mysql = require('mysql')

connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'rpg',
})

//Implemented
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

//Implemented
exports.GetAllCreatures = (callback) => {
    connection.query('SELECT * FROM creature', function (error, results, fields) {
        if (error) throw error
        callback(results)
    });
}

//Implemented
exports.GetCreature = (creatureId, callback) => {
    connection.query('SELECT * FROM creature WHERE creature_id = ?', [creatureId], function (error, results, fields) {
        if (error) throw error
        callback(results)
    });
}

//TODO
exports.UpsertCreature = (creature, userId, callback) => {
    if (creature.creature_id == -1) {
        connection.query('INSERT INTO creature (creature_name, race_id, background_id, creature_type_id, creature_size_id, armor_class, ac_type, challenge_rating, current_hitpoints, max_hitpoints, temporary_hitpoints, expended_hitdie, speed, climb_speed, fly_speed, swim_speed, str_score, dex_score, con_score, wis_score, int_score, cha_score, failed_death_saves, passed_death_saves, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                        [creature.creature_name, creature.race_id, creature.background_id, creature.creature_type_id, creature.creature_size_id, creature.armor_class, creature.ac_type, creature.challenge_rating, creature.current_hitpoints, creature.max_hitpoints, creature.temporary_hitpoints, creature.expended_hitdie, creature.speed, creature.climb_speed, creature.fly_speed, creature.swim_speed, creature.str_score, creature.dex_score, creature.con_score, creature.wis_score, creature.int_score, creature.cha_score, creature.failed_death_saves, creature.passed_death_saves, userId, userId], function(error, results, fields) {
            if (error) throw error
            connection.query('INSERT INTO creature_access (creature_id, user_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', 
                            [creature.creature_id, userId, userId, userId], function(error, results2, fields) {
                if (error) throw error
                callback(results, results2)
            })
            callback(results)
        })
    } else {
        connection.query('UPDATE creature SET creature_name = ?, race_id = ?, background_id = ?, creature_type_id = ?, creature_size_id = ?, armor_class = ?, ac_type = ?, challenge_rating = ?, current_hitpoints = ?, max_hitpoints = ?, temporary_hitpoints = ?, expended_hitdie = ?, speed = ?, climb_speed = ?, fly_speed = ?, swim_speed = ?, str_score = ?, dex_score = ?, con_score = ?, wis_score = ?, int_score = ?, cha_score = ?, failed_death_saves = ?, passed_death_saves = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', 
                        [creature.creature_name, creature.race_id, creature.background_id, creature.creature_type_id, creature.creature_size_id, creature.armor_class, creature.ac_type, creature.challenge_rating, creature.current_hitpoints, creature.max_hitpoints, creature.temporary_hitpoints, creature.expended_hitdie, creature.speed, creature.climb_speed, creature.fly_speed, creature.swim_speed, creature.str_score, creature.dex_score, creature.con_score, creature.wis_score, creature.int_score, creature.cha_score, creature.failed_death_saves, creature.passed_death_saves, userId, creature.creature_id], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    }
}

//Implemented
exports.DeleteCreature = (creatureId, callback) => {
    connection.query('DELETE FROM proficiency WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        connection.query('DELETE FROM creature_access WHERE creature_id = ?', [creatureId], function(error, results, fields) {
            if (error) throw error
            connection.query('DELETE FROM damage_modification WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                if (error) throw error
                connection.query('DELETE FROM attack WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                    if (error) throw error
                    connection.query('DELETE FROM known_language WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                        if (error) throw error
                        connection.query('DELETE FROM purse WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                            if (error) throw error
                            connection.query('DELETE FROM inventory WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                                if (error) throw error
                                connection.query('DELETE FROM known_spell WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                                    if (error) throw error
                                    connection.query('DELETE FROM class_info WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                                        if (error) throw error
                                        connection.query('DELETE FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
                                            if (error) throw error/
                                            callback(results)
                                        })
                                    })
                                })
                            })
                        })
                    })
                })                
            })
        })
    })
}

//Implemented
exports.GetUserCreatures = (user, callback) => {
    connection.query('SELECT * FROM user WHERE user.username = ?', [user.name], function (error, results, fields) {
        if (error) throw error
        if (results.length > 0) {
            userId = results[0].user_id
            connection.query('SELECT * FROM creature JOIN creature_access ON creature.creature_id = creature_access.creature_id WHERE creature_access.user_id = ?', [userId], function (error, results, fields) {
                if (error) throw error
                callback(results)
            })
        }
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

//Implemented
exports.GetItem = (itemId, callback) => {
    connection.query('SELECT * FROM item WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.UpsertItem = (item, userId, callback) => {
    if (item.item_id == -1) {
        connection.query('INSERT INTO item (name, description, item_data, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, NOW(), ?, NOW())', [item.name, item.description, item.item_data, userId, userId], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    } else {
        connection.query('UPDATE item SET name = ?, description = ?, item_data = ?, last_updated_by = ?, last_updated_date = NOW() WHERE item_id = ?', [item.name, item.description, item.item_data, userId, item.item_id], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    }
}

//Implemented
exports.DeleteItem = (itemId, callback) => {
    connection.query('DELETE FROM inventory WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error
        connection.query('DELETE FROM item WHERE item_id = ?', [itemId], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })
}

//Implemented
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

//TODO
exports.UpsertPurse = (purse, userId, callback) => {
    if (purse.purse_id == -1) {
        connection.query('INSERT INTO purse (creature_id platinum_count, gold_count, electrum_count, silver_count, copper_count, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, NOW())', [purse.creature_id, purse.platinum_count, purse.gold_count, purse.electrum_count, purse.silver_count, purse.copper_count, userId, userId], function(error, results, fields) {
            if (error) throw errror
            callback(results)
        })
    } else {
        connection.query('UPDATE purse SET platinum_count = ?, gold_count = ?, electrum_count = ?, silver_count = ?, copper_count = ?, last_updated_by = ?, last_updated_date = NOW() WHERE purse_id = ?', [purse.platinum_count, purse.gold_count, purse.electrum_count, purse.silver_count, purse.copper_count, userId, purse.purse_id], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    }
}

//Implemented
exports.DeleteCreaturePurse = (purseId, callback) => {
    connection.query('DELETE FROM purse WHERE purse_id = ?', [purseId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureInventory = (creatureId, callback) => {
    connection.query('SELECT * FROM inventory JOIN item ON inventory.item_id = item.item_id WHERE inventory.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.AddItemToInventory = (itemId, creatureId, userId, callback) => {
    connection.query('INSERT INTO inventory (item_id, creature_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', [itemId, creatureId, userId, userId], function(error, results, fields,) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteItemFromInvetory = (itemId, creatureId, callback) => {
    connection.query('DELETE FROM inventory WHERE item_id = ? AND creature_id = ?', [itemId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteCreatureInventory = (creatureId, callback) => {
    connection.query('DELETE FROM inventory WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteItemFromAllInventories = (itemId, callback) => {
    connection.query('DELETE FROM inventory WHERE item_id = ?', [itemId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureLanguages = (creatureId, callback) => {
    connection.query('SELECT * FROM known_language JOIN language ON known_language.language_id = language.language_id WHERE known_language.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.CreateCreatureLanguage = (creatureId, languageId, userId, callback) => {
    connection.query('INSERT INTO known_language (creature_id, language_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW()', [creatureId, languageId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteCreatureLanguage = (creatureId, languageId, callback) => {
    connection.query('DELETE FROM known_language WHERE creature_id = ? AND language_id = ?', [creatureId, languageId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureAttacks = (creatureId, callback) => {
    connection.query('SELECT * FROM attack WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.UpsertAttack = (attack, userId, callback) => {
    if (attack.attack_id == -1) {
        connection.query('INSERT INTO attack (attack_name, creature_id, attack_range, bonus, damage_die, damage_die_count, damage_bonus, damage_type_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())', 
                        [attack.attack_name, attack.creature_id, attack.attack_range, attack.bonus, attack.damage_die, attack.damage_die_count, attack.damage_bonus, attack.damage_type_id, attack.created_by, attack.created_date, userId], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    } else {
        connection.query('UPDATE attack SET attack.attack_name = ?, attack_range = ?, bonus = ?, damage_die = ?, damage_die_count = ?, damage_bonus = ?, damage_type_id = ?, last_updated_by = ?, last_updated_date = NOW() WHERE attack_id = ?', 
                        [attack.attack_name, attack.attack_range, attack.bonus, attack.damage_die, attack.damage_die_count, attack.damage_bonus, attack.damage_type_id, userId, attack.attack_id], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    }
}

//Implemented
exports.DeleteAttack = (attackId, callback) => {
    connection.query('DELETE FROM attack WHERE attack_id = ?', [attackId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetAlignments = (callback) => {
    connection.query('SELECT * FROM alignment', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })    
}

//Implemented
exports.GetAlignment = (alignmentId, callback) => {
    connection.query('SELECT * FROM alignment WHERE alignment_id = ?', [alignmentId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetAllCreatureTypes = (callback) => {
    connection.query('SELECT * FROM creature_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })  
}

//Implemented
exports.GetCreatureType = (creatureTypeId, callback) => {
    connection.query('SELECT * FROM creature_type WHERE creature_type_id = ?', [creatureTypeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureSizes = (callback) => {
    connection.query('SELECT * FROM creature_size', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureSize = (creatureSizeId, callback) => {
    connection.query('SELECT * FROM creature_size WHERE creature_size_id = ?', [creatureSizeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetDamageTypes = (callback) => {
    connection.query('SELECT * FROM damage_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetDamageType = (type_id, callback) => {
    connection.query('SELECT * FROM damage_type WHERE damage_type_id = ?', [type_id], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureDamageModifications = (creatureId, callback) => {
    connection.query('SELECT * FROM damage_modification WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })  
}

//TODO
exports.CreateCreatureDamageModification = (creatureId, damageTypeId, modificationTypeId, userId, callback) => {
    connection.query('INSERT INTO damage_modification (creature_id, damage_type_id, modification_type_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, NOW(), ?, NOW()', [creatureId, damageTypeId, modificationTypeId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteCreatureDamageModification = (damageModificationId, callback) => {
    connection.query('DELETE FROM damage_modification WHERE damage_modification_id = ?', [damageModificationId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetModificationTypes = (callback) => {
    connection.query('SELECT * FROM modification_type', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetModificationType = (modificationTypeId, callback) => {
    connection.query('SELECT * FROM modification_type WHERE modification_type_id = ?', [modificationTypeId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetAbilities = (callback) => {
    connection.query('SELECT * FROM ability', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetAbility = (abilityId, callback) => {
    connection.query('SELECT * FROM ability WHERE ability_id = ?', [abilityId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetClassNames = (callback) => {
    connection.query('SELECT class_name FROM class', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureClasses = (creatureId, callback) => {
    connection.query('SELECT * FROM class_info JOIN class ON class.class_id = class_info.class_id WHERE creature_id = ?',  [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.PutLevelsInCreatureClass = (creatureId, classId, levels, user, callback) => {
    if (NullOrUndefined(user)) {
        callback("User ID Unknown");
    } else {
        connection.query('SELECT user_id FROM user WHERE username = ?', [user.name], function(error, results, fields) {
            if (error) throw error
            if (results.length == 0) {
                callback("User ID Unknown")
            } else {
                userId = results[0]
                connection.query('SELECT * FROM class_info WHERE class_id = ? AND creature_id = ?', [classId, creatureId], function(error, results, fields) {
                    if (error) throw error
                    if (results.length == 0) {
                        connection.query('INSERT INTO class_info (creature_id, class_id, levels, created_by, created_date, last_update_by, last_updated_date) VALUES (?, ?, ?, ?, NOW(), ?, NOW())', [creatureId, classId, levels, userId, userId], function(error, results, fields) {
                            if (error) throw error
                            callback(results)
                        })
                    } else {
                        connection.query('UPDATE class_info SET levels = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ? AND class_id = ?', 
                                        [results[0].levels + levels, userId, creatureId, classId], function(error, results, fields) {
                            if(error) throw error
                            callback(results)
                        })
                    }
                })
            }
        })
    }
}

//Implemented
exports.GetBackgrounds = (callback) => {
    connection.query('SELECT * FROM background', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    }) 
}

//Implemented
exports.GetCreatureBackground = (creatureId, callback) => {
    connection.query('SELECT background.background_id, background.background_name, background.background_description, background.created_by, background.created_date, background.last_updated_by, background.last_updated_date FROM background JOIN creature ON creature.background_id = background.background_id WHERE creature.creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.UpdateCreatureBackground = (creatureId, backgroundId, userId, callback) => {
    connection.query('UPDATE creature SET background_id = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', [backgroundId, userId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetRaces = (callback) => {
    connection.query('SELECT * FROM race', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureRace = (creatureId, callback) => {
    connection.query('SELECT race_id FROM creature WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        connection.query('SELECT * FROM race WHERE race_id = ?', [results], function(error, results, fields) {
            if (error) throw error
            callback(results)
        })
    })  
}

//TODO
exports.UpdateCreatureRace = (creatureId, raceId, userId, callback) => {
    connection.query('UPDATE creature SET race_id = ?, last_updated_by = ?, last_updated_date = NOW() WHERE creature_id = ?', [raceId, userId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetMagicSchoolNames = (callback) => {
    connection.query('SELECT name FROM magic_school', [], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetMagicSchool = (magicSchoolId, callback) => {
    connection.query('SELECT * FROM magic_school WHERE magic_school_id = ?', [magicSchoolId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetSpell = (spellId, callback) => {
    connection.query('SELECT * FROM spell WHERE spell_id = ?', [spellId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureKnownSpells = (creatureId, callback) => {
    connection.query('SELECT * FROM known_spell JOIN spell ON known_spell.spell_id = spell.spell_id WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//TODO
exports.CreateCreatureKnownSpell = (creatureId, spellId, userId, callback) => {
    connection.query('INSERT INTO known_spell (spell_id, creature_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, NOW(), ?, NOW())', [spellId, creatureId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteCreatureKnownSpell = (creatureId, spellId, callback) => {
    connection.query('DELETE FROM known_spell WHERE creature_id = ? AND spell_id = ?', [creatureId, spellId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetFeature = (featureId, callback) => {
    connection.query('SELECT * FROM feature WHERE feature_id = ?', [featureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.GetCreatureProficiencies = (creatureId, callback) => {
    connection.query('SELECT * FROM proficiency WHERE creature_id = ?', [creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
} 

//TODO
exports.CreateCreatureProficiency = (proficiency, userId, callback) => {
    connection.query('INSERT INTO proficiency (proficiency_skill, proficiency_level_id, proficiency_type_id, creature_id, created_by, created_date, last_updated_by, last_updated_date) VALUES (?, ?, ?, ?, ?, NOW(), ?, NOW())', 
                    [proficiency.proficiency_skill, proficiency.proficiency_level_id, proficiency.proficiency_type_id, creatureId, userId, userId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}

//Implemented
exports.DeleteProficiency = (creatureId, proficiencyId, callback) => {
    connection.query('DELETE FROM proficiency WHERE proficiency_id = ? AND creature_id = ?', [proficiencyId, creatureId], function(error, results, fields) {
        if (error) throw error
        callback(results)
    })
}
