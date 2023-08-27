import {Type, Loc, Tag} from 'main.core';

export class PageNotFound
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('PageNotFound: options.rootNodeId required');
		}

		if (Type.isStringFilled(options.userId))
		{
			this.userId = options.userId;
		}
		else
		{
			throw new Error('PageNotFound: userId required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		if (!this.rootNode)
		{
			throw new Error(`PageNotFound: element with id "${this.rootNodeId}" not found`);
		}

		this.render();
	}

	render()
	{
		const pageNotFoundNode = Tag.render `
		<div>
			<section class="hero is-warning">
				<div class="hero-body">
					<p class="title">
						${Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_FIRST_ROW_TEXT')}
					</p>
					<p class="subtitle">
						${Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_SECOND_ROW_TEXT')}
					</p>
				</div>
			</section>
				<div class="columns mb-6" style="margin-top: 10px">
					<div class="column">
						<a class="button is-success is-pulled-right" onclick="goToMusicList('${this.userId}')">
							${Loc.getMessage('UP_MUSIC_PAGE_NOT_FOUND_TEXT_IN_BUTTON')}
						</a>
					</div>
				</div>
		</div>
		`;
		this.rootNode.appendChild(pageNotFoundNode);
	}
}