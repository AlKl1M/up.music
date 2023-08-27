/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
												TRANSITION TO COMPONENTS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function goToUserDetail(baseLink, nickname, userId)
{
	clearBlocks();

	window.userDetail = new BX.Up.Music.UserDetail({
		rootNodeId: 'user-detail-container',
		fileRootDirectory: '/upload',
		nickname: nickname,
		userId: userId,
	});

	window.musicList = new BX.Up.Music.MusicList({
		rootNodeId: 'music-list-container',
		nickname: nickname,
		fileRootDirectory: '/upload',
		paginationBaseLink: baseLink,
		userId: userId,
	});

	history.pushState(null, null, baseLink);
}

function goToObjectDelete(userId, objectId='', baseLink='', showSuccessMessage=false,
						  showUnsuccessfulMessage= false)
{
	clearBlocks();

	window.objectDelete = new BX.Up.Music.ObjectDelete({
		rootNodeId: 'object-delete-container',
		id: objectId,
		userId: userId,
		baseLink: baseLink,
		showSuccessMessage: showSuccessMessage,
		showUnsuccessfulMessage: showUnsuccessfulMessage,
	});

	if (baseLink === '/delete/music')
	{
		window.musicDetail = new BX.Up.Music.MusicDetail({
			rootNodeId: 'music-detail-container',
			fileRootDirectory: '/upload',

			withCrossDelete: false,
			musicId: objectId,
			userId: userId,
		});
	}

	history.pushState(null, null, createLinkForDeleteObject(objectId, baseLink,
		showSuccessMessage, showUnsuccessfulMessage));
}

function goToMusicDetail(musicId, fileRootDirectory, dateFormat, userId)
{
	clearBlocks();

	window.musicDetail = new BX.Up.Music.MusicDetail({
		rootNodeId: 'music-detail-container',
		fileRootDirectory: fileRootDirectory,
		dateFormat: dateFormat,

		musicId: musicId,
		userId: userId,
	});

	history.pushState(null, null, '/post/' + musicId);
}

function goToPageNotFound(userId)
{
	clearBlocks();

	window.pageNotFound = new BX.Up.Music.PageNotFound({
		rootNodeId: 'page-not-found-container',
		userId: userId,
	});

	history.pushState(null, null, '/pageNotFound');
}

function goToMusicList(userId, searchString = '', genre = '')
{
	clearBlocks();

	window.musicList = new BX.Up.Music.MusicList({
		rootNodeId: 'music-list-container',
		fileRootDirectory: '/upload',
		paginationBaseLink: '/posts',
		searchString: searchString,
		genre: genre,
		userId: userId,
	});

	history.pushState(null, null,
		createLinkFromParts
		(
			'/posts',
			1,
			searchString,
			genre,
		),
	);
}

function goToUserList(userId, searchString = '')
{
	clearBlocks();

	window.userList = new BX.Up.Music.UserList({
		rootNodeId: 'user-list-container',
		fileRootDirectory: '/upload',
		paginationBaseLink: '/users',
		searchString: searchString,
		userId: userId,
	});

	history.pushState(null, null, '/users/1');
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
												UPDATE COMPONENTS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function updateMusicList(baseLink, pageNumber, genreCode, nickname, searchString)
{
	clearBlocks(['music-list-container', 'user-detail-container']);

	window.musicList.page = pageNumber;
	window.musicList.genre = genreCode;
	window.musicList.nickname = nickname;
	window.musicList.searchString = searchString;

	window.musicList.reload();

	history.pushState(null, null, baseLink);
}

function updateUserList(link, pageNumber, searchString)
{
	clearBlocks(['user-list-container']);

	window.userList.page = pageNumber;
	window.userList.searchString = searchString;

	window.userList.reload();

	history.pushState(null, null, link);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
												ADDITIONAL FUNCTIONS
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function clearBlocks(noClear = [])
{
	let allBlock = [
		'user-list-container',
		'page-not-found-container',
		'user-detail-container',
		'music-list-container',
		'music-detail-container',
		'object-delete-container',
	];

	allBlock.forEach(blockName => {
		if (!noClear.includes(blockName))
		{
			let node = document.getElementById(blockName);
			if (node)
			{
				node.innerHTML = '';
			}
		}
	});
}

function createLinkForDeleteObject(objectId='', baseLink='', showSuccessMessage=false,
								   showUnsuccessfulMessage=false)
{
	if (showSuccessMessage)
	{
		return '/delete/success';
	}

	if (showUnsuccessfulMessage)
	{
		return '/delete/unsuccessful';
	}

	return baseLink+'/'+objectId;
}

function decreaseDescription(description, allowedLength = 20)
{
	if (description.len > allowedLength)
	{
		description.slice(0, allowedLength);
		let positionEndWord = description.indexOf(' ');
		description.slice(0, positionEndWord);
		description += '..';
	}
	return description;
}

function createAbsoluteFilePath(fileRootDirectory, subDir, fileName)
{
	return fileRootDirectory + subDir + '/' + fileName;
}

function createLinkFromParts(baseLink, transitionPage, searchString="", genreCode="")
{
	let link = baseLink + '/' + transitionPage;

	if (searchString && genreCode)
	{
		link += '?search=' + searchString;
		link += '&&genre=' + genreCode;
	}
	else
	{
		link += searchString ? '?search=' + searchString : '';
		link += genreCode ? '?genre=' + genreCode : '';
	}

	return link;
}