import {Type, Tag, Loc} from 'main.core';

export class UserDetail
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('UserDetail: options.rootNodeId required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`UserDetail: element with id "${this.rootNodeId}" not found`);
		}

		if (Type.isStringFilled(options.fileRootDirectory))
		{
			this.fileRootDirectory = options.fileRootDirectory;
		}
		else
		{
			throw new Error('UserDetail: options.fileRootDirectory required');
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('UserDetail: options.userId required');
		}

		if (Type.isStringFilled(options.nickname))
		{
			this.nickname = options.nickname;
		}
		else
		{
			throw new Error('UserDetail: options.nickname required');
		}

		this.userList=[];
		this.reload();
	}

	reload()
	{
		this.loadUserList()
			.then(userList => {
				this.userList = userList[0];

				this.loadUserImage()
					.then(userImage => {
						this.userPhoto = userImage;

						this.loadCountPosts()
							.then(countPosts => {
								this.countPosts = countPosts;
								this.render();
							})
					})
			})
	}

	uploadAvatarFunc() {
		return new Promise((resolve, reject) => {
			var photoInput = document.getElementById('photoInput');
			if (photoInput) {
				var photoFile = photoInput.files[0];
				var formData = new FormData();
				formData.append("photo", photoFile);
			}
			BX.ajax.runAction('up:music.user.changeAvatar', {
				data: {
					data: 1,
				}
			})
				.then((responce) => {
					console.log(responce);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	loadUserList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.user.getList', {
				data: {
					nickname: this.nickname,
				}
			})
				.then((responce) => {
					const userList = responce.data.userList;
					return resolve(userList);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	imgUpdate()
	{
		const fileInput = document.getElementById('photoInput');
		const file = fileInput.files[0];
		if (!file) {
			alert('Выбран пустой файл!');
			return;
		}

		if (!/^image\//.test(file.type)) {
			alert('Выбранный файл не является изображением!');
			return;
		}

		const formData = new FormData();
		formData.append('photo', file);
		const nickname = this.nickname;
		formData.append('nickname', nickname);
		BX.ajax.runAction('up:music.user.imgUpdate', {
			mode: 'ajax',
			data: formData,
		})
			.then((responce) => {
				this.reload();
				alert("Аватар успешно загружен!");
			})

	}

	loadUserImage()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.user.getImageAbsolutePath', {
				data: {
					nickname: this.nickname,
				}
			})
				.then((responce) => {
					const userImage = responce.data.userImage;
					return resolve(userImage);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	loadCountPosts()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.user.getCountPosts', {
				data: {
					nickname: this.nickname,
				}
			})
				.then((responce) => {
					const countPosts = responce.data.countPosts;
					return resolve(countPosts);
				})
				.catch((error) => {
					console.error(error);
					goToPageNotFound(this.userId);
				})
			;
		});
	}

	renderUpdatePhoto(userId)
	{
		if (this.userId===userId)
		{
			return Tag.render`<div class="field is-grouped">
						  <div class="file has-name">
							<label class="file-label">
							  <input class="file-input" type="file" id="photoInput">
							  <span class="file-cta">
								<span class="file-icon">
								  <i class="fas fa-upload"></i>
								</span>
								<span class="file-label">
								  Выберите новый аватар
								</span>
							  </span>
							</label>
						  </div>
						  <div class="control">
							<button class="button is-black" id="uploadButton" onclick="${() => {this.imgUpdate()}}">Загрузить</button>
						  </div>
						</div>`;
		}
		return '';
	}

	render()
	{
		this.rootNode.innerHTML = '';

		const userContainerNode = Tag.render`<div></div>`;
		const userDetailNode = Tag.render`
			<div class="columns is-fullwidth">
					<div class="column">
						<div class="image-container">
						<figure class="image is-300x300">
							<img class="is-rounded" src="${this.userPhoto}" style="width:300px; margin-left: 50px;">
						</figure>
						</div>
						
						${
			this.renderUpdatePhoto(this.userList.ID)
		}
					
					</div>
					<div class="column">
						<div class="card-content">
							<div class="media">
								<div class="media-content">
									<p class="title is-4">
										<a class="title is-4" 
											onclick="updateMusicList('/user/'+'${BX.util.htmlspecialchars(this.userList.LOGIN)}', 
												1, '', '${BX.util.htmlspecialchars(this.userList.LOGIN)}',''
											)"
										>
											${BX.util.htmlspecialchars(this.userList.NAME)}
										</a>
									</p>
									<p class="subtitle is-6">
										${"@"+BX.util.htmlspecialchars(this.userList.LOGIN)}
									</p>
								</div>
			
							</div>
						</div>
					</div>
					<div class="column" style="margin-top: 20px">
						<nav class="level">
							<div class="level-item has-text-centered">
								<div>
									<p class="heading"> ${Loc.getMessage('UP_MUSIC_POSTS_TEXT')}</p>
									<p class="title">${Number(this.countPosts)}</p>
								</div>
							</div>
						</nav>
					</div>
				</div>
			`;


		const renderDeleteAccountNode = Tag.render`
			<div class="column is-one-fifth" style="margin-top: 20px">
					<button class="button is-danger is-light"
						onclick="goToObjectDelete('${this.userId}', '${this.userId}', '/delete/user')"
					>
							${Loc.getMessage('UP_MUSIC_DELETE_ACCOUNT')}
					</button>
			</div>
			`;

		if (this.userId===this.userList.ID)
		{
			userDetailNode.appendChild(renderDeleteAccountNode);
		}

		userContainerNode.appendChild(userDetailNode);

		this.rootNode.appendChild(userContainerNode);
	}
}