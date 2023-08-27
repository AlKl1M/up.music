import {Type, Tag, Loc} from 'main.core';
import('../../functions');

export class MusicList
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('MusicList: options.rootNodeId required');
		}

		if (Type.isStringFilled(options.fileRootDirectory))
		{
			this.fileRootDirectory = options.fileRootDirectory;
		}
		else
		{
			throw new Error('MusicList: options.fileRootDirectory required');
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('MusicList: options.userId required');
		}

		this.page = options.page ? Number(options.page) : 1;
		this.dateFormat = options.dateFormat ? options.dateFormat : 'd.m.Y H:i';

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`MusicList: element with id "${this.rootNodeId}" not found`);
		}

		this.genre = options.genre ? options.genre : "";
		this.searchString = options.searchString ? options.searchString : "";
		this.nickname = options.nickname ? options.nickname : "";

		this.paginationBaseLink = options.paginationBaseLink;

		this.musicList = [];
		this.reload();

	}

	reload()
	{
		this.loadMusicList()
			.then(musicList => {
				this.musicList = musicList;
				this.loadGenreList()
					.then(genreList => {
						this.genreList = genreList;

						this.loadPagination()
							.then(responce => {
								this.lastPage = responce.data.lastPage;
								this.pageList = responce.data.pageList;
								this.render();
							})
					})
			})
	}

	loadPagination()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.pagination.getPaginationForMusic', {
				data: {
					page: this.page,
					nickname: this.nickname,
					genre: this.genre,
					searchString: this.searchString,
				}
			})
				.then((responce) => {
					return resolve(responce);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	loadGenreList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.genre.getList')
				.then((responce) => {
					const genreList = responce.data.genreList;
					return resolve(genreList);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	loadMusicList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.music.getList', {
				data: {
					page: this.page,
					nickname: this.nickname,
					genre: this.genre,
					searchString: this.searchString,
				}
			})
				.then((responce) => {
					const musicList = responce.data.musicList;
					return resolve(musicList);
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
		this.renderGenres();

		if (this.musicList.length !== 0)
		{
			this.renderMusic();
			this.renderPagination();
		}
		else
		{
			this.renderPostListEmpty();
		}

	}

	renderPostListEmpty()
	{
		const createFirstPostNode = Tag.render`
				<div>
					<section class="hero is-success">
						<div class="hero-body">
							<h1 class="title">
								${Loc.getMessage('UP_MUSIC_CREATE_SUCCESS_TEXT_FIRST_ROW')}
							</h1>
							<h2 class="subtitle">
								${Loc.getMessage('UP_MUSIC_CREATE_SUCCESS_TEXT_SECOND_ROW')}
							</h2>
						</div>
					</section>
				</div>
			`;

		this.rootNode.appendChild(createFirstPostNode);
	}

	renderGenres()
	{
		const genreContainerNode = Tag.render`<div class="genres"></div>`;

		this.genreList.forEach(genreData => {
			const genreNode = Tag.render`
				<span class="is-large pagination-item genre
					${(this.genre === genreData['CODE']) ? 'pagination-item-active' : ''}"
					onclick="
						updateMusicList
						(
							'${createLinkFromParts
								(
									this.paginationBaseLink,
									1, 
									"",
									genreData['CODE']
								)}', 
							1, 
							'${genreData['CODE']}', 
							'${this.nickname}', 
							'${this.searchString}'
						)"
				>
						${BX.util.htmlspecialchars(genreData['NAME'])}
					
				</span>
			`;
			genreContainerNode.appendChild(genreNode);
		});
		this.rootNode.appendChild(genreContainerNode);
	}

	renderDeleteCross(musicData)
	{
		if (this.userId===musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_ID)
		{
			return Tag.render`
				<div class="media-right">
					<button class="card-header-icon" aria-label="more options">
						<a onclick="goToObjectDelete('${this.userId}', '${musicData.ID}', '/delete/music')">
								<span class="icon disabled">
									&#10060;
								</span>
						</a>
					</button>
				</div>
				`;

		}
		return '';
	}

	renderMusic()
	{
		const musicContainerNode = Tag.render`<div class="posts"></div>`;
		this.musicList.forEach(musicData => {
			const musicNode = Tag.render`
				<div class="box">
				  <article class="media">
					<div class="media-left">
					  <figure class="image is-64x64">
						<img src="
								${createAbsoluteFilePath(
									this.fileRootDirectory,
									musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_SUBDIR,
									musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_IMAGE_FILE_FILE_NAME,
								)}" 
								alt="Image"
						>
					  </figure>
					  
						<button class="button is-small is-fullwidth play-track-btn" data-name="${musicData.TITLE}"
									data-track="
										${createAbsoluteFilePath(
											this.fileRootDirectory,
											musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_SUBDIR,
											musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_MUSIC_FILE_FILE_NAME,
										)}
						">
							play
					    </button>		
					</div>
					<div class="media-content">
					  <div class="content">
						<p>
							 <a class="subtitle is-6"  
									onclick="goToUserDetail(
										'/user/'+'${musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN}', 
										'${musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_LOGIN}',
										'${this.userId}'
									)"
							 >
									${'@' +
										decreaseDescription(
											BX.util.htmlspecialchars(musicData.UP_MUSIC_MODEL_MUSIC_MUSIC_USER_NAME)
										)
									}
							</a>
						
							  
						 	 <br>
						 	 <a class="subtitle is-4" onclick="goToMusicDetail('${musicData.ID}', 
								'${this.fileRootDirectory}', '${this.dateFormat}', '${this.userId}')"
							 >
									${decreaseDescription(BX.util.htmlspecialchars(musicData.TITLE))}
							 </a>
							<br>
							<div style="margin-top: 17px">
								<small >
								  ${BX.date.format(this.dateFormat,
										new Date(musicData.CREATE_DATE)
									)}
							  	</small>
							 </div>
						</p>
					  </div>
					 
					</div>
					 ${this.renderDeleteCross(musicData)}
				  </article>
				</div>
			`;

			musicContainerNode.appendChild(musicNode);
		});
		this.rootNode.appendChild(musicContainerNode);

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

	renderPagination()
	{
		const musicPaginationNode = Tag.render`<ul class="pagination"></ul>`;

		const firstPageNode = Tag.render`
			<li class="pagination-item 
				${(this.page === 1) ? 'pagination-item-no-active' : ''}"
				onclick="updateMusicList
					(
						'${createLinkFromParts(this.paginationBaseLink, 1, this.searchString, this.genre)}',
				 		1, 
				 		'${this.genre}', 
				 		'${this.nickname}', 
				 		'${this.searchString}'
				 	)"
			>
				${Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_START')}
			</li>
		`;

		musicPaginationNode.appendChild(firstPageNode);

		this.pageList.forEach(pageData => {
			const pageNode = Tag.render`
				<li class="pagination-item 
					${(this.page === pageData) ? 'pagination-item-active' : ''}"
					onclick="updateMusicList
						(
							'${createLinkFromParts(this.paginationBaseLink, pageData, this.searchString, this.genre)}', 
							${pageData}, 
							'${this.genre}', 
							'${this.nickname}', 
							'${this.searchString}'
						)"
				>
						${pageData}
				</li>
			`;
			musicPaginationNode.appendChild(pageNode);
		});

		const lastPageNode = Tag.render`
			<li class="pagination-item 
				${(this.page === this.lastPage) ? 'pagination-item-no-active' : ''}"
				onclick="updateMusicList
					(
						'${createLinkFromParts(this.paginationBaseLink, this.lastPage, this.searchString, this.genre)}',
						${this.lastPage}, 
						'${this.genre}', 
						'${this.nickname}', 
						'${this.searchString}'
					)"
			>
				${Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_END')}
			</li>
		`;

		musicPaginationNode.appendChild(lastPageNode);
		this.rootNode.appendChild(musicPaginationNode);
	}
}