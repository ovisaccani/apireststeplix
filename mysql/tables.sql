-- Create syntax for TABLE 'currencies'
CREATE TABLE `currencies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `symbol` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create syntax for TABLE 'rates'
CREATE TABLE `rates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL,
  `created_at` datetime NOT NULL,
  `id_currency` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_currency` (`id_currency`),
  CONSTRAINT `rates_ibfk_1` FOREIGN KEY (`id_currency`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=257 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;