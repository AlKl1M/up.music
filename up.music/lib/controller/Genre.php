<?php
namespace Up\Music\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Error;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Music\Repository\GenreRepository;

class Genre extends Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getListAction(): ?array
	{
		$genreList = GenreRepository::getAll();

		if (empty($genreList))
		{
			$this->addError(new Error('[GenreController]: No items genre found', 'genre_list_empty'));
			return null;
		}

		return [
			'genreList' => $genreList,
		];
	}
}