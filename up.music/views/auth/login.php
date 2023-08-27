<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
if(($USER->IsAuthorized())) {LocalRedirect('/posts/');}

$APPLICATION->ShowCSS(true, true);
$APPLICATION->SetAdditionalCSS('/local/templates/music/template_styles.css');

$APPLICATION->IncludeComponent(
    "bitrix:system.auth.authorize",
    "flat",
    Array(
        "REGISTER_URL" => "/registration/",
        "SHOW_ERRORS" => "Y"
    )
);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");