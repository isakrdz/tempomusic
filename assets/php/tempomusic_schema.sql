-- Base de datos para el proyecto Tempo_Final
-- Importar este archivo en phpMyAdmin o usar mysql CLI

CREATE DATABASE IF NOT EXISTS `tempomusic` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tempomusic`;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `profile_img` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de artistas
CREATE TABLE IF NOT EXISTS `artistas` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `bio` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla principal de música (canciones / álbumes)
CREATE TABLE IF NOT EXISTS `music` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` ENUM('cancion','album','single','ep') NOT NULL DEFAULT 'cancion',
  `title` VARCHAR(255) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `cover` VARCHAR(255) DEFAULT NULL,
  `file` VARCHAR(255) DEFAULT NULL,
  `artista_id` INT UNSIGNED DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_artista_id` (`artista_id`),
  CONSTRAINT `fk_music_artista` FOREIGN KEY (`artista_id`) REFERENCES `artistas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo (opcional)
INSERT INTO `usuarios` (`name`, `email`, `password`) VALUES
  ('Usuario Ejemplo', 'test@example.com', 'test123');

INSERT INTO `artistas` (`nombre`, `bio`) VALUES
  ('twenty one pilots', 'Band from Columbus'),
  ('Arctic Monkeys', 'Indie rock band from Sheffield');

INSERT INTO `music` (`type`, `title`, `artist`, `date`, `cover`, `file`, `artista_id`) VALUES
  ('album', 'Trench', 'twenty one pilots', '2018-10-05', 'resources/trench.jpg', NULL, (SELECT id FROM artistas WHERE nombre = 'twenty one pilots')),
  ('album', 'Favourite Worst Nightmare', 'Arctic Monkeys', '2007-04-09', 'resources/fwn.jpeg', NULL, (SELECT id FROM artistas WHERE nombre = 'Arctic Monkeys'));

-- Nota: el proyecto actual almacena contraseñas en texto plano en los scripts PHP.
-- Es altamente recomendable modificar `register`/`login` para usar `password_hash` y `password_verify`.
 
