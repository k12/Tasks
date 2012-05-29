-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 29 May 2012, 22:57
-- Wersja serwera: 5.5.16
-- Wersja PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `tasks`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `dueDate` date DEFAULT NULL,
  `priority` enum('none','low','normal','high') NOT NULL DEFAULT 'none',
  `note` text,
  `state` enum('not started','in progress','completed') NOT NULL DEFAULT 'not started',
  `completedAt` date DEFAULT NULL,
  `assignedToId` int(11) DEFAULT NULL,
  `assignedById` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignedToId` (`assignedToId`),
  KEY `assignedById` (`assignedById`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `dueDate`, `priority`, `note`, `state`, `completedAt`, `assignedToId`, `assignedById`, `categoryId`) VALUES
(25, 'Task 01', NULL, 'none', 'Lorem ipsum...', 'not started', NULL, 2, 3, 2),
(26, 'Task 02', '2012-05-27', 'low', '', 'completed', '2012-05-28', 1, 1, 2),
(27, 'Task 03', '2012-05-29', 'none', '', 'completed', '2012-05-28', 1, 1, 2),
(28, 'Task 04', '2012-05-30', 'normal', '', 'completed', '2012-05-29', 1, 1, 2),
(29, 'Task 05', '2012-05-31', 'none', '', 'completed', '2012-05-29', 1, 1, 2),
(30, 'Task 06', '2012-05-29', 'low', '', 'completed', NULL, 1, 1, 2),
(31, 'Task 07', NULL, 'normal', '', 'in progress', NULL, 1, 1, 1),
(32, 'Task 08', '2012-05-31', 'high', '', 'in progress', NULL, 1, 1, 2),
(33, 'Task 09', '2012-05-22', 'none', '', 'in progress', NULL, 1, 1, 2);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`assignedToId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assignedById`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
