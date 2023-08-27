<?php
namespace Up\Music\Controller;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Error;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Music\Config\Config;
use Up\Music\Repository\MusicRepository;
use Up\Music\Repository\UserRepository;
use Up\Music\Services\ValidateService;

class Pagination extends Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getPaginationForMusicAction(
		int $page = 1,
		string $nickname="",
		string $genre="",
		string $searchString=""
	): ?array
	{
		if(!ValidateService::stringIsValid($nickname)
			|| !ValidateService::stringIsValid($genre)
			||!ValidateService::stringIsValid($searchString)
			||!ValidateService::idIsValid($page)
		)
		{
			$this->addError(new Error('[PaginationController]: Validate data is fail', 'invalid_data'));
			return null;
		}

		$availableCount = MusicRepository::getMusicQuery($nickname, $genre, $searchString)
										 ->queryCountTotal();

		$lastPage = (int)ceil($availableCount / Config::COUNT_ELEMENTS_ON_PAGE);

		$pageList = $this->getPagesForPagination($page, $lastPage);

		return [
			'lastPage' => $lastPage,
			'pageList'=> $pageList,
		];
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getPaginationForUserAction(
		int $page = 1,
		string $searchString=""
	): ?array
	{
		if(!ValidateService::stringIsValid($searchString)
			||!ValidateService::idIsValid($page)
		)
		{
			$this->addError(new Error('[PaginationController]: Validate data is fail', 'invalid_data'));
			return null;
		}

		$availableCount = UserRepository::getUserQuery(null, $searchString)
										 ->queryCountTotal();

		$lastPage = (int)ceil($availableCount / Config::COUNT_ELEMENTS_ON_PAGE);

		$pageList = $this->getPagesForPagination($page, $lastPage);

		return [
			'lastPage' => $lastPage,
			'pageList'=> $pageList,
		];
	}

	private function getPagesForPagination(int $currentPage, int $lastPage): ?array
	{
		$pages = [];

		if ($currentPage > $lastPage || $currentPage < 1)
		{
			return null;
		}

		$pages[] = $currentPage;

		$indentInOnePart = intdiv(Config::COUNT_PAGES_ON_PAGINATION, 2);

		$leftIndent = 0;
		$rightIndent = 0;
		for ($indent = 1; $indent <= Config::COUNT_PAGES_ON_PAGINATION - 1; ++$indent)
		{
			$pageLeft = $currentPage - $indent;
			$pageRight = $currentPage + $indent;
			if ($pageLeft >= 1)
			{
				$pages[] = $pageLeft;
				$leftIndent = $indent;
			}
			if ($pageRight <= $lastPage)
			{
				$pages[] = $pageRight;
				$rightIndent = $indent;
			}
		}

		$checkLeftPart = false;
		$checkRightPart = false;
		if ($leftIndent >= $indentInOnePart)
		{
			$checkLeftPart = true;
		}
		if ($rightIndent >= $indentInOnePart)
		{
			$checkRightPart = true;
		}

		sort($pages);

		if ($checkLeftPart && $checkRightPart)
		{
			$pages = array_slice($pages, $leftIndent - $indentInOnePart);

			if ($rightIndent - $indentInOnePart !== 0)
			{
				array_splice($pages, -($rightIndent - $indentInOnePart));
			}
		}

		return $pages;
	}
}