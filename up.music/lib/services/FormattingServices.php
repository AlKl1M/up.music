<?php

namespace Up\Music\Services;

use Up\Music\Config\Config;

class FormattingServices
{
	public static function decreaseDescription(string $description, int $len = 20): string
	{
		if (strlen($description) > $len)
		{
			$pos = strrpos(mb_strcut($description, 0, $len), " ", 0);
			$description = mb_strcut($description, 0, $pos) . "..";
		}
		return $description;
	}
	
	public static function createAbsoluteFilePath(string $subDir, string $fileName): string
	{
		return Config::FILES_ROOT_DIRECTORY.$subDir."/".$fileName;
	}
}