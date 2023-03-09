-- MySQL dump 10.13  Distrib 8.0.29, for macos12.4 (arm64)
--
-- Host: 127.0.0.1    Database: influenzanet
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `name` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` (`name`, `id`) VALUES ('Italy',1),('Denmark',2),('France',3),('United Kingdom',4),('Switzerland',5),('Netherlands',6),('Germany',7),('Spain',8),('Ireland',9),('Portugal',10),('Sweden',11),('Belgium',12);
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES (1,1669388871167,'auto1669388871167'),(3,1669390838813,'auto1669390838813');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner` (
  `name` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_platform_platform`
--

DROP TABLE IF EXISTS `partner_platform_platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_platform_platform` (
  `partnerId` int NOT NULL,
  `platformId` int NOT NULL,
  PRIMARY KEY (`partnerId`,`platformId`),
  KEY `partner_platform_platform_platform_null_fk` (`platformId`),
  CONSTRAINT `partner_platform_platform_partner_null_fk` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`),
  CONSTRAINT `partner_platform_platform_platform_null_fk` FOREIGN KEY (`platformId`) REFERENCES `platform` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_platform_platform`
--

LOCK TABLES `partner_platform_platform` WRITE;
/*!40000 ALTER TABLE `partner_platform_platform` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner_platform_platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner_platform_platforms`
--

