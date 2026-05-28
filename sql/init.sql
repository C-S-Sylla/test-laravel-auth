CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    alias VARCHAR(100),
    bio TEXT
);

-- Le mot de passe est 'neon123'
INSERT INTO users (username, password, alias, bio) 
VALUES ('admin', 'neon123', 'NetRunner_01', 'Connecté à la matrice. Prêt pour le piratage.');