<?php

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;

class MusicCreateComponent extends CBitrixComponent
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function executeComponent()
    {
        $this->fetchGenreList();
        $this->includeComponentTemplate();
    }

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	protected function fetchGenreList(): void
    {
        $genre = \Up\Music\Repository\GenreRepository::getGenreQuery()
														  ->setLimit(100)
														  ->fetchCollection();
        $this->arResult['GENRES'] = $genre;
    }
}