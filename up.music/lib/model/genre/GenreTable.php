<?php

namespace Up\Music\Model\Genre;

use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Event;
use Bitrix\Main\ORM\EventResult;
use Bitrix\Main\SystemException;

class GenreTable extends DataManager
{

	public static function getTableName(): string
	{
		return 'up_music_genre';
	}

	/**
	 * @throws SystemException
	 */
	public static function getMap(): array
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
				]
			),
			new StringField(
				'CODE',
				[
					'unique' => true,
					'required' => true,
					'validation' => function(){
						return array(
							new LengthValidator(1,100),
						);
					}
				]
			),
			new StringField(
				'NAME',
				[
					'required' => true,
					'validation' => function(){
						return array(
							new LengthValidator(1,100),
						);
					}
				]
			)
		];
	}

	/**
	 * @throws ObjectPropertyException
	 */
	public static function onBeforeAdd(Event $event): EventResult
	{
		global $DB;
		$result = new EventResult();
		$data = $event->getParameter("fields");
		if (isset($data["NAME"], $data["CODE"]))
		{
			$validatedName = $DB->ForSql($data['NAME']);
			$validatedCode = $DB->ForSql($data['CODE']);

			$result->modifyFields(
				[
					'NAME'=>$validatedName,
					'CODE'=>$validatedCode,
				]
			);

			return $result;
		}

		throw new ObjectPropertyException("Failed to validate data");
	}
}