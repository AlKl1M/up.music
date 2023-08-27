<?php

use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;

function __projectorMigrate(int $nextVersion, callable $callback): void
{
	global $DB;
	$moduleId = 'up.music';

	if (!ModuleManager::isModuleInstalled($moduleId))
	{
		return;
	}

	$currentVersion = (int)Option::get($moduleId, '~database_schema_version', 0);

	if ($currentVersion < $nextVersion)
	{
		include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/update_class.php');
		$updater = new \CUpdater();
		$updater->Init('', 'mysql', '', '', $moduleId, 'DB');

		$callback($updater, $DB, 'mysql');
		Option::set($moduleId, '~database_schema_version', $nextVersion);
	}
}

__projectorMigrate(2, static function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_music_genre'))
	{
		$DB->query('CREATE TABLE IF NOT EXISTS up_music_genre
		(
			ID INT NOT NULL auto_increment,
			NAME VARCHAR (100) NOT NULL,
			CODE VARCHAR(100) UNIQUE NOT NULL,
			PRIMARY KEY(ID)
		);');
	}

	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_music_music'))
	{
		$DB->query('CREATE TABLE IF NOT EXISTS up_music_music
		(
			ID INT NOT NULL auto_increment,
			TITLE VARCHAR (100) NOT NULL,
			DESCRIPTION VARCHAR(1000),
			IMAGE_ID INT,
			MUSIC_ID INT NOT NULL,
			CREATE_DATE DATETIME NOT NULL,
			AUDITIONS INT DEFAULT 0 NOT NULL,
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
		);');
	}
});

__projectorMigrate(3, static function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_music_likes'))
	{
		$DB->query('CREATE TABLE IF NOT EXISTS up_music_likes
		(
			ID INT NOT NULL auto_increment,
			USER_ID INT NOT NULL,
			MUSIC_ID INT NOT NULL,
			CREATE_DATE DATETIME NOT NULL,
			PRIMARY KEY(ID)
		);');
	}
});

__projectorMigrate(4, static function($updater, $DB)
{
	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_music_likes'))
	{
		$DB->query('DROP TABLE IF EXISTS up_music_likes;');
	}

	if ($updater->CanUpdateDatabase() && !$updater->TableExists('up_music_music'))
	{
		$DB->query('ALTER TABLE up_music_music DROP COLUMN AUDITIONS;');
	}
});