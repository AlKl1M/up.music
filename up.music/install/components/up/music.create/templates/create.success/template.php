<?php

use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}
?>

<section class="hero is-success">
	<div class="hero-body">
		<h1 class="title"><?=Loc::getMessage("UP_MUSIC_CREATE_SUCCESS_TEXT_FIRST_ROW")?></h1>
		<h2 class="subtitle">
			<?=Loc::getMessage("UP_MUSIC_CREATE_SUCCESS_TEXT_SECOND_ROW")?>
		</h2>
	</div>
</section>

<div class="columns mb-6" style="margin-top: 10px">
	<div class="column">
		<a class="button is-pulled-right" href="/posts">
			<?=Loc::getMessage("UP_MUSIC_CREATE_SUCCESS_TEXT_IN_BUTTON")?>
		</a>
	</div>
</div>