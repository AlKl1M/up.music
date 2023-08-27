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

	$currentPage = Context::getCurrent()->getRequest()->get('page');

	$APPLICATION->IncludeComponent('up:user.details', '', [
		'DATE_FORMAT' => 'd.m.Y H:i',
		'NICKNAME' => Context::getCurrent()->getRequest()->get('nickname'),
		'CURRENT_PAGE' => (is_set($currentPage) ? $currentPage : 1),
	]);

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}