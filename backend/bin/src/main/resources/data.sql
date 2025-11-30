INSERT INTO todos (title, completed) VALUES
('Apprendre Spring Boot', true),
('Créer une app Angular', false),
('Déployer sur Render / Railway', false)
ON CONFLICT DO NOTHING;