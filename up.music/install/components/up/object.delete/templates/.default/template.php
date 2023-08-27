<?php

/**
 * @var array $arResult
 * @var CUser $USER
 */

use Bitrix\Main\LoaderException;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\Page\Asset;
use Bitrix\Main\UI\Extension;
use Up\Music\Config\Config;

Loc::loadMessages(__FILE__);
Asset::getInstance()->addJs('/local/js/up/functions.js');

try
{
	Extension::load('up.audio-player');

	Extension::load('up.page-not-found');
	Extension::load('up.user-detail');
	Extension::load('up.user-list');
	Extension::load('up.music-list');
	Extension::load('up.music-detail');
	Extension::load('up.object-delete');
}
catch (LoaderException $e)
{
	?>
	<script>
		goToPageNotFound('<?=$USER->GetID()?>');
	</script>
	<?php
}

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
	die();
}
?>

<div id="audio-player-container"></div>

<div id="user-detail-container"></div>
<div id="user-list-container"></div>
<div id="music-list-container"></div>
<div id="music-detail-container"></div>
<div id="page-not-found-container"></div>
<div id="object-delete-container"></div>


<script>
	BX.ready(function () {
		clearBlocks();

		window.objectDelete = new BX.Up.Music.ObjectDelete({
			rootNodeId: 'object-delete-container',
			id: '<?=$arResult['ID']?>',
			userId: '<?=$USER->GetID()?>',
			baseLink: '<?=$arResult['BASE_LINK']?>',
			showSuccessMessage: '<?=$arResult['SHOW_SUCCESS_MESSAGE']?>',
			showUnsuccessfulMessage: '<?=$arResult['SHOW_UNSUCCESSFUL_MESSAGE']?>',
		});

		if ('<?=$arResult['BASE_LINK']?>' === '/delete/music')
		{
			window.musicDetail = new BX.Up.Music.MusicDetail({
				rootNodeId: 'music-detail-container',
				fileRootDirectory: '<?=Config::FILES_ROOT_DIRECTORY?>',

				withCrossDelete: false,
				musicId: '<?=$arResult['ID']?>',
				userId: '<?=$USER->GetID()?>',
			});
		}

		window.MusicAudioPlayer = new BX.Up.Music.AudioPlayer({
			rootNodeId: 'audio-player-container',
			trackName: 'Трек не выбран',
		});

		window.onload = function() {
			const playerData = JSON.parse(sessionStorage.getItem('playerData'));
			if (playerData) {
				MusicAudioPlayer.trackSrc = playerData.src;
				MusicAudioPlayer.trackName = playerData.name;
				MusicAudioPlayer.playing = true;
				window.MusicAudioPlayer.render();
				window.MusicAudioPlayer.initializeAudio();
				window.MusicAudioPlayer.attachEvents();
			}
		}

		const trackButtons = document.querySelectorAll('.play-track-btn');
		trackButtons.forEach(button => {
			button.addEventListener('click', () => {
				sessionStorage.removeItem('playerData');
				const newTrackSrc = button.dataset.track;
				const newTrackName = button.dataset.name;
				window.MusicAudioPlayer.updateMusicListSrc(newTrackSrc);
				window.MusicAudioPlayer.updateMusicListName(newTrackName);
				window.MusicAudioPlayer.render();
				window.MusicAudioPlayer.initializeAudio();
				window.MusicAudioPlayer.attachEvents();
			})
		})

		window.onbeforeunload = function() {
			sessionStorage.setItem('playerData', JSON.stringify({
				audioCurrentTime: window.MusicAudioPlayer.currentTime,
				src: window.MusicAudioPlayer.trackSrc,
				name: window.MusicAudioPlayer.trackName,
			}));
		};
	})
</script>