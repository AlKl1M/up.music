<?php

/**
 * @var CMain $APPLICATION
 * @var CUser $USER
 */

try
{
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
    if(!($USER->IsAuthorized())) {LocalRedirect('/login/');}

	$APPLICATION->SetTitle("Bitrix Music");

	$APPLICATION->IncludeComponent('up:music.create', '', []);

	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}