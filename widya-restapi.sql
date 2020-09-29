-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.6008
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for widya-restapi
CREATE DATABASE IF NOT EXISTS `widya-restapi` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `widya-restapi`;

-- Dumping structure for table widya-restapi.access_token
CREATE TABLE IF NOT EXISTS `access_token` (
  `id_access_token` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `access_token` text NOT NULL,
  `ip_address` varchar(20) NOT NULL,
  PRIMARY KEY (`id_access_token`) USING BTREE,
  KEY `id_user` (`id_user`),
  CONSTRAINT `access_token_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table widya-restapi.access_token: ~0 rows (approximately)
/*!40000 ALTER TABLE `access_token` DISABLE KEYS */;
INSERT INTO `access_token` (`id_access_token`, `id_user`, `access_token`, `ip_address`) VALUES
	(1, 71, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NzEsIm5hbWEiOiJoZW5kcmkiLCJlbWFpbCI6ImhlbmRyaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwiamVuaXNLZWxhbWluIjoiTCJ9XSwiaWF0IjoxNjAxMzgzNjQ3LCJleHAiOjE2MDEzODYwNDd9.ZnydxbploLIXGMcoO1t2NQTOLtbcd35JdXi5rQuQLGQ', '192.168.128.1'),
	(2, 72, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NzIsIm5hbWEiOiJoZW5kcmlzIiwiZW1haWwiOiJoZW5kcmlzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzAiLCJqZW5pc0tlbGFtaW4iOiJMIn1dLCJpYXQiOjE2MDEzODU1MzUsImV4cCI6MTYwMTM4NzkzNX0.R-aT4npC9V-edw2bU7vRdji2vQkL3loo05W3x7-1VQI', '192.168.128.1'),
	(3, 72, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJpZCI6NzIsIm5hbWEiOiJoZW5kcmlzIiwiZW1haWwiOiJoZW5kcmlzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzAiLCJqZW5pc0tlbGFtaW4iOiJMIn1dLCJpYXQiOjE2MDEzOTQ3MjQsImV4cCI6MTYwMTM5NzEyNH0.6gK9hz1ZU3upHwMO7LB9s94Mk8-Dhhq8cechj1Hvwxs', '192.168.128.1');
/*!40000 ALTER TABLE `access_token` ENABLE KEYS */;

-- Dumping structure for table widya-restapi.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `jenisKelamin` char(2) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;

-- Dumping data for table widya-restapi.user: ~0 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `nama`, `email`, `password`, `jenisKelamin`) VALUES
	(70, 'haidar', 'haidar@gmail.com', '123', 'L'),
	(71, 'hendri', 'hendri@gmail.com', '202cb962ac59075b964b07152d234b70', 'L'),
	(72, 'hendris', 'hendris@gmail.com', '202cb962ac59075b964b07152d234b70', 'L');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
