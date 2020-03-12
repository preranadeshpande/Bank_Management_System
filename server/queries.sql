CREATE DATABASE BANK;

USE BANK;
CREATE TABLE BRANCH (
    `Branch_Id` INT PRIMARY KEY AUTO_INCREMENT,
    `Branch_Name` VARCHAR(30) NOT NULL,
    `Country` VARCHAR(30) NOT NULL,
    `State` VARCHAR(30) NOT NULL,
    `City` VARCHAR(30) NOT NULL,
    `Phone` BIGINT NOT NULL
) AUTO_INCREMENT=1001001;


USE BANK;

CREATE TABLE CUSTOMER (
    `Customer_Id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `Customer_Name` VARCHAR(100) NOT NULL,
    'Address' VARCHAR(300) NOT NULL,
    `Phone` BIGINT NOT NULL,
    `Email_Id` VARCHAR(30) NOT NULL,
    `Gender` VARCHAR(10) NOT NULL,
    `Customer_Status` BOOLEAN
) AUTO_INCREMENT=209080000000;


USE BANK;

CREATE TABLE ACCOUNTS (
    `Account_No` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `Branch_Id` BIGINT NOT NULL,
    `Customer_Id` BIGINT NOT NULL,
    `Account_Type` VARCHAR(30) NOT NULL,
    `Balance` DOUBLE NOT NULL,
    `Interest_Rate` FLOAT NOT NULL,
    `Account_Status` BOOLEAN
) AUTO_INCREMENT=5078190000000;

USE BANK;

CREATE TABLE TRANSACTIONS (
    `Transaction_Id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `Account_No` BIGINT NOT NULL,
    `Date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `Amount` FLOAT NOT NULL,
    `Transaction_Type` VARCHAR(20) NOT NULL
) AUTO_INCREMENT=301001000000;

CREATE TABLE EMPLOYEE (
    Employee_Id BIGINT PRIMARY KEY AUTO_INCREMENT,
    Employee_Name VARCHAR(100) NOT NULL,
    Address VARCHAR(300) NOT NULL,
    Phone BIGINT NOT NULL,
    Email_Id VARCHAR(30) NOT NULL,
    Password VARCHAR(20) NOT NULL 
) AUTO_INCREMENT=701001000000;

INSERT COMMANDS:

CUSTOMER TABLE:

INSERT INTO CUSTOMER VALUES(
    NULL,'John Smith','Kochi, Kerala',9763412098,'JohnSmith@gmail.com','Male',0
);
INSERT INTO CUSTOMER VALUES(
    NULL,'Antara Kaul','Pune, Maharashtra',9798412098,'AntaraKaul@gmail.com','Female',1
);
INSERT INTO CUSTOMER VALUES( NULL,'William Smith','Chennai, Tamil Nadu',7798412098,'WilliamSmith@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES(NULL,'Santhosh Kumar','Bangalore, Karnataka',9798712098,'SanthoshKumar@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES( NULL,'Adam Scott','Bhopal, Madhya Pradesh',7798008098,'AdamScott@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES( NULL,'Nikitha Sharma','Vijayawada, Andra Pradesh',7798412835,'NikithaSharma@gmail.com','Female',1);

INSERT INTO CUSTOMER VALUES( NULL,'Raghav Dir','Bhoapl, Madhya Pradesh',8898412098,'RaghavDir@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES(NULL,'Naina Agarawal','Mysore, Karnataka',7698712098,'NainaAgarwal@gmail.com','Female',1);
INSERT INTO CUSTOMER VALUES( NULL,'Basant Bhatt','Hyderabad, Telangana',9834108098,'BasantBhatt@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES( NULL,'Asmita Sood','Mathura, Uttar Pradesh',9341278564,'AsmitaSood@gmail.com','Female',1);


INSERT INTO CUSTOMER VALUES( NULL,'Ayesha Kaduskar','Ahmedabad, Gujarat',8898490898,'AyeshaK@gmail.com','Female',1);
INSERT INTO CUSTOMER VALUES(NULL,'Ashi Singh','Ahmedabad, Gujarat',9731252097,'AshiSingh@gmail.com','Female',1);
INSERT INTO CUSTOMER VALUES( NULL,'Mallika Singh','Mathura, Uttar Pradesh',9432764809,'MallikaSingh@gmail.com','Female',1);
INSERT INTO CUSTOMER VALUES( NULL,'Sanjay Chaudary','Vijayawada, Andra Pradesh',9845234781,'SanjayChaudary@gmail.com','Male',1);


INSERT INTO CUSTOMER VALUES( NULL,'Aruna Mary','Mysore, Krnataka',7095427869,'ArunaMary@gmail.com','Female',0);
INSERT INTO CUSTOMER VALUES(NULL,'Aditya Sharma','Mysore, Karnataka',8976409356,'AdityaSharma@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES( NULL,'Vivek Desai','Ahmedabad, Gujarat',8965666570,'VivekDesai@gmail.com','Male',0);
INSERT INTO CUSTOMER VALUES( NULL,'Siddarth Nigam','Chennai, Tamil Nadu',9867530933,'SiddarthNigam@gmail.com','Male',1);
INSERT INTO CUSTOMER VALUES( NULL,'Preeti Verma','Mumbai, Maharashtra',9543209112,'PreetiVerma@gmail.com','Female',1);
INSERT INTO CUSTOMER VALUES(NULL,'Pooja Sharma','Pune, Maharashtra',7777092134,'PoojaSharma@gmail.com','Female',0);