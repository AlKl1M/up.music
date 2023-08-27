<?php

namespace Up\Music\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\SystemException;
use Up\Music\Config\Config;
use Up\Music\Model\Music\MusicTable;

class MusicRepository
{

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
    public static function isTrackOwner(int $musicId, int $userId): bool
    {
        $music = MusicTable::query()->setSelect(['USER.ID'])->where('ID', $musicId)->fetchObject();

		return $userId === $music['USER']['ID'];
    }

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getPage(int $page, string $nickname, string $genre, string $searchString): array
	{
		$itemPerPage = Config::COUNT_ELEMENTS_ON_PAGE;
		$offset = ($page - 1) * $itemPerPage;

		return self::getMusicQuery($nickname, $genre, $searchString)
				   		->setOffset($offset)
				   		->setLimit(Config::COUNT_ELEMENTS_ON_PAGE)
				   		->setOrder(['CREATE_DATE'=>'DESC'])
						->fetchAll();
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function calculateCountPosts(
		?string $nickname,
		?string $genre,
		?string $searchString
	): int
	{
		return self::getMusicQuery($nickname, $genre, $searchString)
				   ->queryCountTotal();
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getMusicById(int $id): ?array
	{
		return self::getMusicQuery()->setFilter(['ID'=>$id])->fetchAll();
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function isMusicExist(?string $nickname="", ?string $genre=""): bool
	{
		$music = self::getMusicQuery($nickname, $genre)->setLimit(1)->fetchObject();
		if ($music)
		{
			return true;
		}
		return false;
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getMusicQuery(?string $nickname="", ?string $genre="", ?string $searchString=""): Query
	{
		$musicQuery = (new Query(MusicTable::getEntity()))
			->setSelect(['*',
						 'USER.ID',
						 'USER.LOGIN',
						 'USER.NAME',
						 'USER.PERSONAL_PHOTO',
						 'GENRE',
						 'MUSIC_FILE.ID',
						 'MUSIC_FILE.FILE_NAME',
						 'MUSIC_FILE.SUBDIR',
						 'IMAGE_FILE.ID',
						 'IMAGE_FILE.FILE_NAME',
						 'IMAGE_FILE.SUBDIR',
						]
			);

		if(!empty($nickname))
		{
			$musicQuery->setFilter(['USER.LOGIN'=>$nickname]);

			if(!empty($genre))
			{
				$musicQuery->addFilter('GENRE.CODE',$genre);
			}
		}

		else if (!empty($genre))
		{
			$musicQuery->setFilter(['GENRE.CODE'=>$genre]);
		}

		if(!empty($searchString))
		{
			$likeQuery = "%".$searchString."%";
			$musicQuery->whereLike('TITLE', $likeQuery);
		}

		return $musicQuery;
	}
}