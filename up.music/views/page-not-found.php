<?php

/**
 * @var CMain $APPLICATION
 * @var CUser $USER
 */

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
if(!($USER->IsAuthorized())) {LocalRedirect('/login/');}
$APPLICATION->SetTitle("Bitrix Music");

$APPLICATION->IncludeComponent('up:page.not.found', '', []);

require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php");

use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);