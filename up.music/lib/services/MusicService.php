<?php

namespace Up\Music\Services;

use CFile;
use CUser;
use Up\Music\Model\Music\Music;

/**
 * @var CUser $USER
 */

class MusicService
{
    public static function isMusic(string $fileName): bool
    {
        $pattern = '/\.(mp3|wav|ogg|)$/i';
        return preg_match($pattern, $fileName) === 1;
    }

    public static function saveTrack(array $imageFile, array $musicFile, string $title, string $description, int $genreId, int $userId): void
    {
        if (!ValidateService::stringIsValid($title) || !ValidateService::stringIsValid($description, 1000))
        {
			LocalRedirect('/create/unsuccessful/');
        }

        CFile::ResizeImage($imageFile, ["width" => 200, "height" => 200], BX_RESIZE_IMAGE_EXACT);
        $imageId = CFile::SaveFile($imageFile, '/resources/image/');
        $musicId = CFile::SaveFile($musicFile, '/resources/music/');
        $imageInfo = CFile::GetFileArray($imageId);
        $musicInfo = CFile::GetFileArray($musicId);
        $image_path = $_SERVER['DOCUMENT_ROOT'] . '/upload' . $imageInfo['SUBDIR'] . '/' . $imageInfo['FILE_NAME'];
        $music_path = $_SERVER['DOCUMENT_ROOT'] . '/upload' . $musicInfo['SUBDIR'] . '/' . $musicInfo['FILE_NAME'];
        $image_size = filesize($image_path);
        $music_size = filesize($music_path);

        // Проверяем не пустой ли файл
        if ($image_size === 0 or $music_size === 0)
        {
            CFile::Delete($imageInfo['ID']);
            CFile::Delete($musicInfo['ID']);
			LocalRedirect('/create/unsuccessful/');
        }

        if (CFile::IsImage($imageInfo['ORIGINAL_NAME']) && self::isMusic($musicInfo['ORIGINAL_NAME']) && $title !== "" && $description !== "")
        {
            $imageId = $imageInfo['ID'];
            $musicId = $musicInfo['ID'];
            $newMusic = new Music($title, $description, $musicId, $genreId, $userId, $imageId);
         	 \Up\Music\Controller\Music::createMusic($newMusic);
        }
		else
		{
            CFile::Delete($imageInfo['ID']);
            CFile::Delete($musicInfo['ID']);
			LocalRedirect('/create/unsuccessful/');
        }
    }
}