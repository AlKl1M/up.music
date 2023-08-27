<?php

namespace Up\Music\Model\Music;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\FileTable;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Event;
use Bitrix\Main\ORM\EventResult;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\DateTime;
use Up\Music\Model\Genre\GenreTable;
use Up\Music\Model\User\UserTable;

class MusicTable extends DataManager
{

	public static function getTableName()
	{
		return 'up_music_music';
	}

	/**
	 * @throws ArgumentException
	 * @throws SystemException
	 */
	public static function getMap()
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
				'TITLE',
				[
					'required' => true,
					'validation' => function(){
						return array(
							new LengthValidator(1,100),
						);
					}
				]
			),
			new StringField(
				'DESCRIPTION',
				[
					'validation' => function(){
						return array(
							new LengthValidator(null,1000),
						);
					}
				]
			),
			new IntegerField(
				'IMAGE_ID'
			),
			new IntegerField(
				'MUSIC_ID',
				[
					'required' => true,
				]
			),
			new DatetimeField(
				'CREATE_DATE', [
								 'required' => true,
								 'default_value' => function()
								 {
									 return new DateTime();
								 },
							 ]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
				]
			),
			new IntegerField(
				'GENRE_ID',
				[
					'required' => true,
				]
			),
			(new Reference(
				'USER',
				UserTable::class,
				Join::on('this.USER_ID', 'ref.ID')
			))
				->configureJoinType('inner'),
			(new Reference(
				'GENRE',
				GenreTable::class,
				Join::on('this.GENRE_ID', 'ref.ID')
			))
				->configureJoinType('inner'),
			(new Reference(
				'MUSIC_FILE',
				FileTable::class,
				Join::on('this.MUSIC_ID', 'ref.ID')
			))
				->configureJoinType('inner'),
			(new Reference(
				'IMAGE_FILE',
				FileTable::class,
				Join::on('this.IMAGE_ID', 'ref.ID')
			))
				->configureJoinType('inner'),
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
		if (isset($data["TITLE"], $data["DESCRIPTION"]))
		{
			$validatedTitle = $DB->ForSql($data['TITLE']);
			$validatedDescription = $DB->ForSql($data['DESCRIPTION']);

			$result->modifyFields(
				[
					'TITLE'=>$validatedTitle,
					'DESCRIPTION'=>$validatedDescription,
				]
			);

			return $result;
		}

		throw new ObjectPropertyException("Failed to validate data");
	}
}