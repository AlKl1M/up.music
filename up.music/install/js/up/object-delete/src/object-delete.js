import {Type, Tag, Loc} from 'main.core';
import('../../functions');

export class ObjectDelete
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('ObjectDelete: options.rootNodeId required');
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('ObjectDelete: options.userId required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`ObjectDelete: element with id "${this.rootNodeId}" not found`);
		}

		this.id = options.id ?? '';
		this.showSuccessMessage = options.showSuccessMessage ?? false;
		this.showUnsuccessfulMessage = options.showUnsuccessfulMessage ?? false;
		this.baseLink = options.baseLink ?? '';

		this.reload();
	}

	reload()
	{
		clearBlocks();
		this.render();
	}

	render()
	{
		if (this.showSuccessMessage)
		{
			this.renderSuccessMessage();
		}
		else
		{
			if (this.showUnsuccessfulMessage)
			{
				this.renderUnsuccessfulMessage();
			}
			else
			{
				this.renderDeleteObject();
			}
		}
	}

	renderSuccessMessage()
	{
		const deleteObjectNode = Tag.render `
		<div>
			<section class="hero is-success">
				<div class="hero-body">
					<h1 class="title">	
						${Loc.getMessage("UP_DELETE_SUCCESS_TEXT_FIRST_ROW")}
					</h1>
					<h2 class="subtitle">
						${Loc.getMessage("UP_DELETE_SUCCESS_TEXT_SECOND_ROW")}
					</h2>
				</div>
			</section>
			
			<div class="columns mb-6" style="margin-top: 10px">
				<div class="column">
					<a class="button is-pulled-right" onclick="goToMusicList('${this.userId}')">
						${Loc.getMessage("UP_DELETE_SUCCESS_TEXT_IN_BUTTON")}
					</a>
				</div>
			</div>
		</div>
		`;
		this.rootNode.appendChild(deleteObjectNode);
	}

	renderUnsuccessfulMessage()
	{
		const deleteObjectNode = Tag.render `
		<div>
			<section class="hero is-warning">
				<div class="hero-body">
					<h1 class="title">	
						${Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_FIRST_ROW")}						
					</h1>
					<h2 class="subtitle">
						${Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_SECOND_ROW")}	
					</h2>
				</div>
			</section>
			
		
			<div class="columns mb-6" style="margin-top: 10px">
				<div class="column">		
					<button class="button is-fullwidth" 
								onclick="${
			()=>
			{
				this.showUnsuccessfulMessage=false;
				this.showSuccessMessage=false;
				this.reload();
			}
		}">
								${Loc.getMessage("UP_DELETE_UNSUCCESSFUL_TEXT_IN_BUTTON")}	
					</button>
				</div>
			</div>
		</div>
		`;
		this.rootNode.appendChild(deleteObjectNode);
	}

	renderDeleteObject()
	{
		const deleteObjectNode = Tag.render `
		<div>
			<section class="hero is-danger">
				<div class="hero-body">
					<p class="title">
						${Loc.getMessage("UP_DELETE_OBJECT_TEXT_FIRST_ROW")}
					</p>
					<p class="subtitle">
						${Loc.getMessage("UP_DELETE_OBJECT_TEXT_SECOND_ROW")}
					</p>
				</div>
			</section>
			
			<div class="column is-offset-5">
				<div class="field is-grouped">
						<p class="control">
							<button class="button is-fullwidth" 
								onclick="${()=>
		{
			if (this.baseLink==='/delete/music')
			{
				this.deleteMusic()
			}
			if (this.baseLink==='/delete/user')
			{
				this.deleteUser()
			}
		}
		}">
								${Loc.getMessage("UP_DELETE_OBJECT_TEXT_IN_BUTTON")}
							</button>
						</p>
					</div>	
			</div>
		</div>
		`;
		this.rootNode.appendChild(deleteObjectNode);
	}

	deleteMusic()
	{
		BX.ajax.runAction('up:music.music.deleteMusicById', {
			data: {
				musicId: this.id,
			}
		})
			.then((responce) => {
				if (responce.data.status===true)
				{
					this.showUnsuccessfulMessage=false;
					this.showSuccessMessage=true;
					this.reload();
					if(responce.data.name === MusicAudioPlayer.trackName)
					{
						MusicAudioPlayer.trackSrc = "";
						MusicAudioPlayer.trackName = 'Трек не выбран';
						window.MusicAudioPlayer.render();
						window.MusicAudioPlayer.initializeAudio();
						window.MusicAudioPlayer.attachEvents();
					}
				}
				else
				{
					this.showUnsuccessfulMessage=true;
					this.showSuccessMessage=false;
					this.reload();
				}
			})
			.catch((error) => {
				console.error(error);
				this.showUnsuccessfulMessage=true;
				this.showSuccessMessage=false;
				this.reload();
			})
		;
	}

	sleep(ms)
	{
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	deleteUser()
	{
		BX.ajax.runAction('up:music.user.deleteUserById', {
			data: {
				userId: this.id,
			}
		})
			.then((responce) => {
				if (responce.data===true)
				{
					this.showUnsuccessfulMessage=false;
					this.showSuccessMessage=true;
					this.reload();

					this.sleep(500).then(() => {window.location.href = "/login/";});
				}
				else
				{
					this.showUnsuccessfulMessage=true;
					this.showSuccessMessage=false;
					this.reload();
				}
			})
			.catch((error) => {
				console.error(error);
				goToPageNotFound(this.userId);
			})
		;
	}
}