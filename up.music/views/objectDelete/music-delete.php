<?php

use Bitrix\Main\Context;
use Up\Music\Repository\MusicRepository;

/**
 * @var CMain $APPLICATION
 * @var CUser $USER
 */

try
{
	require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
	$APPLICATION->SetTitle("Bitrix Music");

	$musicId = (int)Context::getCurrent()->getRequest()->get('id');

    if(!($USER->IsAuthorized()))
	{
		LocalRedirect('/login/');
	}

	if(!MusicRepository::isTrackOwner($musicId, (int)$USER->GetID()))
	{
		LocalRedirect('/pageNotFound');
	}

    $APPLICATION->SetTitle("Delete");
    $APPLICATION->IncludeComponent('up:object.delete', '', [
        'ID' => $musicId,
		'BASE_LINK'=>'/delete/music',
		'SHOW_SUCCESS_MESSAGE'=>false,
		'SHOW_UNSUCCESSFUL_MESSAGE'=>false,
    ]);

    require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");
}
catch (Exception $e)
{
	LocalRedirect('/pageNotFound');
}