<?php

namespace Up\Music\Services;

use http\Exception\InvalidArgumentException;

class ValidateService
{
	public static function stringIsValid(?string $string, int $maxLen = 100): bool
	{
		if (empty($string))
		{
			return true;
		}

		$stringIsValidByLength = (strlen($string) < $maxLen);

		if (!$stringIsValidByLength)
		{
			throw new InvalidArgumentException(
				"String is longer than allowed");
		}

		return true;
	}


	public static function idIsValid(?int $number): bool
	{
		if ($number === null)
		{
			return true;
		}

		if ($number <= 0)
		{
			throw new InvalidArgumentException(
				"Should be greater than 0");
		}
		return true;
	}

}