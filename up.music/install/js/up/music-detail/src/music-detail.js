import {Type, Tag} from 'main.core';
import('../../functions');

export class MusicDetail
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('MusicDetail: options.rootNodeId required');
		}

		if (Type.isStringFilled(options.fileRootDirectory))
		{
			this.fileRootDirectory = options.fileRootDirectory;
		}
		else
		{
			throw new Error('MusicDetail: options.fileRootDirectory required');
		}

		if (Type.isStringFilled(options.musicId))
		{
			this.musicId = Number(options.musicId);
		}
		else
		{
			throw new Error('MusicDetail: options.musicId required');
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('MusicDetail: options.userId required');
		}

		this.dateFormat = options.dateFormat ?? 'd.m.Y H:i';

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`MusicDetail: element with id "${this.rootNodeId}" not found`);
		}

		this.withCrossDelete = options.withCrossDelete ?? true;
		this.music = [];
		this.reload();
	}

	reload()
	{
		this.loadMusic()
			.then(music => {
				this.music = music[0];
				this.render();
			})
	}

	loadMusic()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.music.getMusic', {
					data: {
						id: this.musicId,
					}
				})
				.then((responce) => {
					const music = responce.data.music;
					return resolve(music);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	render()
	{
		this.rootNode.innerHTML = '';
		this.renderMusic();
	}

	renderDeleteCross(userIdOnPage)
	{
		if (this.userId===userIdOnPage&&this.withCrossDelete)
		{
			return Tag.render`<div class="media-right">
								<button class="card-header-icon" aria-label="more options">
										<a onclick="goToObjectDelete('${this.userId}', '${this.music.ID}', '/delete/music')">
											<span class="icon disabled">
												&#10060;
											</span>
										</a>
								</button>
							</div>`;
		}
		return '';
	}


	renderMusic()
	{
			const musicNode = Tag.render`
				<div class="columns is-full">
					<div class="column is-one-quarter">
						<figure class="image is-200x200">
							<img src="
								${createAbsoluteFilePath(
									this.fileRootDirectory,
									this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_SUBDIR,
									this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_FILE_NAME,
								)}
							">
						</figure>
						<button class="is-fullwidth button is-small play-track-btn" data-name="${this.music.TITLE}"
									data-track="
										${createAbsoluteFilePath(
											this.fileRootDirectory,
											this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_SUBDIR,
											this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_FILE_NAME,
										)}
									">
								play
						</button>
					</div>
					<div class="column card-content">
						<div class="media">
							<div class="media-left">
								<figure class="image is-48x48">
									<img src="
										${this.music.USER_IMAGE_PATH}
									">
								</figure>
							</div>
							<div class="media-content">
								<p class="title is-4">
									<a class="title is-4"  
										onclick="goToUserDetail(
											'/user/'+'${this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN}', 
											'${this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN}',
											'${this.userId}'
										)"
									>
										${BX.util.htmlspecialchars(
											this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_NAME)
										}
									</a>
								</p>
							
								<p class="subtitle is-6">
									${'@'+BX.util.htmlspecialchars(
										this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN)
									}
								</p>
							</div>
							${
								this.renderDeleteCross(this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_ID)
							}
						</div>
			
						<div class="content">
							<p class="title is-4" style="margin-top: 50px">
								${BX.util.htmlspecialchars(this.music.TITLE)}
							</p>
							<p class="subtitle is-6" style="margin-top: 50px">
								${BX.util.htmlspecialchars(this.music.DESCRIPTION)}
							</p>
							<br>
							<br>
							 	${BX.date.format(this.dateFormat, new Date(this.music.CREATE_DATE))}
		
								<a onclick="goToMusicList
									(
										'${this.userId}',
										'', 
										'${this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_GENRE_CODE}'
									)"
								>
									${'#'+this.music.UP_MUSIC_MODEL_MUSIC_MUSIC_GENRE_NAME}
								</a>
						</div>
					</div>
				</div>
			`;

		this.rootNode.appendChild(musicNode);

		const playButtons = document.querySelectorAll('.play-track-btn');
		playButtons.forEach(function(playButton) {
			playButton.addEventListener('click', function() {
				const name = playButton.getAttribute('data-name');
				const src = playButton.getAttribute('data-track');
				window.MusicAudioPlayer.updateSrc(src);
				window.MusicAudioPlayer.updateName(name);
				window.MusicAudioPlayer.render();
				window.MusicAudioPlayer.initializeAudio();
				window.MusicAudioPlayer.attachEvents();
			})
		})
	}
}