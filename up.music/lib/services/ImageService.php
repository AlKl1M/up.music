<?php

namespace Up\Music\Services;

use Bitrix\Main\ObjectPropertyException;
use Up\Music\Config\Config;

class ImageService
{
	public static function getAbsolutePath(?int $fileId): string
	{
		if($fileId === null ||$fileId<=0)
		{
			return Config::FILES_ROOT_DIRECTORY."/resources/image/baseCollection/user.png";
		}

		$image = \CFile::GetByID($fileId)->arResult[0];

		if (empty($image))
		{
			return Config::FILES_ROOT_DIRECTORY."/resources/image/baseCollection/user.png";
		}

		return FormattingServices::createAbsoluteFilePath($image["SUBDIR"], $image["FILE_NAME"]);
	}
}