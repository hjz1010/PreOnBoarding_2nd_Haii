-- migrate:up

CREATE TABLE centers(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
type VARCHAR(50),
road_address VARCHAR(200),
lot_address VARCHAR(200),
lat DECIMAL(30,10),
lng DECIMAL(30,10),
found_date VARCHAR(50),
building_area VARCHAR(50),
amenities VARCHAR(100),
doctor_count INT,
nurse_count INT,
social_worker_count INT,
others_count VARCHAR(200),
program VARCHAR(1000),
operating_institution_id INT,
management_institution_id INT,
provider_institution_id INT,
created_at DATETIME DEFAULT NOW(),
updated_at DATETIME DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (operating_institution_id) REFERENCES operating_institutions(id),        
FOREIGN KEY (management_institution_id) REFERENCES management_institutions(id),        
FOREIGN KEY (provider_institution_id) REFERENCES provider_institutions(id))

-- migrate:down

DROP TABLE centers;
