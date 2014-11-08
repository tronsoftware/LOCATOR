
--
-- Dumping routines for database 'Locator'
--
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetGroup`(IN `_account` CHAR(50))
BEGIN
SELECT CONCAT(  '{ "grupID": "', CAST( groupID AS CHAR ) ,  '"}' ) json
FROM  `DeviceGroup` 
WHERE  `accountID` =  _account;
END ;;

CREATE DEFINER=`root`@`localhost` PROCEDURE `prcGetGroupList`(IN `_account` CHAR(50), IN `_user` CHAR(50))
BEGIN
SELECT CONCAT(  '{ "grupID": "', CAST( groupID AS CHAR ) ,  '"}' ) json
FROM  `GroupList` 
WHERE  `accountID` =  _account 
AND  `userID` =  _user;
END ;;
