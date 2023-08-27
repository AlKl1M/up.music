<?php
namespace Up\Music\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Context;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Error;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use CFile;
use Up\Music\Config\Config;
use Up\Music\Repository\MusicRepository;
use Up\Music\Repository\UserRepository;
use Up\Music\Services\FormattingServices;
use Up\Music\Services\ImageService;
use Up\Music\Services\ValidateService;

class User extends Controller
{
	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function imgUpdateAction()
    {
        global $USER;

        $request = Context::getCurrent()->getRequest();
        $image = $request->getFile('photo');
        $nickName = $request->get('nickname');
        if ($nickName === $USER->GetLogin())
        {
            CFile::ResizeImage($image, ["width" => 200, "height" => 200], BX_RESIZE_IMAGE_EXACT);
            $avatarId = CFile::SaveFile($image, '/resources/');
            $imageInfo = CFile::GetFileArray($avatarId);
            $image_path = $_SERVER['DOCUMENT_ROOT'] . '/upload' . $imageInfo['SUBDIR'] . '/' . $imageInfo['FILE_NAME'];
            if (CFile::IsImage($imageInfo['ORIGINAL_NAME']) && filesize($image_path) !== 0)
            {
                UserRepository::updateAvatar($avatarId, $nickName);
            }
            else
            {
                CFile::Delete($avatarId);
            }
        }
    }

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getListAction(int $page = 1, ?string $nickname = "", ?string $searchString=""): ?array
	{
		if(!ValidateService::stringIsValid($nickname)
			|| !ValidateService::stringIsValid($searchString)
			|| !ValidateService::idIsValid($page)
		)
		{
			$this->addError(new Error('Invalid data', 'invalid_data'));
			return null;
		}

		$userList = UserRepository::getPage($page, $nickname, $searchString);

		if (empty($userList))
		{
			$this->addError(new Error('[UserController]: Users list is empty', 'user_list_empty'));
			return null;
		}

		foreach ($userList as $key => $user)
		{
			$userList[$key]["IMAGE_PATH"]=ImageService::getAbsolutePath($user["PERSONAL_PHOTO"]);
		}

		return [
			'userList' => $userList,
		];
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getCountPostsAction(string $nickname): ?array
	{
		if (!empty($nickname)&&!preg_match('/^\w+$/', $nickname))
		{
			$this->addError(new Error('[UserController]: Validate nickname is fail', 'invalid_nickname'));
			return null;
		}

		$countPosts = MusicRepository::calculateCountPosts($nickname, null, null);

		return [
			'countPosts' => $countPosts,
		];
	}

	/**
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getImageAbsolutePathAction(string $nickname): ?array
	{
		if (!empty($nickname)&&!preg_match('/^\w+$/', $nickname))
		{
			$this->addError(new Error('[UserController]: Nickname contains invalid characters', 'invalid_nickname'));
			return null;
		}

		$userList = UserRepository::getPage(1, $nickname);
		$fileId = $userList[0]["PERSONAL_PHOTO"];

		if($fileId === null ||$fileId<=0)
		{
			$userImage =  Config::FILES_ROOT_DIRECTORY."/resources/image/baseCollection/user.png";
			return [
				'userImage' => $userImage,
			];
		}

		$image = \CFile::GetByID($fileId)->arResult[0];

		if (empty($image))
		{
			$userImage= Config::FILES_ROOT_DIRECTORY."/resources/image/baseCollection/user.png";
			return [
				'userImage' => $userImage,
			];
		}

		$userImage=FormattingServices::createAbsoluteFilePath($image["SUBDIR"], $image["FILE_NAME"]);

		return [
			'userImage' => $userImage,
		];
	}

	public function deleteUserByIdAction(int $userId): bool
	{
		Global $USER;
		if ((int)$USER->GetID()!==$userId)
		{
			$this->addError(new Error('[UserController]: Only owner can delete account', 'access_error'));
			return false;
		}

		\CUser::Delete($userId);
		return true;
	}
}