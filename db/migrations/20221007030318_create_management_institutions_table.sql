-- migrate:up

CREATE TABLE management_institutions(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (50),
contact VARCHAR (30));

-- migrate:down

DROP TABLE management_institutions;
