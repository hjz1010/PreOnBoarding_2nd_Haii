-- migrate:up

CREATE VIEW center_data AS
SELECT 
c.id AS id,
c.name AS name, 
c.type AS type,
c.road_address AS road_address, 
c.lot_address AS lot_address, 
c.lat AS lat, 
c.lng AS lng,
c.found_date AS found_date, 
c.building_area AS building_area,
c.amenities AS amenities,
c.doctor_count AS doctor_count, 
c.nurse_count AS nurse_count,
c.social_worker_count AS social_worker_count, 
c.others_count AS others_count, 
c.program AS program,
oi.name AS operater_name,
oi.representative AS operater_representative, 
oi.contact AS operater_contact,
oi.consignment_date AS operating_consignment_date, 
mi.name AS management_name,
mi.contact AS management_contact, 
pi.institution_code AS provider_code, 
pi.name AS provider_name,
DATE_FORMAT(c.updated_at, '%Y-%m-%d %h:%m:%s') AS updated_at,
DATE_FORMAT(c.created_at, '%Y-%m-%d %h:%m:%s') AS created_at

FROM centers AS c 
LEFT JOIN operating_institutions AS oi ON c.operating_institution_id = oi.id
LEFT JOIN management_institutions AS mi ON c.management_institution_id = mi.id
LEFT JOIN provider_institutions AS pi ON c.provider_institution_id = pi.id

-- migrate:down

DROP VIEW center_data;