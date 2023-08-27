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
	$type = Context::getCurrent()->getRequest()->get('type');
	$searchString = Context::getCurrent()->getRequest()->get('searchString');

	switch ($type)
	{
		case "music":
		{
			$APPLICATION->IncludeComponent('up:music.list', '', [
				'DATE_FORMAT' => 'd.m.Y H:i',
				'CURRENT_PAGE' => (is_set($currentPage) ? $currentPage : 1),
				'PAGINATION_BASE_LINK'=>'/posts',
				'SEARCH_STRING'=>$searchString,
			]);

			require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
			return;
		}
		case "user":
		{
			$APPLICATION->IncludeComponent('up:users.list', '', [
				'DATE_FORMAT' => 'd.m.Y H:i',
				'CURRENT_PAGE' => (is_set($currentPage) ? $currentPage : 1),
				'PAGINATION_BASE_LINK'=>'/users',
				'SEARCH_STRING'=>$searchString,
			]);

			require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
			return;
		}
		default: LocalRedirect("/pageNotFound");
	}
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}