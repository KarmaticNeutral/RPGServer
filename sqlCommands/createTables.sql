CREATE TABLE IF NOT EXISTS user (
	user_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS proficiency_level (
	proficiency_level_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    proficiency_level VARCHAR(255),
    multiplier FLOAT NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,    
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS race (
	race_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	race_name VARCHAR(255) NOT NULL,
    race_description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS background (
	background_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	background_name VARCHAR(255) NOT NULL,
    background_description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS creature_type (
	creature_type_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	creature_type_name VARCHAR(255) NOT NULL,
    creature_type_description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS creature_size (
	creature_size_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	creature_size_name VARCHAR(255) NOT NULL,
    creature_size_description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS alignment (
	alignment_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
	alignment_name VARCHAR(255) NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS creature ( 
	creature_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_name VARCHAR(255) NOT NULL, 
    race_id SMALLINT NOT NULL,
    background_id SMALLINT,
    creature_type_id SMALLINT NOT NULL,
    creature_size_id SMALLINT NOT NULL,
    armor_class SMALLINT NOT NULL,
	ac_type VARCHAR(255),
    challenge_rating SMALLINT,
    current_hitpoints SMALLINT NOT NULL,
    max_hitpoints SMALLINT NOT NULL,
    temporary_hitpoints SMALLINT,
    expended_hitdie VARCHAR(255),
    speed SMALLINT NOT NULL,
    climb_speed SMALLINT,
    fly_speed SMALLINT,
    swim_speed SMALLINT,
    str_score TINYINT NOT NULL, 
    dex_score TINYINT NOT NULL, 
    con_score TINYINT NOT NULL, 
    wis_score TINYINT NOT NULL, 
    int_score TINYINT NOT NULL, 
    cha_score TINYINT NOT NULL, 
	failed_death_saves TINYINT,
    passed_death_saves TINYINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (race_id) REFERENCES race(race_id),
    FOREIGN KEY (background_id) REFERENCES background(background_id),
    FOREIGN KEY (creature_type_id) REFERENCES creature_type(creature_type_id),
    FOREIGN KEY (creature_size_id) REFERENCES creature_size(creature_size_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS proficiency_type (
    proficiency_type_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    proficiency_type VARCHAR(255) NOT NULL, 
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS proficiency (
	proficiency_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    proficiency_skill VARCHAR(255) NOT NULL,
    proficiency_level_id TINYINT,
    proficiency_type_id TINYINT,
    creature_id MEDIUMINT NOT NULL, 
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,    
    FOREIGN KEY (proficiency_level_id) REFERENCES proficiency_level(proficiency_level_id),
    FOREIGN KEY (proficiency_type_id) REFERENCES proficiency_type(proficiency_type_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS creature_access (
	creature_access_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT NOT NULL,
    user_id MEDIUMINT NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,    
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS ability (
	ability_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(31) NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS damage_type (
	damage_type_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS modification_type (
	modification_type_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(31) NOT NULL,
    multiplier FLOAT NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS damage_modification (
	damage_modification_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT,
    damage_type_id TINYINT,
    modification_type_id TINYINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (damage_type_id) REFERENCES damage_type(damage_type_id),
    FOREIGN KEY (modification_type_id) REFERENCES modification_type(modification_type_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS attack (
	attack_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT,
    attack_range VARCHAR(255) NOT NULL,
    bonus TINYINT NOT NULL,
    damage_die TINYINT NOT NULL,
    damage_die_count TINYINT NOT NULL,
    damage_type_id TINYINT NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (damage_type_id) REFERENCES damage_type(damage_type_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS language (
	language_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS known_language (
	known_language_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    language_id SMALLINT,
    creature_id MEDIUMINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (language_id) REFERENCES language(language_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS purse (
	purse_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT,
    platinum_count SMALLINT,
    gold_count SMALLINT,
    electrum_count SMALLINT,
    silver_count SMALLINT,
    copper_count SMALLINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS item (
	item_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    item_data TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS inventory (
	inventory_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT,
    item_id MEDIUMINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS magic_school (
	magic_school_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)    
);

CREATE TABLE IF NOT EXISTS spell (
	spell_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level TINYINT,
    school_id TINYINT,
    casting_time VARCHAR(255),
    casting_range VARCHAR(255),
    duration VARCHAR(255),
    target VARCHAR(255),
    verbal BOOLEAN,
    somatic BOOLEAN,
    material VARCHAR(255),
    at_higher_levels VARCHAR(255),
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (school_id) REFERENCES magic_school(magic_school_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);

CREATE TABLE IF NOT EXISTS source_type (
    source_type_id TINYINT AUTO_INCREMENT PRIMARY KEY,
    source_name VARCHAR(255) NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);

CREATE TABLE IF NOT EXISTS known_spell (
    known_spell_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    spell_id SMALLINT NOT NULL,
    creature_id MEDIUMINT NOT NULL,
    source_type_id TINYINT NOT NULL,
    source_id SMALLINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (spell_id) REFERENCES spell(spell_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (source_type_id) REFERENCES source_type(source_type_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);

CREATE TABLE IF NOT EXISTS feature (
    feature_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    feature_description VARCHAR(4095),
    feature_name VARCHAR(255) NOT NULL,
    source_type_id TINYINT NOT NULL,
    source_id SMALLINT,
    requirements VARCHAR(255),
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);

CREATE TABLE IF NOT EXISTS class (
    class_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255) NOT NULL,
    description TEXT,
    hitdie TINYINT NOT NULL,
    spellcasting_ability_id TINYINT,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (spellcasting_ability_id) REFERENCES ability(ability_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);

CREATE TABLE IF NOT EXISTS class_info (
    class_info_id MEDIUMINT AUTO_INCREMENT PRIMARY KEY,
    creature_id MEDIUMINT NOT NULL,
    class_id SMALLINT NOT NULL,
    levels TINYINT NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (class_id) REFERENCES class(class_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id) 
);