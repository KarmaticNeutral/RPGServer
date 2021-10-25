CREATE TABLE IF NOT EXISTS user (
	user_id MEDIUMINT PRIMARY KEY,
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
	proficiency_level_id SMALLINT PRIMARY KEY,
    proficiency_level VARCHAR(255),
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,    
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS race (
	race_id SMALLINT PRIMARY KEY,
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
	background_id SMALLINT PRIMARY KEY,
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
	creature_type_id SMALLINT PRIMARY KEY,
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
	creature_size_id SMALLINT PRIMARY KEY,
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
	alignment_id SMALLINT PRIMARY KEY,
	alignment_name VARCHAR(255) NOT NULL,
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL, 
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);

CREATE TABLE IF NOT EXISTS creature ( 
	creature_id MEDIUMINT auto_increment PRIMARY KEY,
    creature_name VARCHAR(255) NOT NULL, 
    race_id SMALLINT NOT NULL,
    background_id SMALLINT,
    creature_type_id SMALLINT NOT NULL,
    creature_size_id SMALLINT NOT NULL,
    armor_class SMALLINT NOT NULL,
	ac_type VARCHAR(255),
    challenge_rating SMALLINT,
    current_hitpoints MEDIUMINT NOT NULL,
    max_hitpoints MEDIUMINT NOT NULL,
    temporary_hitpoints MEDIUMINT,
    expended_hitdie VARCHAR(255),
    speed SMALLINT NOT NULL,
    climb_speed SMALLINT,
    fly_speed SMALLINT,
    swim_speed SMALLINT,
    str_score SMALLINT NOT NULL, 
    dex_score SMALLINT NOT NULL, 
    con_score SMALLINT NOT NULL, 
    wis_score SMALLINT NOT NULL, 
    int_score SMALLINT NOT NULL, 
    cha_score SMALLINT NOT NULL, 
	failed_death_saves SMALLINT,
    passed_death_saves SMALLINT,
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

CREATE TABLE IF NOT EXISTS proficiency (
	proficiency_id MEDIUMINT PRIMARY KEY,
    proficiency_skill VARCHAR(255) NOT NULL,
    proficiency_level_id SMALLINT,
    creature_id MEDIUMINT NOT NULL, 
    created_by MEDIUMINT NOT NULL,
    created_date DATE NOT NULL,
    last_updated_by MEDIUMINT NOT NULL,
    last_updated_date DATE NOT NULL,    
    FOREIGN KEY (proficiency_level_id) REFERENCES proficiency_level(proficiency_level_id),
    FOREIGN KEY (creature_id) REFERENCES creature(creature_id),
    FOREIGN KEY (created_by) REFERENCES user(user_id),
    FOREIGN KEY (last_updated_by) REFERENCES user(user_id)  
);


