<?php
/**
 * @var CMain $APPLICATION
 * @var CUser $USER
 */
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Page\Asset;

Asset::getInstance()->addJs('/local/js/up/transitionsToComponents.js');
Asset::getInstance()->addJs('/local/js/up/updateComponents.js');
Loc::loadMessages(__FILE__);

?>

<!doctype html>
<html lang="<?= LANGUAGE_ID ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?php $APPLICATION->ShowTitle(); ?></title>

	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

<section class="section" style="background: #333">
	<div class="container">
		<nav class="navbar" role="navigation" aria-label="main navigation">
			<div class="navbar-brand" style="background: #737373">
				<a class="navbar-item" onclick="goToMusicList('<?=$USER->GetID()?>')">
					<img src="/upload/resources/image/baseCollection/logo.png" width="28">
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<div class="navbar-start navbar-item has-dropdown is-hoverable">

						<a class="navbar-link">
							<?=Loc::getMessage("UP_MUSIC_DROPDOWN_USER")?>
						</a>

						<div class="navbar-dropdown">
							<a class="navbar-item"  href="/create/">
								<?=Loc::getMessage("UP_MUSIC_CREATE_MUSIC")?>
							</a>

							<a class="navbar-item" onclick="goToUserDetail('/user/'+'<?=$USER->GetLogin()?>',
								'<?=$USER->GetLogin()?>', '<?=$USER->GetID()?>')">
								<?=Loc::getMessage("UP_MUSIC_MY_ACCOUNT")?>
							</a>
						</div>
					</div>
					<div class="navbar-start navbar-item has-dropdown is-hoverable">

						<a class="navbar-link">
							<?=Loc::getMessage("UP_MUSIC_DROPDOWN_UNIVERSE")?>
						</a>

						<div class="navbar-dropdown">
							<a class="navbar-item" onclick="goToUserList('<?=$USER->GetID()?>')">
								<?=Loc::getMessage("UP_MUSIC_ALL_USERS")?>
							</a>

							<a class="navbar-item" onclick="goToMusicList('<?=$USER->GetID()?>')">
								<?=Loc::getMessage("UP_MUSIC_ALL_MUSIC")?>
							</a>
						</div>
					</div>
				</div>

				<div class="level-item">
					<form action="/search/" method="get">
						<div class="field has-addons">
							<p class="control">
								<input class="input" minlength="1" maxlength="100" type="text" name = "searchString"
									   placeholder="<?=Loc::getMessage("UP_MUSIC_SEARCH_PLACEHOLDER")?>"
								>
							</p>
							<div class="control">
								<div class="input">
									<label class="radio">
										<input type="radio" name="type" value="music" checked>
										<?=Loc::getMessage("UP_MUSIC_TEXT_IN_RADIO_SEARCH_BY_MUSIC")?>
									</label>
									<label class="radio">
										<input type="radio" name="type" value="user">
										<?=Loc::getMessage("UP_MUSIC_TEXT_IN_RADIO_SEARCH_BY_USER")?>
									</label>
								</div>
							</div>
							<p class="control">
								<button class="button">
									<?=Loc::getMessage("UP_MUSIC_SEARCH_BUTTON")?>
								</button>
							</p>
						</div>
					</form>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<a class="button is-light" href="/logout/" style="margin-right: 10px">
							<?=Loc::getMessage("UP_MUSIC_LOG_OUT")?>
						</a>
					</div>
				</div>
			</div>
		</nav>
	</div>
</section>

<section class="section">
	<div class="container">