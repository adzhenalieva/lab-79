CREATE SCHEMA `lab` DEFAULT CHARACTER SET utf8;

USE `lab`;

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `places` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `place` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    PRIMARY KEY (`id`));

CREATE TABLE `items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
    `place_id` INT NOT NULL,
  `item` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image`  VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `category_id_idx` (`category_id` ASC),
  INDEX `place_id_idx` (`place_id` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `places` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);


INSERT INTO `categories` (`category`, `description`)
VALUES ('furniture',  'just furniture'), ('computer equipment', 'computer details'), ('household appliances', 'appliances');

INSERT INTO `places` (`place`, `description`)
VALUES ('classroom 102', 'some description'),('computer class', 'some description'), ('teachers room', 'some description');

INSERT INTO `items` (`id`, `item`, `description`, `category_id`, `place_id`)
VALUES (1, 'laptop', 'a personal laptop', 3, 3), (2, 'table', 'round table', 1, 2), (3, 'chair', 'wooden chair', 1, 1);