INSERT INTO rpg.creature (
    creature_name,
    race_id,
    background_id,
    creature_type_id,
    creature_size_id,
    armor_class,
	ac_type,
    challenge_rating,
    current_hitpoints,
    max_hitpoints,
    temporary_hitpoints,
    expended_hitdie,
    speed,
    climb_speed,
    fly_speed,
    swim_speed,
    str_score, 
    dex_score, 
    con_score, 
    wis_score, 
    int_score, 
    cha_score, 
	failed_death_saves,
    passed_death_saves,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES (
	"Dungeon Master",
    1,
    1,
    1,
    1,
    30,
    "Auramatic",
    90,
    1500,
    1500,
    0,
    "",
    300,
    300,
    300,
    300,
    20,
    20,
    20,
    20,
    20,
    20,
    0,
    0,
    1,
    NOW(),
    1,
    NOW()
);

INSERT INTO rpg.creature_access (
    creature_id,
    user_id,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES (
	1,
    1,
    1,
    NOW(),
    1,
    NOW()
);

INSERT INTO class_info (
    creature_id,
    class_id,
    levels,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES (
    (SELECT creature_id FROM creature WHERE creature_name = "Dungeon Master" LIMIT 1),
    1,
    1,
    1,
    NOW(),
    1,
    NOW()
);

INSERT INTO inventory (
    creature_id,
    item_id,
    quantity,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES 
    ( 1, 1, 1, 1, NOW(), 1, NOW() ),
    ( 1, 2, 1, 1, NOW(), 1, NOW() ),
    ( 1, 3, 10, 1, NOW(), 1, NOW() );

INSERT INTO known_language (
    language_id,
    creature_id,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES
    ( 1, 1, 1, NOW(), 1, NOW() ),
    ( 2, 1, 1, NOW(), 1, NOW() ),
    ( 3, 1, 1, NOW(), 1, NOW() ),
    ( 4, 1, 1, NOW(), 1, NOW() ),
    ( 5, 1, 1, NOW(), 1, NOW() ),
    ( 6, 1, 1, NOW(), 1, NOW() );

INSERT INTO attack (
    attack_name,
    creature_id,
    attack_range,
    bonus,
    damage_die,
    damage_die_count,
    damage_bonus,
    damage_type_id,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES
    ( "Slap", 1, "10 Feet", 14, 10, 2, 10, 1, 1, NOW(), 1, NOW()),
    ( "Punch", 1, "5 Feet", 16, 12, 1, 14, 1, 1, NOW(), 1, NOW());


INSERT INTO damage_modification (
    creature_id,
    damage_type_id,
    modification_type_id,
    created_by,
    created_date,
    last_updated_by,
    last_updated_date
) VALUES 
    (1, 1, 1, 1, NOW(), 1, NOW());