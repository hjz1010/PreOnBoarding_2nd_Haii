-- migrate:up

CREATE TABLE provider_institutions(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
institution_code INT,
name VARCHAR (50));

-- migrate:down

DROP TABLE provider_institutions;
