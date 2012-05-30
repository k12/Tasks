-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 30 May 2012, 21:14
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
  PRIMARY KEY (`id`),
  KEY `assignedToId` (`assignedToId`),
  KEY `assignedById` (`assignedById`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=50 ;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `dueDate`, `priority`, `note`, `state`, `completedAt`, `assignedToId`, `assignedById`) VALUES
(40, 'Task 01', '2012-05-30', 'none', '', 'completed', '2012-05-30', 1, 1),
(41, 'Task 02', '2012-05-27', 'none', '', 'completed', '2012-05-30', 1, 1),
(42, 'Task 03', NULL, 'low', '', 'not started', NULL, 1, 1),
(43, 'Task 04', '2012-05-01', 'normal', '', 'not started', NULL, 1, 1),
(44, 'Task 05', '2012-05-30', 'none', '', 'completed', '2012-05-30', 1, 1),
(45, 'Task 06', NULL, 'low', 'Lorem ipsum', 'in progress', NULL, 1, 1),
(46, 'Task 07', '2012-06-30', 'normal', '', 'not started', NULL, 1, 1),
(47, 'Task 08', '2012-06-30', 'none', '', 'not started', NULL, 1, 1),
(48, 'Task 09', '2012-05-30', 'high', '', 'in progress', NULL, 1, 1),
(49, 'Task 10', '2012-05-29', 'none', '', 'in progress', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
(1, 'Jan Kowalski'),
(2, 'Marta Nowak'),
(3, 'Johnny Cage');

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`assignedToId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assignedById`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
