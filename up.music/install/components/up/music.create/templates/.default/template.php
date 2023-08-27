<?php

/**
 * @var array $arResult
 */

use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}
?>


<div class="column is-three-fifths is-offset-one-fifth">
    <form action="/create/" method="post" enctype="multipart/form-data">
        <?=bitrix_sessid_post()?>
        <div class="field">
            <label class="label"><?= Loc::getMessage("UP_MUSIC_NAME_TITLE_FIELD") ?></label>
            <div class="control">
                <input class="input" placeholder="<?= Loc::getMessage('UP_MUSIC_TITLE_PLACEHOLDER') ?>" type="text" minlength="1" maxlength="100" name="title">
            </div>
        </div>

		<div class="field">
			<label class="label"><?= Loc::getMessage("UP_MUSIC_NAME_MESSAGE_FIELD") ?></label>
			<div class="control">
				<textarea class="textarea" placeholder="<?= Loc::getMessage('UP_MUSIC_MESSAGE_PLACEHOLDER') ?>" minlength="1" maxlength="1000" name="message"></textarea>
			</div>
		</div>

		<div class="field file has-name">
			<label class="file-label">
				<input class="file-input" type="file" accept=".jpg,.jpeg,.png" name="image">
				<span class="file-cta">
						  <span class="file-icon">
							<i class="fas fa-upload"></i>
						  </span>
						  <span class="file-label">
							  <?= Loc::getMessage("UP_MUSIC_CHOOSE_FILE_MESSAGE") ?>
						  </span>
					</span>
				<span class="file-name">
						фото: jpg, jpeg, png
					</span>
			</label>
		</div>

		<div class="field file has-name">
			<label class="file-label">
				<input class="file-input" type="file" accept=".mp3,.wav,.ogg" name="music">
				<span class="file-cta">
						  <span class="file-icon">
							<i class="fas fa-upload"></i>
						  </span>
						  <span class="file-label">
							<?= Loc::getMessage("UP_MUSIC_CHOOSE_FILE_MESSAGE") ?>
						  </span>
					</span>
				<span class="file-name">
						музыка: mp3, wav, ogg
					</span>
			</label>
		</div>

		<label>
			<div class="field select">
				<select name="genre-id">
					<?php foreach ($arResult['GENRES'] as $genre): ?>
						<option value="<?=$genre['ID']?>"><?=$genre['NAME']?></option>
					<?php endforeach;?>
				</select>
			</div>
		</label>

		<div class="field is-grouped">
			<p class="control">
				<button class="button is-link" href="/posts">
					<?= Loc::getMessage("UP_MUSIC_TEXT_IN_BUTTON") ?>
				</button>
			</p>
		</div>

	</form>

</div>

<script>

	const imageInput = document.querySelector('input[name="image"]');
	const musicInput = document.querySelector('input[name="music"]');
	const imageFormats = ['jpg', 'png', 'jpeg'];
	const musicFormats = ['mp3', 'wav', 'ogg'];
	function checkFormat(input, formats) {
		const file = input.files[0];
		const fileName = file.name;
		if (file.size === 0) {
			alert('Файл пустой');
			const fileNameElement = input.parentElement.querySelector('.file-name');
			fileNameElement.innerText = `${fileName}`;
			fileNameElement.style.color = 'red';
		}
		const fileExtension = fileName.split('.').pop().toLowerCase();
		if (!formats.includes(fileExtension)) {
			alert('Неверный формат');
			input.value = '';
			const fileNameElement = input.parentElement.querySelector('.file-name');
			fileNameElement.innerText = `${fileName}`;
			fileNameElement.style.color = 'red';
		} else {
			const fileNameElement = input.parentElement.querySelector('.file-name');
			fileNameElement.innerText = `${fileName}`;
			fileNameElement.style.color = 'green';
		}
	}
	imageInput.addEventListener('change', function() {
		checkFormat(this, imageFormats);
	});
	musicInput.addEventListener('change', function() {
		checkFormat(this, musicFormats);
	});
</script>