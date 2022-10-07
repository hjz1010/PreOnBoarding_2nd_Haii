-- migrate:up

CREATE TABLE users (
id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
account  VARCHAR(20) UNIQUE NOT NULL,
password VARCHAR(256) NOT NULL,
name VARCHAR(50),
phone_number VARCHAR(30),
type_id INT NOT NULL,
region_id INT,
refresh_token VARCHAR(256),
created_at DATETIME DEFAULT NOW(),
updated_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (type_id) REFERENCES user_types (id),        
FOREIGN KEY (region_id) REFERENCES provider_institutions (id)        
);

-- migrate:down

DROP TABLE users;
