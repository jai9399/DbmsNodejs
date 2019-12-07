-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 07, 2019 at 08:24 AM
-- Server version: 5.7.24
-- PHP Version: 7.0.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmsproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `bought`
--

CREATE TABLE `bought` (
  `username` varchar(10) DEFAULT NULL,
  `buyvalue` int(10) DEFAULT NULL,
  `Type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bought`
--

INSERT INTO `bought` (`username`, `buyvalue`, `Type`) VALUES
('jai9399', 25, 'Ripple'),
('jai9399', 131362477, 'Bitcoin'),
('jai9399', 12986, 'Ethereum'),
('jai9399', 66500, 'Dash'),
('dadada', 250, 'Ripple'),
('dadada', 250, 'Ripple'),
('dadada', 500, 'Ripple'),
('dadada', 591723, 'Bitcoin'),
('dadada', 6650, 'Dash'),
('dadada', 12986, 'Ethereum'),
('yash123', 2500, 'Ripple'),
('yash123', 6650, 'Dash'),
('dundaa', 12986, 'Ethereum'),
('daer', 6650, 'Dash'),
('puneeth', 591723, 'Bitcoin');

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `username` varchar(10) DEFAULT NULL,
  `sellvalue` int(10) DEFAULT NULL,
  `Type` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sold`
--

INSERT INTO `sold` (`username`, `sellvalue`, `Type`) VALUES
('jai9399', 258, 'Ripple'),
('jai9399', 591723, 'Bitcoin'),
('jai9399', -12986, 'Ethereum'),
('dadada', 6650, 'Dash'),
('yash123', 6650, 'Dash'),
('puneeth', 650895, 'Bitcoin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(2) DEFAULT NULL,
  `Username` varchar(10) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Password` varchar(15) DEFAULT NULL,
  `Pan` varchar(10) DEFAULT NULL,
  `phone` bigint(10) DEFAULT NULL,
  `hash` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `Username`, `Email`, `Password`, `Pan`, `phone`, `hash`) VALUES
(1, 'mayank', 'mayankkill@gmail.com', '123456', 'ABLMO12345', 8489170452, '$abchd3235hagjhwvjhefnma'),
(2, 'vicks', 'vikasmishran@gmail.com', '123456', 'ACBDE12345', 1234567890, '$2b$04$kHFcM/mSA3H0Iy.v4fHRVuzMOYLeFudTUwWI0fvrB8ZqwtUh85H7O'),
(3, 'puneeth', 'puneethreddy951@gmail.com', '123456', 'SOPLN12345', 1234564567, '$2b$04$zcIRJBqNjeHfClSOL9K2W.6JJDBeWRxmI74G/yGgWjWiPud71Fl/W');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `username` varchar(10) DEFAULT NULL,
  `money` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`username`, `money`) VALUES
('puneeth', 62172),
('vicks', 2000),
('mayank', 2020),
('super', 0),
('sivesh', 0),
('jai9399', 500609),
('dadada', 564),
('yash123', 500),
('dundaa', 14),
('daer', 3350),
('shivesh', 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD UNIQUE KEY `username` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
