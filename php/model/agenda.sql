-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 31-10-2019 a las 15:12:19
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `agenda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devoirs`
--

DROP TABLE IF EXISTS `devoirs`;
CREATE TABLE IF NOT EXISTS `devoirs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `devoir` varchar(160) NOT NULL,
  `dateDevoir` date NOT NULL,
  `description` text NOT NULL,
  `matiere` varchar(160) NOT NULL,
  `fait` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `devoirs`
--

INSERT INTO `devoirs` (`id`, `devoir`, `dateDevoir`, `description`, `matiere`, `fait`) VALUES
(42, 'exo 7', '2019-10-24', 'dessiner la carte de la France', 'Geographie', 1),
(34, 'exo1', '2019-10-11', 'conjugaisons', 'français', 0),
(37, 'exo 2', '2019-10-18', 'dicté', 'français', 1),
(38, 'exo 3', '2019-10-23', 'réviser chapitre 3', 'histoire', 0),
(39, 'exo 4', '2019-10-29', 'exercices de chimique', 'sciences', 0),
(40, 'exo 5', '2019-10-24', 'apprendre à reciter sa poésie', 'français', 1),
(41, 'exo 6', '2019-10-15', 'dessiner couches de la terre', 'Geographie', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
