<?php
namespace Up\Music\Model\User;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\BooleanField,
	Bitrix\Main\ORM\Fields\DateField,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\TextField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;

Loc::loadMessages(__FILE__);

/**
 * Class UserTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TIMESTAMP_X datetime optional
 * <li> LOGIN string(50) mandatory
 * <li> PASSWORD string(255) mandatory
 * <li> CHECKWORD string(255) optional
 * <li> ACTIVE bool ('N', 'Y') optional default 'Y'
 * <li> NAME string(50) optional
 * <li> LAST_NAME string(50) optional
 * <li> EMAIL string(255) optional
 * <li> LAST_LOGIN datetime optional
 * <li> DATE_REGISTER datetime mandatory
 * <li> LID string(2) optional
 * <li> PERSONAL_PROFESSION string(255) optional
 * <li> PERSONAL_WWW string(255) optional
 * <li> PERSONAL_ICQ string(255) optional
 * <li> PERSONAL_GENDER string(1) optional
 * <li> PERSONAL_BIRTHDATE string(50) optional
 * <li> PERSONAL_PHOTO int optional
 * <li> PERSONAL_PHONE string(255) optional
 * <li> PERSONAL_FAX string(255) optional
 * <li> PERSONAL_MOBILE string(255) optional
 * <li> PERSONAL_PAGER string(255) optional
 * <li> PERSONAL_STREET text optional
 * <li> PERSONAL_MAILBOX string(255) optional
 * <li> PERSONAL_CITY string(255) optional
 * <li> PERSONAL_STATE string(255) optional
 * <li> PERSONAL_ZIP string(255) optional
 * <li> PERSONAL_COUNTRY string(255) optional
 * <li> PERSONAL_NOTES text optional
 * <li> WORK_COMPANY string(255) optional
 * <li> WORK_DEPARTMENT string(255) optional
 * <li> WORK_POSITION string(255) optional
 * <li> WORK_WWW string(255) optional
 * <li> WORK_PHONE string(255) optional
 * <li> WORK_FAX string(255) optional
 * <li> WORK_PAGER string(255) optional
 * <li> WORK_STREET text optional
 * <li> WORK_MAILBOX string(255) optional
 * <li> WORK_CITY string(255) optional
 * <li> WORK_STATE string(255) optional
 * <li> WORK_ZIP string(255) optional
 * <li> WORK_COUNTRY string(255) optional
 * <li> WORK_PROFILE text optional
 * <li> WORK_LOGO int optional
 * <li> WORK_NOTES text optional
 * <li> ADMIN_NOTES text optional
 * <li> STORED_HASH string(32) optional
 * <li> XML_ID string(255) optional
 * <li> PERSONAL_BIRTHDAY date optional
 * <li> EXTERNAL_AUTH_ID string(255) optional
 * <li> CHECKWORD_TIME datetime optional
 * <li> SECOND_NAME string(50) optional
 * <li> CONFIRM_CODE string(8) optional
 * <li> LOGIN_ATTEMPTS int optional
 * <li> LAST_ACTIVITY_DATE datetime optional
 * <li> AUTO_TIME_ZONE string(1) optional
 * <li> TIME_ZONE string(50) optional
 * <li> TIME_ZONE_OFFSET int optional
 * <li> TITLE string(255) optional
 * <li> BX_USER_ID string(32) optional
 * <li> LANGUAGE_ID string(2) optional
 * <li> BLOCKED bool ('N', 'Y') optional default 'N'
 * <li> PASSWORD_EXPIRED bool ('N', 'Y') optional default 'N'
 * </ul>
 *
 * @package Bitrix\User
 **/

class UserTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'b_user';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
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
			new DatetimeField(
				'TIMESTAMP_X',
				[

				]
			),
			new StringField(
				'LOGIN',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateLogin'],

				]
			),
			new StringField(
				'PASSWORD',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validatePassword'],

				]
			),
			new StringField(
				'CHECKWORD',
				[
					'validation' => [__CLASS__, 'validateCheckword'],

				]
			),
			new BooleanField(
				'ACTIVE',
				[
					'values' => array('N', 'Y'),
					'default' => 'Y',

				]
			),
			new StringField(
				'NAME',
				[
					'validation' => [__CLASS__, 'validateName'],

				]
			),
			new StringField(
				'LAST_NAME',
				[
					'validation' => [__CLASS__, 'validateLastName'],

				]
			),
			new StringField(
				'EMAIL',
				[
					'validation' => [__CLASS__, 'validateEmail'],

				]
			),
			new DatetimeField(
				'LAST_LOGIN',
				[

				]
			),
			new DatetimeField(
				'DATE_REGISTER',
				[
					'required' => true,

				]
			),
			new StringField(
				'LID',
				[
					'validation' => [__CLASS__, 'validateLid'],

				]
			),
			new StringField(
				'PERSONAL_PROFESSION',
				[
					'validation' => [__CLASS__, 'validatePersonalProfession'],

				]
			),
			new StringField(
				'PERSONAL_WWW',
				[
					'validation' => [__CLASS__, 'validatePersonalWww'],

				]
			),
			new StringField(
				'PERSONAL_ICQ',
				[
					'validation' => [__CLASS__, 'validatePersonalIcq'],

				]
			),
			new StringField(
				'PERSONAL_GENDER',
				[
					'validation' => [__CLASS__, 'validatePersonalGender'],

				]
			),
			new StringField(
				'PERSONAL_BIRTHDATE',
				[
					'validation' => [__CLASS__, 'validatePersonalBirthdate'],

				]
			),
			new IntegerField(
				'PERSONAL_PHOTO',
				[

				]
			),
			new StringField(
				'PERSONAL_PHONE',
				[
					'validation' => [__CLASS__, 'validatePersonalPhone'],

				]
			),
			new StringField(
				'PERSONAL_FAX',
				[
					'validation' => [__CLASS__, 'validatePersonalFax'],

				]
			),
			new StringField(
				'PERSONAL_MOBILE',
				[
					'validation' => [__CLASS__, 'validatePersonalMobile'],

				]
			),
			new StringField(
				'PERSONAL_PAGER',
				[
					'validation' => [__CLASS__, 'validatePersonalPager'],

				]
			),
			new TextField(
				'PERSONAL_STREET',
				[

				]
			),
			new StringField(
				'PERSONAL_MAILBOX',
				[
					'validation' => [__CLASS__, 'validatePersonalMailbox'],

				]
			),
			new StringField(
				'PERSONAL_CITY',
				[
					'validation' => [__CLASS__, 'validatePersonalCity'],

				]
			),
			new StringField(
				'PERSONAL_STATE',
				[
					'validation' => [__CLASS__, 'validatePersonalState'],

				]
			),
			new StringField(
				'PERSONAL_ZIP',
				[
					'validation' => [__CLASS__, 'validatePersonalZip'],

				]
			),
			new StringField(
				'PERSONAL_COUNTRY',
				[
					'validation' => [__CLASS__, 'validatePersonalCountry'],

				]
			),
			new TextField(
				'PERSONAL_NOTES',
				[

				]
			),
			new StringField(
				'WORK_COMPANY',
				[
					'validation' => [__CLASS__, 'validateWorkCompany'],

				]
			),
			new StringField(
				'WORK_DEPARTMENT',
				[
					'validation' => [__CLASS__, 'validateWorkDepartment'],

				]
			),
			new StringField(
				'WORK_POSITION',
				[
					'validation' => [__CLASS__, 'validateWorkPosition'],

				]
			),
			new StringField(
				'WORK_WWW',
				[
					'validation' => [__CLASS__, 'validateWorkWww'],

				]
			),
			new StringField(
				'WORK_PHONE',
				[
					'validation' => [__CLASS__, 'validateWorkPhone'],

				]
			),
			new StringField(
				'WORK_FAX',
				[
					'validation' => [__CLASS__, 'validateWorkFax'],

				]
			),
			new StringField(
				'WORK_PAGER',
				[
					'validation' => [__CLASS__, 'validateWorkPager'],

				]
			),
			new TextField(
				'WORK_STREET',
				[

				]
			),
			new StringField(
				'WORK_MAILBOX',
				[
					'validation' => [__CLASS__, 'validateWorkMailbox'],

				]
			),
			new StringField(
				'WORK_CITY',
				[
					'validation' => [__CLASS__, 'validateWorkCity'],

				]
			),
			new StringField(
				'WORK_STATE',
				[
					'validation' => [__CLASS__, 'validateWorkState'],

				]
			),
			new StringField(
				'WORK_ZIP',
				[
					'validation' => [__CLASS__, 'validateWorkZip'],

				]
			),
			new StringField(
				'WORK_COUNTRY',
				[
					'validation' => [__CLASS__, 'validateWorkCountry'],

				]
			),
			new TextField(
				'WORK_PROFILE',
				[

				]
			),
			new IntegerField(
				'WORK_LOGO',
				[

				]
			),
			new TextField(
				'WORK_NOTES',
				[

				]
			),
			new TextField(
				'ADMIN_NOTES',
				[

				]
			),
			new StringField(
				'STORED_HASH',
				[
					'validation' => [__CLASS__, 'validateStoredHash'],

				]
			),
			new StringField(
				'XML_ID',
				[
					'validation' => [__CLASS__, 'validateXmlId'],

				]
			),
			new DateField(
				'PERSONAL_BIRTHDAY',
				[

				]
			),
			new StringField(
				'EXTERNAL_AUTH_ID',
				[
					'validation' => [__CLASS__, 'validateExternalAuthId'],

				]
			),
			new DatetimeField(
				'CHECKWORD_TIME',
				[

				]
			),
			new StringField(
				'SECOND_NAME',
				[
					'validation' => [__CLASS__, 'validateSecondName'],
				]
			),
			new StringField(
				'CONFIRM_CODE',
				[
					'validation' => [__CLASS__, 'validateConfirmCode'],

				]
			),
			new IntegerField(
				'LOGIN_ATTEMPTS',
				[

				]
			),
			new DatetimeField(
				'LAST_ACTIVITY_DATE',
				[

				]
			),
			new StringField(
				'AUTO_TIME_ZONE',
				[
					'validation' => [__CLASS__, 'validateAutoTimeZone'],

				]
			),
			new StringField(
				'TIME_ZONE',
				[
					'validation' => [__CLASS__, 'validateTimeZone'],

				]
			),
			new IntegerField(
				'TIME_ZONE_OFFSET',
				[

				]
			),
			new StringField(
				'TITLE',
				[
					'validation' => [__CLASS__, 'validateTitle'],

				]
			),
			new StringField(
				'BX_USER_ID',
				[
					'validation' => [__CLASS__, 'validateBxUserId'],

				]
			),
			new StringField(
				'LANGUAGE_ID',
				[
					'validation' => [__CLASS__, 'validateLanguageId'],

				]
			),
			new BooleanField(
				'BLOCKED',
				[
					'values' => array('N', 'Y'),
					'default' => 'N',

				]
			),
			new BooleanField(
				'PASSWORD_EXPIRED',
				[
					'values' => array('N', 'Y'),
					'default' => 'N',

				]
			),
		];
	}

	/**
	 * Returns validators for LOGIN field.
	 *
	 * @return array
	 */
	public static function validateLogin()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for PASSWORD field.
	 *
	 * @return array
	 */
	public static function validatePassword()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for CHECKWORD field.
	 *
	 * @return array
	 */
	public static function validateCheckword()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for NAME field.
	 *
	 * @return array
	 */
	public static function validateName()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for LAST_NAME field.
	 *
	 * @return array
	 */
	public static function validateLastName()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for EMAIL field.
	 *
	 * @return array
	 */
	public static function validateEmail()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for LID field.
	 *
	 * @return array
	 */
	public static function validateLid()
	{
		return [
			new LengthValidator(null, 2),
		];
	}

	/**
	 * Returns validators for PERSONAL_PROFESSION field.
	 *
	 * @return array
	 */
	public static function validatePersonalProfession()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_WWW field.
	 *
	 * @return array
	 */
	public static function validatePersonalWww()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_ICQ field.
	 *
	 * @return array
	 */
	public static function validatePersonalIcq()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_GENDER field.
	 *
	 * @return array
	 */
	public static function validatePersonalGender()
	{
		return [
			new LengthValidator(null, 1),
		];
	}

	/**
	 * Returns validators for PERSONAL_BIRTHDATE field.
	 *
	 * @return array
	 */
	public static function validatePersonalBirthdate()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for PERSONAL_PHONE field.
	 *
	 * @return array
	 */
	public static function validatePersonalPhone()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_FAX field.
	 *
	 * @return array
	 */
	public static function validatePersonalFax()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_MOBILE field.
	 *
	 * @return array
	 */
	public static function validatePersonalMobile()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_PAGER field.
	 *
	 * @return array
	 */
	public static function validatePersonalPager()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_MAILBOX field.
	 *
	 * @return array
	 */
	public static function validatePersonalMailbox()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_CITY field.
	 *
	 * @return array
	 */
	public static function validatePersonalCity()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_STATE field.
	 *
	 * @return array
	 */
	public static function validatePersonalState()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_ZIP field.
	 *
	 * @return array
	 */
	public static function validatePersonalZip()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for PERSONAL_COUNTRY field.
	 *
	 * @return array
	 */
	public static function validatePersonalCountry()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_COMPANY field.
	 *
	 * @return array
	 */
	public static function validateWorkCompany()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_DEPARTMENT field.
	 *
	 * @return array
	 */
	public static function validateWorkDepartment()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_POSITION field.
	 *
	 * @return array
	 */
	public static function validateWorkPosition()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_WWW field.
	 *
	 * @return array
	 */
	public static function validateWorkWww()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_PHONE field.
	 *
	 * @return array
	 */
	public static function validateWorkPhone()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_FAX field.
	 *
	 * @return array
	 */
	public static function validateWorkFax()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_PAGER field.
	 *
	 * @return array
	 */
	public static function validateWorkPager()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_MAILBOX field.
	 *
	 * @return array
	 */
	public static function validateWorkMailbox()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_CITY field.
	 *
	 * @return array
	 */
	public static function validateWorkCity()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_STATE field.
	 *
	 * @return array
	 */
	public static function validateWorkState()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_ZIP field.
	 *
	 * @return array
	 */
	public static function validateWorkZip()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for WORK_COUNTRY field.
	 *
	 * @return array
	 */
	public static function validateWorkCountry()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for STORED_HASH field.
	 *
	 * @return array
	 */
	public static function validateStoredHash()
	{
		return [
			new LengthValidator(null, 32),
		];
	}

	/**
	 * Returns validators for XML_ID field.
	 *
	 * @return array
	 */
	public static function validateXmlId()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for EXTERNAL_AUTH_ID field.
	 *
	 * @return array
	 */
	public static function validateExternalAuthId()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for SECOND_NAME field.
	 *
	 * @return array
	 */
	public static function validateSecondName()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for CONFIRM_CODE field.
	 *
	 * @return array
	 */
	public static function validateConfirmCode()
	{
		return [
			new LengthValidator(null, 8),
		];
	}

	/**
	 * Returns validators for AUTO_TIME_ZONE field.
	 *
	 * @return array
	 */
	public static function validateAutoTimeZone()
	{
		return [
			new LengthValidator(null, 1),
		];
	}

	/**
	 * Returns validators for TIME_ZONE field.
	 *
	 * @return array
	 */
	public static function validateTimeZone()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for TITLE field.
	 *
	 * @return array
	 */
	public static function validateTitle()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for BX_USER_ID field.
	 *
	 * @return array
	 */
	public static function validateBxUserId()
	{
		return [
			new LengthValidator(null, 32),
		];
	}

	/**
	 * Returns validators for LANGUAGE_ID field.
	 *
	 * @return array
	 */
	public static function validateLanguageId()
	{
		return [
			new LengthValidator(null, 2),
		];
	}
}