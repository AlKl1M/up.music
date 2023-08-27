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
	$APPLICATION->IncludeComponent('up:music.list', '', [
		'DATE_FORMAT' => 'd.m.Y H:i',
		'CURRENT_PAGE' => (is_set($currentPage) ? $currentPage : 1),
		'PAGINATION_BASE_LINK'=>'/posts',
		'GENRE'=> Context::getCurrent()->getRequest()->get('genre'),
		'SEARCH_STRING'=>Context::getCurrent()->getRequest()->get('search'),
		'USER_NICKNAME'=>Context::getCurrent()->getRequest()->get('nickname'),
	]);

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}