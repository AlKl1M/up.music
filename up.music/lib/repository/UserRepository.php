<?php

namespace Up\Music\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ORM\Query\Query;
use Bitrix\Main\SystemException;
use Up\Music\Config\Config;
use Up\Music\Model\User\UserTable;

class UserRepository
{
	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 * @throws \Exception
	 */
	public static function updateAvatar(int $imageId, string $nickname): int
	{
        $user = self::getUserQuery($nickname)->fetchObject();
        $id = (int)$user['ID'];
        UserTable::update($id, array('PERSONAL_PHOTO' => $imageId));

        return $id;
    }
	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPage(int $page, ?string $nickname="", ?string $searchString=""): array
	{
		$itemPerPage = Config::COUNT_ELEMENTS_ON_PAGE;
		$offset = ($page - 1) * $itemPerPage;

		return self::getUserQuery($nickname, $searchString)
				   		->setOffset($offset)
				   		->setLimit(Config::COUNT_ELEMENTS_ON_PAGE)
						->fetchAll();
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getUserQuery(?string $nickname="", ?string $searchString=""): Query
	{
		$userQuery = (new Query(UserTable::getEntity()))->setSelect(['ID', 'LOGIN', 'NAME', 'PERSONAL_PHOTO']);

		if(!empty($nickname))
		{
			$userQuery->setFilter(['LOGIN'=>$nickname]);
		}

		if(!empty($searchString))
		{
			$likeQuery = "%".$searchString."%";
			$userQuery->whereLike('NAME', $likeQuery);
		}

		return $userQuery;
	}
}