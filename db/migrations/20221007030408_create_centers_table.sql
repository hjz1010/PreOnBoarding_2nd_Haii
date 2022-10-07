-- migrate:up

CREATE TABLE centers(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name INT,
type INT,
road_address INT,
lot_address INT,
lat DECIMAL(30,10),
lng DECIMAL(30,10),
found_date VARCHAR(50),
building_area DECIMAL(30,10),
amenities VARCHAR(100),
doctor_count INT,
nurse_count INT,
social_worker_count INT,
others_count INT,
program VARCHAR(100),
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
