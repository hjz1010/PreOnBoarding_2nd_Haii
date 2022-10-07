-- migrate:up

CREATE TABLE user_types(
id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50));

-- migrate:down

DROP TABLE user_types;
