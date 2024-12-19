-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: bizflow
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `items` json DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (3,'','[{\"name\": \"\", \"price\": \"\", \"quantity\": \"\"}]',0.00,'2024-12-18 18:38:37','/bills/bill_1734547117016.pdf'),(4,'Pratham','[{\"name\": \"Laptop\", \"price\": \"76000.00\", \"quantity\": \"4\"}, {\"name\": \"Keyboard\", \"price\": \"1200.00\", \"quantity\": \"5\"}, {\"name\": \"\", \"price\": \"\", \"quantity\": \"\"}]',310000.00,'2024-12-18 18:39:05','/bills/bill_1734547145715.pdf'),(5,'','[]',0.00,'2024-12-18 18:41:40','/bills/bill_1734547300408.pdf');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sku_items`
--

DROP TABLE IF EXISTS `sku_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sku_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sku_items`
--

LOCK TABLES `sku_items` WRITE;
/*!40000 ALTER TABLE `sku_items` DISABLE KEYS */;
INSERT INTO `sku_items` VALUES (1,'Laptop',50,76000.00),(2,'Smartphone',17,15000.00),(3,'Tablet',45,20000.00),(4,'Headphones',50,2000.00),(5,'Keyboard',8,1200.00),(6,'Mouse',20,900.00),(7,'Monitor',20,10000.00),(8,'Printer',3,15000.00),(9,'Router',21,3000.00),(10,'External Hard Drive',15,5000.00);
/*!40000 ALTER TABLE `sku_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (13,'2024-12-13',60000.00,'Smartphone',4),(14,'2024-12-13',675000.00,'Printer',45),(15,'2024-12-13',304000.00,'Laptop',4),(16,'2024-12-13',100000.00,'Monitor',10),(17,'2024-12-13',60000.00,'External Hard Drive',12),(18,'2024-12-13',30000.00,'Printer',2),(19,'2024-11-10',100000.00,'Smartphone',10),(20,'2024-08-12',150000.00,'Smartphone',15),(21,'2024-08-25',210000.00,'Laptop',7),(22,'2024-09-05',40000.00,'Headphones',20),(23,'2024-09-19',50000.00,'Smartwatch',5),(24,'2024-10-03',100000.00,'Smartphone',10),(25,'2024-10-18',60000.00,'Tablet',12),(26,'2024-11-02',240000.00,'Laptop',8),(27,'2024-11-15',50000.00,'Headphones',25),(28,'2024-08-03',200000.00,'Smartphone',20),(29,'2024-08-15',75000.00,'Smartwatch',10),(30,'2024-09-10',125000.00,'Laptop',5),(31,'2024-09-25',30000.00,'Headphones',15),(32,'2024-10-01',50000.00,'Tablet',10),(33,'2024-10-20',120000.00,'Smartphone',12),(34,'2024-11-05',180000.00,'Laptop',6),(35,'2024-11-22',64000.00,'Smartwatch',8),(36,'2024-08-05',180000.00,'Smartphone',18),(37,'2024-08-18',56000.00,'Smartwatch',7),(38,'2024-09-12',90000.00,'Laptop',3),(39,'2024-09-28',40000.00,'Headphones',20),(40,'2024-10-05',40000.00,'Tablet',8),(41,'2024-10-15',250000.00,'Smartphone',25),(42,'2024-11-02',120000.00,'Laptop',4),(43,'2024-11-10',40000.00,'Smartwatch',5),(44,'2024-12-16',3420000.00,'Laptop',45),(45,'2024-12-16',100000.00,'Tablet',5),(46,'2024-12-16',12000.00,'Keyboard',10),(47,'2024-12-16',300000.00,'Smartphone',20),(48,'2024-12-17',36000.00,'Mouse',40),(49,'2024-12-17',45000.00,'Smartphone',3),(50,'2024-12-18',12000.00,'Router',4);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19 18:51:27
