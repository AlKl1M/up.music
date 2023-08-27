<?php

namespace Up\Music\Model\Music;

use Bitrix\Main\Type\DateTime;

class Music
{
	public string $title;
	public string $description;
	public int $musicId;
	public int $userId;
	public int $genreId;
	public ?int $imageId;
	public ?int $id;
	public ?DateTime $createdDate;

	public function __construct(string $title, string $description, int $musicId, int $genreId, int $userId, ?int $imageId=null, ?int $id=null, ?DateTime $createdDate=null)
	{
		$this->title = $title;
		$this->description = $description;
		$this->imageId=$imageId;
		$this->musicId=$musicId;
		$this->genreId=$genreId;
		$this->userId=$userId;
		$this->id = $id;
		$this->createdDate = $createdDate;
	}
}