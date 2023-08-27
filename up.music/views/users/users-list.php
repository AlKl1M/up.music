<?php

/**
 * @var CMain $APPLICATION
 * @var CUSER $USER
 */

use Bitrix\Main\Context;

try
{
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	if(!($USER->IsAuthorized())) {LocalRedirect('/login/');}
	$APPLICATION->SetTitle("Bitrix Music");

	$currentPage = Context::getCurrent()->getRequest()->get('page');
	$APPLICATION->IncludeComponent('up:users.list', '', [
		'DATE_FORMAT' => 'd.m.Y H:i',
		'CURRENT_PAGE' => (is_set($currentPage) ? $currentPage : 1),
		'PAGINATION_BASE_LINK'=>'/users',
		'SEARCH_STRING' => Context::getCurrent()->getRequest()->get('search'),
	]);

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}