DROP TABLE IF EXISTS `partner_platform_platforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partner_platform_platforms` (
  `partnerId` int DEFAULT NULL,
  `platformsId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner_platform_platforms`
--

LOCK TABLES `partner_platform_platforms` WRITE;
/*!40000 ALTER TABLE `partner_platform_platforms` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner_platform_platforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `countryId` int DEFAULT NULL,
  `filePrefix` varchar(255) DEFAULT NULL,
  `active` tinyint DEFAULT NULL,
  `order` int DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `foreign_key_name` (`countryId`),
  CONSTRAINT `foreign_key_name` FOREIGN KEY (`countryId`) REFERENCES `country` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
INSERT INTO `platform` (`name`, `description`, `website`, `countryId`, `filePrefix`, `active`, `order`, `logo`, `id`) VALUES ('influmeter.dk','<p>Description here</p>','https://influmeter.dk/',2,'DK',1,140,'/assets/img/logo/platform/influmeter_denmark_logo.png',1),('covidmeter',NULL,'https://www.sundhed.dk/borger/corona/smitteopsporing/covidmeter/',2,'DKC',1,145,'/assets/img/logo/platform/covidmeter_denmark_logo.png',2),('flusurvey.net',NULL,'https://flusurvey.net/',4,'UK',1,150,'/assets/img/logo/platform/flusurvey_uk_logo.png',3),('Infectieradar',NULL,'https://www.infectieradar.nl/',6,'NL',1,130,'/assets/img/logo/platform/Infectieradar_netherlands_logo.png',4),('GrippeWeb',NULL,'https://grippeweb.rki.de/',7,'DE',1,170,'/assets/img/logo/platform/grippeWeb_germany_logo.png',5),('gripenet.pt',NULL,'https://gripenet.pt/',10,'PT',1,210,'/assets/img/logo/platform/gripenet_portugal_logo.png',6),('flusurvey.ie',NULL,'https://flusurvey.ie/',9,'IE',1,190,'/assets/img/logo/platform/flusurvey_ireland_logo.png',7),('gripenet.es',NULL,'https://www.gripenet.es/',8,'ES',0,200,'/assets/img/logo/platform/gripenet_spain_logo.png',8),('grippenet.ch',NULL,'https://grippenet.ch/',5,'CH',1,160,'/assets/img/logo/platform/grippenet_switzerland_logo.png',9),('influweb.org',NULL,'https://influweb.org/',1,'IT',1,50,'/assets/img/logo/platform/influweb_italy_logo.png',11),('grippenet.fr',NULL,'https://app.grippenet.fr/',3,'FR',1,100,'/assets/img/logo/platform/grippenet_france_logo.png',12),('Infectieradar',NULL,'https://survey.infectieradar.be/',12,'BE',1,180,'/assets/img/logo/platform/Infectieradar_belgium_logo.png',13);
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publication`
--

DROP TABLE IF EXISTS `publication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publication` (
  `title` varchar(255) DEFAULT NULL,
  `authors` varchar(500) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `publisher` varchar(255) DEFAULT NULL,
  `publicationDate` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publication`
--

LOCK TABLES `publication` WRITE;
/*!40000 ALTER TABLE `publication` DISABLE KEYS */;
INSERT INTO `publication` (`title`, `authors`, `id`, `publisher`, `publicationDate`, `url`) VALUES ('Are People Optimistically Biased about the Risk of COVID-19 infection? Lessons from the first wave of the pandemic in Europe','K. McColl, M. Debin, C. Souty, C. Guerrisi, C. Turbelin, A. Falchi, I. Bonmarin, D. Paolotti , C. Obi, J. Duggan, Y. Moreno , A. Wisniak, A. Flahault, T. Blanchon, V. Colizza, J. Raude',1,'International Journal of Environmental Research and Public Health 19 (1), 436 (2021)','2021-12-30T23:00:00.000Z','https://www.mdpi.com/1660-4601/19/1/436/htm'),('Factors associated with influenza-like-illness: a crowdsourced cohort study from 2012/13 to 2017/18.','C. Guerrisi, M. Ecollan, C. Souty, L. Rossignol, C. Turbelin, M. Debin, T. Goronflot, P.Y. Boëlle, T. Hanslik, V. Colizza, T. Blanchon.',2,'BMC Public Health 19:879 (2019)','2019-07-03T22:00:00.000Z','https://doi.org/10.1186/s12889-019-7174-6'),('Underdetection of cases of COVID-19 in France threatens epidemic control','Pullano, G., Di Domenico, L., Sabbatini, C.E. et al.',3,'Nature 590, 134–139 (2021)','2021-02-03T23:00:00.000Z','https://www.nature.com/articles/s41586-020-03095-6'),('SARS-CoV-2 infection in London, England: changes to community point prevalence around lockdown time, March-May 2020.','Edelstein, Michael et al.',4,'Journal of epidemiology and community health vol. 75,2 (2021): 185-188.','2021-01-07T23:00:00.000Z','https://pubmed.ncbi.nlm.nih.gov/33004659/'),('Risk factors associated with the incidence of self-reported COVID-19-like illness: Data from a web-based syndromic surveillance system in the Netherlands','McDonald, S., Van den Wijngaard, C., Wielders, C., Friesema, I., Soetens, L., Paolotti, D., Van Hoek, A.',5,'Epidemiology and Infection, 149, E129.','2021-05-18T22:00:00.000Z','https://pubmed.ncbi.nlm.nih.gov/34006340/'),('Population perception of mandatory childhood vaccination programme before its implementation, France, 2017. ','P. Mathieu, A. Gautier, J. Raude, T. Goronflot, T. Launay, M. Debin, C. Guerrisi, C. Turbelin, T. Hanslik, C. Jestin, V. Colizza, T. Blanchon, L. Rossignol.',6,'Blanchon, L. Rossignol.','2019-06-19T22:00:00.000Z','https://doi.org/10.2807/1560-7917.ES.2019.24.25.1900053'),('Global flu view: a platform to connect crowdsourced disease surveillance around the world.','A.W. Crawley, D. Paolotti, C. Dalton, J. Brownstein, M. Smolinski. ',7,'International Journal of Infectious Diseases, 79:7 (2019)','2019-01-31T23:00:00.000Z','https://doi.org/10.1016/j.ijid.2018.11.036'),('A topological data analysis approach to influenza-like-illness.','J.P. Costa, P. Škraba, D. Paolotti, R. Mexia.',8,'Proceedings of the ACM SIGKDD Workshop on Epidemiology meets Data Mining and Knowledge Discovery (epiDAMIK) (2018)','2018-08-19T22:00:00.000Z',NULL),('Healthcare-seeking behaviour in case of influenza-like illness in the French general population and factors associated with a GP consultation: an observational prospective study.','M. Ariza, C. Guerrisi, C. Souty, L. Rossignol, C. Turbelin, T. Hanslik, V. Colizza, T. Blanchon.',9,'BJGP Open, 1(4): bjgpopen17X101253 (2018)','2018-01-03T23:00:00.000Z','https://doi.org/10.3399/bjgpopen17X101253'),('Research ethics in the European Influenzanet consortium: Scoping review.','L.D. Geneviève, T. Wangmo, D. Dietrich, O. Woolley-Meza, A. Flahault, B.S. Elger.',10,'JMIR Public Health Surveillance, 4(4):e67 (2018)','2018-10-09T22:00:00.000Z','https://doi.org/10.2196/publichealth.9616'),('Self-Swabbing for virological confirmation of influenza-like illness among an Internet-based cohort in the UK during the 2014-2015 flu season: Pilot study.','C. Wenham, E.R. Gray, C.E. Keane, M. Donati, D. Paolotti, R. Pebody, E. Fragaszy, R.A. McKendry, W.J. Edmunds.',11,'Journal of Medical Internet Research, 20(3):e71 (2018)','2018-02-28T23:00:00.000Z','https://doi.org/10.2196/jmir.9084'),('The potential value of crowdsourced surveillance systems in supplementing sentinel influenza networks: the case of France.','C. Guerrisi, C. Turbelin, C. Souty, C. Poletto, T. Blanchon, T. Hanslik, I. Bonmarin, D. Levy-Bruhl, V. Colizza.',13,'Eurosurveillance, 23(25) (2018)','2018-06-20T22:00:00.000Z','https://doi.org/10.2807/1560-7917.ES.2018.23.25.1700337'),('Combining participatory influenza surveillance with modeling and forecasting: Three alternative approaches.','J.S. Brownstein, S. Chu, A. Marathe, M.V. Marathe, A.T. Nguyen, D. Paolotti, N. Perra, D. Perrotta, M. Santillana, S. Swarup, M. Tizzoni, A. Vespignani, A.K.S. Vullikanti, M.L. Wilson, Q. Zhang.',14,'JMIR Public Health and Surveillance, 3(4):e83 (2017)','2017-10-31T23:00:00.000Z','https://doi.org/10.2196/publichealth.7344'),('Disease severity determines health-seeking behaviour amongst individuals with influenza-like illness in an internet-based cohort.','M. Peppa, W.J. Edmunds, S. Funk.',15,'BMC infectious diseases, 17(1):238 (2017)','2017-03-30T22:00:00.000Z','https://doi.org/10.1186/s12879-017-2337-5'),('Influenzanet: Citizens among 10 countries collaborating to monitor influenza in Europe.','C. E. Koppeschaar, V. Colizza, C. Guerrisi, C. Turbelin, J. Duggan, W.J. Edmunds, C. Kjelsø, R. Mexia, Y. Moreno, S. Meloni, D. Paolotti, D. Perrotta, E. van Straten, A.O. Franco.',16,'JMIR Public Health and Surveillance, 3(3):e66 (2017)','2017-09-18T22:00:00.000Z','https://doi.org/10.2196/publichealth.7429'),('Participatory online surveillance as a supplementary tool to sentinel doctors for influenza-like illness surveillance in Italy.','D. Perrotta, A. Bella, C. Rizzo, D. Paolotti.',17,'PloS one, 12(1):e0169801 (2017)','2017-01-10T23:00:00.000Z','https://doi.org/10.1371/journal.pone.0169801'),('Using participatory Web-based surveillance data to improve seasonal influenza forecasting in Italy.','D. Perrotta, M. Tizzoni, D. Paolotti',18,'In Proceedings of the 26th International Conference on World Wide Web, pages 303-310','2017-04-02T22:00:00.000Z','https://doi.org/10.1145/3038912.3052670'),('First nationwide web-based surveillance system for influenza-like illness in pregnant women: participation and representativeness of the French G-GrippeNet cohort.','P. Loubet, C. Guerrisi, C. Turbelin, B. Blondel, O. Launay, M. Bardou, T. Blanchon, I. Bonmarin, F. Goffinet, P. Ancel, V. Colizza, T. Hanslik, S. Kernéis.',19,'BMC Public Health, 16(1):253 (2016)','2016-03-10T23:00:00.000Z','https://doi.org/10.1186/s12889-016-2899-y'),('Influenza during pregnancy: Incidence, vaccination coverage and attitudes toward vaccination in the French web-based cohort G-GrippeNet.','P. Loubet, C. Guerrisi, C. Turbelin, B. Blondel, O. Launay, M. Bardou, F. Goffinet, V. Colizza, T. Hanslik, S. Kernéis.',20,'Vaccine, 34(20):2390 (2016)','2016-04-28T22:00:00.000Z','https://doi.org/10.1016/j.vaccine.2016.03.034'),('Influmeter – an online tool for self-reporting of influenza-like illness in Denmark.','C. Kjelsø, M. Galle, H. Bang, S. Ethelberg, T.G. Krause.',21,'Infectious Diseases, 48(4):322 (2016)','2016-03-31T22:00:00.000Z','https://doi.org/10.3109/23744235.2015.1122224'),('Participatory syndromic surveillance of influenza in Europe.','C. Guerrisi, C. Turbelin, T. Blanchon, T. Hanslik, I. Bonmarin, D. Levy-Bruhl, D. Perrotta, D. Paolotti, R. Smallenburg, C.E. Koppeschaar, A.O. Franco, R. Mexia, W.J. Edmunds, B. Sile, R. Pebody, E. van Straten, S. Meloni, Y. Moreno, J. Duggan, C. Kjelsø, V. Colizza.',22,'Journal of Infectious Diseases, 214(suppl 4):S386-S392 (2016)','2016-03-31T22:00:00.000Z','https://doi.org/10.1093/infdis/jiw280'),('Opinion about seasonal influenza vaccination among the general population 3 years after the A(H1N1)pdm2009 influenza pandemic.','K. Boiron, M. Sarazin, M. Debin, J. Raude, L. Rossignol, C. Guerrisi, D. Odinkemelu, T. Hanslik, V. Colizza, T. Blanchon.',23,'Vaccine, 33(48):6849','2015-11-26T23:00:00.000Z','https://doi.org/10.1016/j.vaccine.2015.08.067'),('Social data mining and seasonal influenza forecasts: The FluOutlook platform.','Q. Zhang, C. Gioannini, D. Paolotti, N. Perra, D. Perrotta, M. Quaggiotto, M. Tizzoni, A. Vespignani.',24,'In Joint European Conference on Machine Learning and Knowledge Discovery in Databases, pages 237-240. Springer','2015-08-28T22:00:00.000Z','https://doi.org/10.1007/978-3-319-23461-8_21'),('Ten-year performance of influenzanet: ILI time series, risks, vaccine effects, and care-seeking behaviour.','S.P. van Noort, C.T. Codeço, C.E. Koppeschaar, M. Van Ranst, D. Paolotti, M.G.M. Gomes.',25,'Epidemics, 13:28-36','2015-11-30T23:00:00.000Z','https://doi.org/10.1016/j.epidem.2015.05.001'),('Association between recruitment methods and attrition in Internet-based studies.','P. Bajardi, D. Paolotti, A. Vespignani, K. Eames, S. Funk, W. J. Edmunds, C. Turbelin, M. Debin, V. Colizza, R. Smallenburg, C.E. Koppeschaar, A.O. Franco, V. Faustino, A. Carnahan, M. Rehn, F. Merletti, J. Douwes, R. Firestone, L. Richiardi.',26,'PloS one, 9(12):e114925','2014-12-08T23:00:00.000Z','https://doi.org/10.1371/journal.pone.0114925'),('Determinants of follow-up participation in the Internet-based European influenza surveillance platform Influenzanet.','P. Bajardi, A. Vespignani, S. Funk, K. T. Eames, W. J. Edmunds, C. Turbelin, M. Debin, V. Colizza, R. Smallenburg, C. E. Koppeschaar, A.O. Franco, V. Faustino, A. Carnahan, M. Rehn, D. Paolotti.',27,'Journal of medical Internet research, 16(3):e78 (2014)','2014-03-09T23:00:00.000Z','https://doi.org/10.2196/jmir.3010'),('Effectiveness of 2012-2013 influenza vaccine against influenza-like illness in general population: Estimation in a French web-based cohort.','M. Debin, V. Colizza, T. Blanchon, T. Hanslik, C. Turbelin, and A. Falchi.',28,'Human vaccines & immunotherapeutics, 10(3):536-543 (2014)','2014-02-28T23:00:00.000Z','https://doi.org/10.4161/hv.27439'),('Incidence and risk factors for influenza-like-illness in the UK: online surveillance using Flusurvey.','A.J. Adler, K.T. Eames, S. Funk, W.J. Edmunds.',29,'BMC infectious diseases, 14(1):232 (2014)','2014-04-30T22:00:00.000Z','https://doi.org/10.1186/1471-2334-14-232'),('The representativeness of a European multi-center network for influenza-like-illness participatory surveillance.','P. Cantarelli, M. Debin, C. Turbelin, C. Poletto, T. Blanchon, A. Falchi, T. Hanslik, I. Bonmarin, D. Levy-Bruhl, A. Micheletti, D. Paolotti, A. Vespignani, J. Edmunds, K. Eames, R. Smallenburg, C.E. Koppeschaar, A.O. Franco, V. Faustino, A. Carnahan, M. Rehn, V. Colizza.',30,'BMC public health, 14(1):1 (2014)','2014-09-19T22:00:00.000Z','https://doi.org/10.1186/1471-2458-14-984'),('Utilizing syndromic surveillance data for estimating levels of influenza circulation.','O. Patterson-Lomba, S.P. van Noort, B.J. Cowling, J. Wallinga, M.G.M. Gomes, M. Lipsitch, E. Goldstein',31,'American journal of epidemiology, 179(11):1394-1401 (2014)','2014-05-31T22:00:00.000Z','https://doi.org/10.1093/aje/kwu061'),('Web-based participatory surveillance of infectious diseases: the influenzanet participatory surveillance experience.','D. Paolotti, A. Carnahan, V. Colizza, K. Eames, W.J. Edmunds, M.G.M. Gomes, C.E. Koppeschaar, M. Rehn, R. Smallenburg, C. Turbelin, S. van Noort and A. Vespignani.',32,'Clinical Microbiology and Infection, 20(1):17-21 (2014)','2013-12-31T23:00:00.000Z','https://doi.org/10.1111/1469-0691.12477'),('Eight years of the Great Influenza Survey to monitor influenza-like illness in Flanders.','Y. Vandendijck, C. Faes, and N. Hens.',33,'PLoS One, 8(5):e64156 (2013)','2013-05-16T22:00:00.000Z','https://doi.org/10.1371/journal.pone.0064156'),('Evaluating the feasibility and participants’ representativeness of an online nationwide surveillance system for influenza in France.','M. Debin, C. Turbelin, T. Blanchon, I. Bonmarin, A. Falchi, T. Hanslik, D. Levy-Bruhl, C. Poletto, V. Colizza, Y. Moreno.',34,'PLoS ONE, 8(9);e73675 (2013)','2013-09-10T22:00:00.000Z','https://doi.org/10.1371/journal.pone.0073675'),('Rapid assessment of influenza vaccine effectiveness: Analysis of an internet-based cohort.','K.T.D. Eames, E. Brooks-Pollock, D. Paolotti, M. Perosa, C. Gioannini and W.J. Edmunds.',35,'Epidemiology and Infection, 140(7):1309-1315 (2012)','2011-09-11T22:00:00.000Z','https://doi.org/10.1017/S0950268811001804'),('Using the Internet to estimate influenza vaccine effectiveness.','W.J. Edmunds, S. Funk.',36,'Expert review of vaccines, 11(9):1027-1029 (2012)','2012-10-31T23:00:00.000Z','https://doi.org/10.1586/erv.12.88'),('Using an online survey of healthcare-seeking behaviour to estimate the magnitude and severity of the 2009 H1N1v influenza epidemic in England.','E. Brooks-Pollock, N. Tilston, W.J. Edmunds, K.T. Eames.',37,'BMC infectious diseases, 11(1):1 (2011)','2011-03-15T23:00:00.000Z','https://doi.org/10.1186/1471-2334-11-68'),('Internet-based monitoring system for influenza-like illness: H1N1 surveillance in Italy.','D. Paolotti, C. Gioannini, V. Colizza, A. Vespignani.',38,'In Proceedings of the 3rd International ICST Conference on Electronic Healthcare for the 21st century. Casablanca, pages 13-15 (2010)','2010-09-19T22:00:00.000Z',NULL),('Internet-based surveillance of influenza-like-illness in the UK during the 2009 H1N1 influenza pandemic.','N.L. Tilston, K.T. Eames, D. Paolotti, T. Ealden, W.J. Edmunds.',39,'BMC Public Health, 10(1):650 (2010)','2010-10-26T22:00:00.000Z','https://doi.org/10.1186/1471-2458-10-650'),('Internet-based monitoring of influenza-like illness in the general population: Experience of five influenza seasons in The Netherlands.','I.H.M. Friesema, C.E. Koppeschaar, G.A. Donker, F. Dijkstra, S.P. van Noort, R. Smallenburg, W. van der Hoek, M.A.B. van der Sande.',40,'Vaccine, 27(45):6353-6357 (2009)','2009-10-22T22:00:00.000Z','https://doi.org/10.1016/j.vaccine.2009.05.042'),('Gripenet: an internet-based system to monitor influenza-like illness uniformly across Europe.','S.P. van Noort , M. Muehlen, H. Rebelo de Andrade, C.E. Koppeschaar, J.M. Lima Lourenço, M.G.M. Gomes.',41,'Euro Surveill,12(7):E5-6 (2007)','2007-06-30T22:00:00.000Z','https://doi.org/10.2807/esm.12.07.00722-en'),('Internet-based monitoring of influenza-like illness (ILI) in the general population of the Netherlands during the 2003-2004 influenza season.','R.L. Marquet, A.I.M. Bartelds, S.P. van Noort, C.E. Koppeschaar, J. Paget, F.G. Schellevis, J. van der Zee.',42,'BMC public health, 4;6:242 (2006)','2006-10-03T22:00:00.000Z','https://doi.org/10.1186/1471-2458-6-242');
/*!40000 ALTER TABLE `publication` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-23 15:38:17
