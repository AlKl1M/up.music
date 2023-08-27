<?php

use Bitrix\Main\Context;

/**
 * @var CMain $APPLICATION
 * @var CUser $USER
 */

try
{
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
    if(!($USER->IsAuthorized())) {LocalRedirect('/login/');}
	$APPLICATION->SetTitle("Bitrix Music");

	$APPLICATION->IncludeComponent('up:music.details', '', [
		'MUSIC_ID' => (int)Context::getCurrent()->getRequest()->get('id'),
		'DATE_FORMAT' => 'd.m.Y H:i',
	]);

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}