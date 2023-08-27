<?php
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
if(($USER->IsAuthorized())) {LocalRedirect('/posts/');}
?>

<?php
$APPLICATION->ShowCSS(true, true);
$APPLICATION->SetAdditionalCSS('/local/templates/music/template_styles.css');
$APPLICATION->IncludeComponent(
    "bitrix:main.register",
    ".default",
    array(
        "AUTH" => "N",
        "COMPONENT_TEMPLATE" => ".default",
        "REQUIRED_FIELDS" => array(
            0 => "EMAIL",
            1 => "NAME",
        ),
        "SET_TITLE" => "Y",
        "SHOW_FIELDS" => array(
            0 => "EMAIL",
            1 => "NAME",
        ),
        "SUCCESS_PAGE" => "/auth/",
        "USER_PROPERTY" => array(),
        "USER_PROPERTY_NAME" => "",
        "USE_BACKURL" => "N",
        "AUTH" => "Y",
        "SUCCESS_PAGE" => '/posts/1'

    )
);
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_after.php");
?>