import {Type, Tag, Loc} from 'main.core';
import('../../functions');

export class UserList
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('UserList: options.rootNodeId required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`UserList: element with id "${this.rootNodeId}" not found`);
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('UserList: options.userId required');
		}

		if (Type.isStringFilled(options.fileRootDirectory))
		{
			this.fileRootDirectory = options.fileRootDirectory;
		}
		else
		{
			throw new Error('UserList: options.fileRootDirectory required');
		}

		this.page = options.page ? Number(options.page) : 1;
		this.searchString = options.searchString ? options.searchString : "";
		this.paginationBaseLink = options.paginationBaseLink;

		this.userList = [];
		this.reload();
	}

	reload()
	{
		this.loadUserList()
			.then(userList => {
				this.userList = userList;
				this.loadPagination()
					.then(responce => {
						this.lastPage = responce.data.lastPage;
						this.pageList = responce.data.pageList;
						this.render();
					})
			})
	}

	loadPagination()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.pagination.getPaginationForUser', {
					data: {
						page: this.page,
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

	loadUserList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:music.user.getList', {
					data: {
						page: this.page,
						searchString: this.searchString,
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

	render()
	{
		this.rootNode.innerHTML = '';

		this.renderUser();
		this.renderPagination();
	}

	renderUser()
	{
		const userContainerNode = Tag.render`<div class="users"></div>`;
		this.userList.forEach(userData => {
			const userNode = Tag.render`
				<div class="card-content">
					<div class="media">
						<div class="media-left">
							<figure class="image is-48x48">
								<img src="${userData.IMAGE_PATH}">
							</figure>
						</div>
						<div class="media-content">
							<p class="title is-4">
								<a class="title is-4"
								onclick="goToUserDetail('/user/'+'${userData.LOGIN}', '${userData.LOGIN}',
									'${this.userId}')"
								>
									${decreaseDescription(BX.util.htmlspecialchars(userData.NAME))}
								</a>
							</p>
							<p class="subtitle is-6">
								${"@"+decreaseDescription(BX.util.htmlspecialchars(userData.LOGIN))}
							</p>
						</div>
					</div>
				</div>
			`;
			userContainerNode.appendChild(userNode);
		});
		this.rootNode.appendChild(userContainerNode);
	}

	renderPagination()
	{
		const userPaginationNode = Tag.render`<ul class="pagination"></ul>`;

		const firstPageNode = Tag.render`
			<li class="pagination-item 
				${(this.page === 1) ? 'pagination-item-no-active' : ''}"
				onclick="
					updateUserList
					(
						'${createLinkFromParts
							(
								this.paginationBaseLink, 
								1, 
								this.searchString
							)}', 
						1, 
						''
					)"
			>
				${Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_START')}
			</li>
		`;

		userPaginationNode.appendChild(firstPageNode);

		this.pageList.forEach(pageData => {
			const pageNode = Tag.render`
				<li class="pagination-item 
					${(this.page === pageData) ? 'pagination-item-active' : ''}"
					onclick="
						updateUserList
						(
							'${createLinkFromParts
								(
									this.paginationBaseLink, 
									pageData, 
									this.searchString
								)
							}', 
							${pageData}, ''
						)"
				>
					${pageData}
				</li>
			`;
			userPaginationNode.appendChild(pageNode);
		});

		const lastPageNode = Tag.render`
			<li class="pagination-item 
				${(this.page === this.lastPage) ? 'pagination-item-no-active' : ''}"
				onclick="
					updateUserList
					(
						'${createLinkFromParts
								(
									this.paginationBaseLink,
									this.lastPage, 
									this.searchString
								)
						}',
						${this.lastPage}, 
						''
					)"
			>
				${Loc.getMessage('UP_MUSIC_PAGINATION_GO_TO_END')}	
			</li>
		`;
		userPaginationNode.appendChild(lastPageNode);
		this.rootNode.appendChild(userPaginationNode);
	}
}