CREATE TABLE IF NOT EXISTS up_music_genre
(
	ID INT NOT NULL auto_increment,
	NAME VARCHAR (100) NOT NULL,
	CODE VARCHAR(100) UNIQUE NOT NULL,
	PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS up_music_music
(
	ID INT NOT NULL auto_increment,
	TITLE VARCHAR (100) NOT NULL,
	DESCRIPTION VARCHAR(1000),
	IMAGE_ID INT,
	MUSIC_ID INT NOT NULL,
	CREATE_DATE DATETIME NOT NULL,
	USER_ID INT NOT NULL,
	GENRE_ID INT NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY FK_USER (USER_ID)
		REFERENCES b_user(ID)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY FK_GENRE (GENRE_ID)
		REFERENCES up_music_genre(ID)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY FK_MUSIC_FILE (MUSIC_ID)
		REFERENCES b_file(ID)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY FK_IMAGE_FILE (IMAGE_ID)
		REFERENCES b_file(ID)
		ON UPDATE CASCADE
		ON DELETE SET NULL
);