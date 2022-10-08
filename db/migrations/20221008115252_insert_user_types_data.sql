-- migrate:up

INSERT INTO user_types (name) VALUES ('대표 관리자');
INSERT INTO user_types (name) VALUES ('지역별 담당자');

-- migrate:down

SET foreign_key_checks = 0;
TRUNCATE user_types;
SET foreign_key_checks = 1;