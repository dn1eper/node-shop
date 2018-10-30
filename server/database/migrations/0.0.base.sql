DROP DATABASE IF EXISTS node_shop ;
CREATE DATABASE node_shop;
USE node_shop;

DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS booking_items;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS item_tag;
DROP TABLE IF EXISTS item_image;
DROP TABLE IF EXISTS item;

CREATE TABLE item (
	   item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   title VARCHAR(50) NOT NULL DEFAULT 'Untitled',
	   htmlText TEXT,
	   likes INT UNSIGNED NOT NULL DEFAULT 0,
       price INT NOT NULL
) ENGINE=INNODB;

CREATE TABLE item_image (
	   url TEXT NOT NULL,
	   item_id INT UNSIGNED NOT NULL,
	   FOREIGN KEY (item_id)
	   		REFERENCES item(item_id)
) ENGINE=INNODB;

CREATE TABLE item_tag (
	   name VARCHAR(30) NOT NULL,
	   item_id INT UNSIGNED NOT NULL,
	   FOREIGN KEY (item_id)
	   		REFERENCES item(item_id)
) ENGINE=INNODB;

CREATE TABLE admin (
	   admin_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   login VARCHAR(50) NOT NULL,
	   pass_hash TEXT
) ENGINE=INNODB;

CREATE TABLE booking (
	   booking_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	   user_id INT UNSIGNED NOT NULL,
       booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id)
	   		REFERENCES admin(admin_id)
) ENGINE=INNODB;

CREATE TABLE booking_items (
	   booking_id INT UNSIGNED NOT NULL,
	   item_id INT UNSIGNED NOT NULL,
       amount INT UNSIGNED NOT NULL DEFAULT 1,
       FOREIGN KEY (booking_id)
	   		REFERENCES booking(booking_id),
       FOREIGN KEY (item_id)
	   		REFERENCES item(item_id)
) ENGINE=INNODB;
