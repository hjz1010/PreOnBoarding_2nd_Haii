-- migrate:up

CREATE VIEW user_data AS
SELECT 
u.id AS id, 
u.account AS account,  
u.name AS name, 
u.phone_number AS contact, 
ut.name AS type, 
pi.name AS region,
pi.institution_code AS region_code,
DATE_FORMAT(u.updated_at, '%Y-%m-%d %h:%m:%s') AS updated_at,
DATE_FORMAT(u.created_at, '%Y-%m-%d %h:%m:%s') AS created_at
FROM users AS u 
LEFT JOIN user_types AS ut ON u.type_id = ut.id
LEFT JOIN provider_institutions AS pi ON u.region_id = pi.id

-- migrate:down

DROP VIEW user_data;
