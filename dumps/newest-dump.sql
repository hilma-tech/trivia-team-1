-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: monkey_quiz
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `access_logger`
--

DROP TABLE IF EXISTS `access_logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `success` tinyint NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_592498efcc7b3c679d433037b1d` (`userId`),
  CONSTRAINT `FK_592498efcc7b3c679d433037b1d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_logger`
--

LOCK TABLES `access_logger` WRITE;
/*!40000 ALTER TABLE `access_logger` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_correct` tinyint NOT NULL,
  `question_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c3d19a89541e4f0813f2fe09194` (`question_id`),
  CONSTRAINT `FK_c3d19a89541e4f0813f2fe09194` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,'מְזוּקָק מתכת סלט','https://loremflickr.com/640/480?lock=58692',1,1),(2,'אינטליגנטי רך דג','https://loremflickr.com/640/480?lock=82405',0,1),(3,'מעשי מתכת מגבות','https://loremflickr.com/640/480?lock=90932',1,2),(4,'מְזוּקָק בטון כובע','https://loremflickr.com/640/480?lock=4579',0,2),(5,'מעשי גומי בייקון','https://loremflickr.com/640/480?lock=31207',0,3),(6,'ארגונומי כותנה סבון','https://loremflickr.com/640/480?lock=35775',0,3),(7,'לא ממותג צַח גבינה','https://loremflickr.com/640/480?lock=15055',0,3),(8,'ארגונומי כותנה צ\'יפס','https://loremflickr.com/640/480?lock=29965',1,3),(9,'מאוד יפה מתכת מחשב','https://loremflickr.com/640/480?lock=91669',1,4),(10,'מעשי גרניט צ\'יפס','https://loremflickr.com/640/480?lock=50070',0,4),(11,'ארגונומי פלדה חולצה','https://loremflickr.com/640/480?lock=50857',0,5),(12,'מעשי בטון כיסא','https://loremflickr.com/640/480?lock=61641',0,5),(13,'מאוד יפה גרניט נעליים','https://loremflickr.com/640/480?lock=9847',1,5),(14,'מאוד יפה בטון דג','https://loremflickr.com/640/480?lock=19066',0,5),(15,'מְזוּקָק קפוא פיצה','https://loremflickr.com/640/480?lock=76159',0,6),(16,'אינטליגנטי קפוא עכבר','https://loremflickr.com/640/480?lock=75211',0,6),(17,'לא ממותג פלסטי בייקון','https://loremflickr.com/640/480?lock=22541',0,7),(18,'ארגונומי מתכת כדור','https://loremflickr.com/640/480?lock=53124',1,7),(19,'כפרי גרניט בייקון','https://loremflickr.com/640/480?lock=4965',0,8),(20,'אינטליגנטי צַח נקניקיות','https://loremflickr.com/640/480?lock=16399',1,8),(21,'קטן כותנה שולחן','https://loremflickr.com/640/480?lock=26473',1,9),(22,'עבודת יד גומי דג','https://loremflickr.com/640/480?lock=14058',0,9),(23,'טעים קפוא גבינה','https://loremflickr.com/640/480?lock=72463',1,10),(24,'מאוד יפה קפוא סבון','https://loremflickr.com/640/480?lock=56936',0,10),(25,'מאוד יפה עץ בייקון','https://loremflickr.com/640/480?lock=86739',1,11),(26,'גנרית כותנה טונה','https://loremflickr.com/640/480?lock=39148',0,11),(27,'מְזוּקָק קפוא כיסא','https://loremflickr.com/640/480?lock=27362',0,12),(28,'ארגונומי רך כדור','https://loremflickr.com/640/480?lock=64913',0,12),(29,'עבודת יד פלדה עוף','https://loremflickr.com/640/480?lock=83754',0,12),(30,'אינטליגנטי רך עכבר','https://loremflickr.com/640/480?lock=52957',1,12),(31,'ארגונומי פלדה מקלדת','https://loremflickr.com/640/480?lock=49837',0,13),(32,'מדהים קפוא חולצה','https://loremflickr.com/640/480?lock=96031',1,13),(33,'טעים פלסטי מגבות','https://loremflickr.com/640/480?lock=28855',0,13),(34,'קטן צַח סבון','https://loremflickr.com/640/480?lock=8990',0,14),(35,'לא ממותג כותנה כדור','https://loremflickr.com/640/480?lock=46838',0,14),(36,'כפרי גרניט בייקון','https://loremflickr.com/640/480?lock=33415',1,15),(37,'גנרית בטון כובע','https://loremflickr.com/640/480?lock=7369',0,15),(38,'ארגונומי עץ פיצה','https://loremflickr.com/640/480?lock=22956',0,16),(39,'מאוד יפה צַח סבון','https://loremflickr.com/640/480?lock=96066',0,16),(40,'מאוד יפה פלדה אופניים','https://loremflickr.com/640/480?lock=54138',0,16),(41,'טעים גרניט סלט','https://loremflickr.com/640/480?lock=46158',0,17),(42,'גנרית קפוא נעליים','https://loremflickr.com/640/480?lock=12851',0,17),(43,'כפרי גומי נקניקיות','https://loremflickr.com/640/480?lock=36452',0,18),(44,'גנרית מתכת מגבות','https://loremflickr.com/640/480?lock=5909',1,18),(45,'מְזוּקָק מתכת עוף','https://loremflickr.com/640/480?lock=28369',1,19),(46,'עבודת יד צַח דג','https://loremflickr.com/640/480?lock=69071',0,19),(47,'מלוטש צַח סבון','https://loremflickr.com/640/480?lock=39820',0,19),(48,'כפרי קפוא צ\'יפס','https://loremflickr.com/640/480?lock=74974',0,19),(49,'מְזוּקָק צַח כפפות','https://loremflickr.com/640/480?lock=43926',1,20),(50,'כפרי עץ עכבר','https://loremflickr.com/640/480?lock=30241',0,20),(51,'עבודת יד רך מחשב','https://loremflickr.com/640/480?lock=91964',0,20),(52,'מְזוּקָק מתכת דג','https://loremflickr.com/640/480?lock=85240',0,21),(53,'מאוד יפה פלסטי עכבר','https://loremflickr.com/640/480?lock=31191',1,21),(54,'פנטסטי פלסטי אוטו','https://loremflickr.com/640/480?lock=73840',0,21),(55,'כפרי צַח גבינה','https://loremflickr.com/640/480?lock=5114',0,22),(56,'טעים רך דג','https://loremflickr.com/640/480?lock=64233',0,22),(57,'מורשה קפוא עכבר','https://loremflickr.com/640/480?lock=73508',1,22),(58,'מאוד יפה קפוא טונה','https://loremflickr.com/640/480?lock=86116',0,23),(59,'אינטליגנטי מתכת מקלדת','https://loremflickr.com/640/480?lock=34450',0,23),(60,'גנרית מתכת כובע','https://loremflickr.com/640/480?lock=86913',1,23),(61,'מדהים גרניט נעליים','https://loremflickr.com/640/480?lock=84427',0,23),(62,'קטן גומי אופניים','https://loremflickr.com/640/480?lock=31206',0,24),(63,'מעשי פלסטי גבינה','https://loremflickr.com/640/480?lock=50636',1,24),(64,'פנטסטי פלדה מחשב','https://loremflickr.com/640/480?lock=1801',0,24);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_spam`
--

DROP TABLE IF EXISTS `email_spam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_spam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_52eb087e1598863b2f09fc1534` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_spam`
--

LOCK TABLES `email_spam` WRITE;
/*!40000 ALTER TABLE `email_spam` DISABLE KEYS */;
/*!40000 ALTER TABLE `email_spam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password`
--

DROP TABLE IF EXISTS `password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_4cd77c9b2e2522ee9d3671b3bc` (`user_id`),
  CONSTRAINT `FK_4cd77c9b2e2522ee9d3671b3bc1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password`
--

LOCK TABLES `password` WRITE;
/*!40000 ALTER TABLE `password` DISABLE KEYS */;
/*!40000 ALTER TABLE `password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `quiz_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_aecfc55f7d8e7bb703193e03118` (`quiz_id`),
  CONSTRAINT `FK_aecfc55f7d8e7bb703193e03118` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'מלוטש פלדה מכנסיים','https://loremflickr.com/640/480?lock=33351',1),(2,'מדהים כותנה נעליים','https://loremflickr.com/640/480?lock=44303',1),(3,'ארגונומי מתכת מכנסיים','https://loremflickr.com/640/480?lock=49532',1),(4,'לא ממותג פלסטי אופניים','https://loremflickr.com/640/480?lock=76258',1),(5,'מְזוּקָק קפוא מגבות','https://loremflickr.com/640/480?lock=46656',2),(6,'עבודת יד רך דג','https://loremflickr.com/640/480?lock=97127',2),(7,'טעים גומי סבון','https://loremflickr.com/640/480?lock=59196',2),(8,'קטן גרניט אופניים','https://loremflickr.com/640/480?lock=78466',2),(9,'לא ממותג פלסטי מכנסיים','https://loremflickr.com/640/480?lock=96808',2),(10,'מדהים בטון שולחן','https://loremflickr.com/640/480?lock=13525',2),(11,'לא ממותג מתכת גבינה','https://loremflickr.com/640/480?lock=42753',2),(12,'לא ממותג גרניט מכנסיים','https://loremflickr.com/640/480?lock=8154',3),(13,'מדהים בטון בייקון','https://loremflickr.com/640/480?lock=67299',3),(14,'מְזוּקָק כותנה עכבר','https://loremflickr.com/640/480?lock=74068',3),(15,'טעים גרניט חולצה','https://loremflickr.com/640/480?lock=53534',3),(16,'כפרי עץ בייקון','https://loremflickr.com/640/480?lock=22376',4),(17,'מְזוּקָק גומי שולחן','https://loremflickr.com/640/480?lock=35762',4),(18,'לא ממותג בטון עכבר','https://loremflickr.com/640/480?lock=5369',4),(19,'טעים בטון שולחן','https://loremflickr.com/640/480?lock=56246',4),(20,'כפרי גומי עוף','https://loremflickr.com/640/480?lock=38091',4),(21,'מלוטש מתכת נעליים','https://loremflickr.com/640/480?lock=61869',5),(22,'עבודת יד רך אופניים','https://loremflickr.com/640/480?lock=27471',5),(23,'ארגונומי פלדה כפפות','https://loremflickr.com/640/480?lock=3646',5),(24,'לא ממותג גרניט חולצה','https://loremflickr.com/640/480?lock=58384',5);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `creator_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5716583af6b99b4aedef89a4bb6` (`creator_id`),
  CONSTRAINT `FK_5716583af6b99b4aedef89a4bb6` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'לא ממותג רך עוף','מערך הרכב מורכב מעיצוב מנוע קדמי, עם תיבות הילוכים מסוג ציר טרנסוולר המותקנות בחלק האחורי של המנוע והנעה עם ארבעה גלגלים','https://loremflickr.com/640/480?lock=33958','32488004-4fcc-4fc0-831f-997efdbea69e'),(2,'טעים גרניט מקלדת','נאגסאקי לנדר הוא השם המסחרי המסחרי של מספר סדרות של אופני ספורט נגסאקי, שהחלו ב- ABC800J משנת 1984','https://loremflickr.com/640/480?lock=38297','32488004-4fcc-4fc0-831f-997efdbea69e'),(3,'עבודת יד מתכת עכבר','מקלדת מייפל גיימינג דקה ופשוטה מבית Dev Byte מגיעה עם גוף אלגנטי ותאורת RGB LED בגוון 7 צבעים לפונקציונליות חכמה','https://loremflickr.com/640/480?lock=3402','32488004-4fcc-4fc0-831f-997efdbea69e'),(4,'לא ממותג צַח צ\'יפס','אפולוטק B340 הוא עכבר אלחוטי במחיר סביר עם קישוריות אמינה, חיי סוללה של 12 חודשים ועיצוב מודרני','https://loremflickr.com/640/480?lock=56003','32488004-4fcc-4fc0-831f-997efdbea69e'),(5,'מדהים כותנה עוף','הכדורגל טוב לאימונים ולמטרות פנאי','https://loremflickr.com/640/480?lock=10490','32488004-4fcc-4fc0-831f-997efdbea69e');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `roleKey` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'User','Regular user','WWfYFeXwK4aIDD2vejeud1LM2VchrzbxTfzB71KXc88=');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `score` int NOT NULL,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `player` varchar(255) NOT NULL,
  `quiz_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3f8f22210586c69c9af89b4f8e6` (`quiz_id`),
  CONSTRAINT `FK_3f8f22210586c69c9af89b4f8e6` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,46,'2023-03-13 12:32:31.368732','קטיה אתר',1),(2,25,'2023-03-13 12:32:31.373489','ראובן שוער',1),(3,80,'2023-03-13 12:32:31.377104','תאנה רום',1),(4,27,'2023-03-13 12:32:31.379898','מר קסם יצחק',1),(5,80,'2023-03-13 12:32:31.382594','תקווה בורר',1),(6,0,'2023-03-13 12:32:31.385615','הוד שבתי',1),(7,97,'2023-03-13 12:32:31.389177','אדל ברקין',1),(8,36,'2023-03-13 12:32:31.392908','שירה אזרחי',1),(9,60,'2023-03-13 12:32:31.396257','מיטב ישראל',1),(10,33,'2023-03-13 12:32:31.399232','מר טלי לבנת',1),(11,44,'2023-03-13 12:32:31.401887','מר קמה זאבי',1),(12,70,'2023-03-13 12:32:31.404541','אדל צידון',2),(13,82,'2023-03-13 12:32:31.407622','עוז כרמל',2),(14,79,'2023-03-13 12:32:31.411028','מיכאלה בר זוהר',2),(15,33,'2023-03-13 12:32:31.413864','אהבה ברטוב',2),(16,96,'2023-03-13 12:32:31.416061','מצדה ניצן',2),(17,78,'2023-03-13 12:32:31.418518','רוני מנור',2),(18,61,'2023-03-13 12:32:31.421508','אמונה פרץ',2),(19,71,'2023-03-13 12:32:31.425035','יניב זכות',2),(20,3,'2023-03-13 12:32:31.428043','ערגה בר יהודה',2),(21,30,'2023-03-13 12:32:31.430814','יוגב ארידור',2),(22,76,'2023-03-13 12:32:31.433363','דורון רווח',3),(23,42,'2023-03-13 12:32:31.435472','ליטל אוריאל',3),(24,20,'2023-03-13 12:32:31.438098','שמחה בן ארצי',3),(25,50,'2023-03-13 12:32:31.440708','דולב אליצור',4),(26,15,'2023-03-13 12:32:31.445243','אריאל עופרים',4),(27,62,'2023-03-13 12:32:31.448074','תקווה מתניה',4),(28,72,'2023-03-13 12:32:31.450275','נועם שגיא',5),(29,41,'2023-03-13 12:32:31.454037','זוהר ברקאי',5),(30,48,'2023-03-13 12:32:31.457443','גיורא שמואלי',5),(31,17,'2023-03-13 12:32:31.461974','אגם נתיב',5),(32,25,'2023-03-14 09:40:40.755119','yossi',1),(33,75,'2023-03-14 09:44:52.084414','yossi',1),(34,125,'2023-03-14 09:45:02.485815','yossi',1),(35,175,'2023-03-14 09:46:00.889850','yossi',1),(36,200,'2023-03-14 09:46:17.272078','yossi',1),(37,250,'2023-03-14 09:46:26.521439','yossi',1),(38,300,'2023-03-14 09:46:34.789939','yossi',1),(39,375,'2023-03-14 09:46:44.596774','yossi',1),(40,425,'2023-03-14 09:48:26.786310','yossi',1),(41,575,'2023-03-14 09:54:29.425078','77',1),(42,600,'2023-03-14 09:54:41.042057','77',1),(43,625,'2023-03-14 09:54:45.964977','77',1),(44,675,'2023-03-14 10:15:08.658375','77',1),(45,50,'2023-03-14 10:26:48.056595','yosso',1),(46,100,'2023-03-14 10:26:56.168881','yosso',1),(47,150,'2023-03-14 10:29:44.883737','yosso',1),(48,50,'2023-03-14 10:40:14.227906','yosko',1),(49,43,'2023-03-14 10:44:16.241005','ניסים שפרן',2),(50,29,'2023-03-14 10:44:44.285141','איציק קלה',2),(51,29,'2023-03-14 10:45:35.155165','שמעון מכפר סבא',2),(52,43,'2023-03-14 10:46:35.707483','ר',2),(53,29,'2023-03-14 10:48:50.553782','טאטא',2),(54,29,'2023-03-14 10:49:22.985947','טאטאטאט',2),(55,71,'2023-03-14 10:53:19.722750','טאטאטאט',2),(56,100,'2023-03-14 10:53:31.007389','טאטאטאט',2),(57,143,'2023-03-14 10:53:45.760533','טאטאטאט',2),(58,29,'2023-03-14 10:56:05.665907','cxccccccccc',2),(59,29,'2023-03-14 11:02:33.974649',' tyrty',2),(60,29,'2023-03-14 11:10:48.932674','p[[',2),(61,29,'2023-03-14 11:15:27.598615','fsdfsdf',2),(62,29,'2023-03-14 11:29:34.738887','iouio',2),(63,29,'2023-03-14 11:43:57.099746','tyrtyt',2),(64,14,'2023-03-14 11:44:20.015564','5t54',2),(65,29,'2023-03-14 12:08:22.136916','asdasd',2),(66,29,'2023-03-14 12:23:56.677896','rtyrty',2),(67,29,'2023-03-14 12:27:13.178039','e3eqw',2),(68,29,'2023-03-14 12:28:09.860144','5465',2),(69,29,'2023-03-14 12:51:08.175118','ouioui',2),(70,29,'2023-03-14 12:51:41.886579','piopo',2),(71,29,'2023-03-14 12:56:12.062845','jghjgh',2),(72,14,'2023-03-14 12:58:58.954307','qweqw',2),(73,29,'2023-03-14 13:03:08.635655','qweqw',2),(74,25,'2023-03-14 13:35:51.300627','werwer',1),(75,100,'2023-03-14 13:36:13.994112','werwer',1),(76,25,'2023-03-14 13:43:26.320704','6765',1),(77,25,'2023-03-14 13:43:52.921578','78978',1),(78,25,'2023-03-14 13:44:52.350721','90-0',1),(79,25,'2023-03-14 14:28:22.192908','ofek',1),(80,50,'2023-03-14 14:29:08.972727','ofek',1),(81,25,'2023-03-14 14:32:51.801820','ofek',1),(82,50,'2023-03-14 14:35:39.302130','ofek',1),(83,75,'2023-03-14 14:36:16.639097','ofek',1),(84,25,'2023-03-14 15:28:36.911853','ofek',1),(85,25,'2023-03-14 15:31:17.990924','ofek',1),(86,50,'2023-03-14 15:31:35.628755','ofek',1),(87,25,'2023-03-14 15:35:43.704203','ofek',1),(88,25,'2023-03-14 15:38:42.765885','ofek',1),(89,25,'2023-03-14 15:41:24.797788','ofek',1),(90,50,'2023-03-14 16:00:54.454167','qedqwee',1),(91,25,'2023-03-14 16:10:13.713563','342234',1),(92,50,'2023-03-14 16:12:07.359823','weqwe',1);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_spam`
--

DROP TABLE IF EXISTS `sms_spam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sms_spam` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d82e5145eda9a2ca635afeff8c` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_spam`
--

LOCK TABLES `sms_spam` WRITE;
/*!40000 ALTER TABLE `sms_spam` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_spam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `two_factor`
--

DROP TABLE IF EXISTS `two_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `attempt` tinyint unsigned NOT NULL DEFAULT '0',
  `code_created_date` timestamp(6) NULL DEFAULT NULL,
  `user_blocked_date` timestamp(6) NULL DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_162c7f53b41b84102a8e06eff1` (`user_id`),
  CONSTRAINT `FK_162c7f53b41b84102a8e06eff18` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `two_factor`
--

LOCK TABLES `two_factor` WRITE;
/*!40000 ALTER TABLE `two_factor` DISABLE KEYS */;
/*!40000 ALTER TABLE `two_factor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('32488004-4fcc-4fc0-831f-997efdbea69e','koren','$2b$10$OHjTOGBHcJhvdp3ZQpIhv.sigq0P2G3WwRZOOweNZsYeR5V2HFnyy','2023-03-13 12:24:54.161855','2023-03-13 12:24:54.161855','ExtendedUser'),('66e59c5d-657b-48fc-96a4-d3ae0730da6a','bulbul','$2b$10$phBfTskqUN90No3k0hbOPO8P2e6G839YXAWinqGVUBSSEqRcKFFMa','2023-03-15 10:29:21.119441','2023-03-15 10:29:21.119441','ExtendedUser'),('dd15a45a-0edd-459b-ae37-7a5daac6c61b','iti','$2b$10$k1yD3zHLsdzjT0AvggNqLOUQ.hlpQ7hfDKN2ngY29e.DiGXn9MPC.','2023-03-13 15:01:12.892846','2023-03-13 15:01:12.892846','ExtendedUser');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_password`
--

DROP TABLE IF EXISTS `user_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e755bee2cdcee50a9e742776d8` (`userId`),
  CONSTRAINT `FK_3e755bee2cdcee50a9e742776d8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_password`
--

LOCK TABLES `user_password` WRITE;
/*!40000 ALTER TABLE `user_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(36) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_d0e5815877f7395a198a4cb0a4` (`user_id`),
  KEY `IDX_32a6fc2fcb019d8e3a8ace0f55` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('32488004-4fcc-4fc0-831f-997efdbea69e',1),('66e59c5d-657b-48fc-96a4-d3ae0730da6a',1),('dd15a45a-0edd-459b-ae37-7a5daac6c61b',1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-14 15:36:15
