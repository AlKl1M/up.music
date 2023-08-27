<?php
namespace Up\Music\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine\Controller;
use Bitrix\Main\Error;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use CFile;
use Exception;
use Up\Music\Model\Music\MusicTable;
use Up\Music\Repository\MusicRepository;
use Up\Music\Services\ImageService;
use Up\Music\Services\ValidateService;

class Music extends Controller
{

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getListAction(
		int $page = 1,
		?string $nickname="",
		?string $genre="",
		?string $searchString=""
	): ?array
	{
		if(!ValidateService::stringIsValid($nickname)
			|| !ValidateService::stringIsValid($genre)
			|| !ValidateService::stringIsValid($searchString)
			|| !ValidateService::idIsValid($page)
		)
		{
			$this->addError(new Error('[MusicController]: Validate date is fail', 'validate_fail'));
			return null;
		}

		$musicList = MusicRepository::getPage($page, $nickname, $genre, $searchString);

		if (empty($musicList))
		{
			$musicExist = MusicRepository::isMusicExist($nickname, $genre);

			if ($musicExist)
			{
				$this->addError(new Error('[MusicController]: Invalid page', 'invalid_page'));
				return null;
			}
		}

		return [
			'musicList' => $musicList,
		];
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getMusicAction(int $id): ?array
	{
		if(!ValidateService::idIsValid($id))
		{
			$this->addError(new Error('[MusicController]: Validate id is fail', 'invalid_music_id'));
			return null;
		}

		$music = MusicRepository::getMusicById($id);

		if (empty($music))
		{
			$this->addError(new Error('[MusicController]: Music is empty', 'music_empty'));
			return null;
		}

		$music[0]["USER_IMAGE_PATH"]=ImageService::getAbsolutePath(
			$music[0]["UP_MUSIC_MODEL_MUSIC_MUSIC_USER_PERSONAL_PHOTO"]
		);

		return [
			'music' => $music,
		];
	}

	public function deleteMusicByIdAction(int $musicId): array
	{
		try
		{
			GLOBAL $USER;
			$isTrackOwner = MusicRepository::isTrackOwner($musicId, (int)$USER->GetID());

			if (!$isTrackOwner)
			{
				$this->addError(new Error('[MusicController]: Only owner can delete track', 'access_error'));
				return ["status" => false];
			}
            $music = MusicRepository::getMusicById($musicId);
            $imageId = $music[0]['UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_ID'];
            $musicId = $music[0]['UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_ID'];
			$result = MusicTable::delete($musicId);
            CFile::Delete($imageId);
            CFile::Delete($musicId);

			if ($result->isSuccess())
			{
				return ["status" => true, "name" => $music[0]['TITLE']];
			}

			$this->addError(new Error('[MusicController]: Track is not delete', 'database_error'));
			return ["status" => false];

		}
		catch (Exception $e){
			$this->addError(new Error('[MusicController]: Track is not delete', 'database_error'));
			return ["status" => false];
		}
	}

	public static function createMusic(\Up\Music\Model\Music\Music $music): void
	{
		try
		{
			$result = MusicTable::add([
										  'TITLE' => $music->title,
										  'DESCRIPTION' => $music->description,
										  'MUSIC_ID' => $music->musicId,
										  'IMAGE_ID' => $music->imageId,
										  'USER_ID' => $music->userId,
										  'GENRE_ID' => $music->genreId,
									  ]);

			if ($result->isSuccess())
			{
				LocalRedirect('/create/success/');
				return;
			}
			LocalRedirect('/create/unsuccessful/');

		}
		catch (Exception $e)
		{
			LocalRedirect('/create/unsuccessful/');
		}
	}
}