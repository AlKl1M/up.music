<?php

namespace Up\Music\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Entity\Query;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Music\Model\Genre\GenreTable;

class GenreRepository
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getAll(): array
	{
		return self::getGenreQuery()->setLimit(100)->fetchAll();
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getGenreQuery(): Query
	{
		$genreQuery = (new \Bitrix\Main\ORM\Query\Query(GenreTable::getEntity()))
			->setSelect(['ID', 'NAME', 'CODE']);

		return $genreQuery;
	}
}