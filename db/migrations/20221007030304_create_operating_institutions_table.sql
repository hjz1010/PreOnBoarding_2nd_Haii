-- migrate:up

CREATE TABLE operating_institutions(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (50),
representative VARCHAR (50),
contact VARCHAR (30),
consignment_date VARCHAR(50));

-- migrate:down

DROP TABLE operating_institutions;
