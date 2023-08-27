import {Type, Tag} from 'main.core';

export class AudioPlayer
{
	playing = false;
	currentTime = 0.0;
	duration = 0;
	volume = 0.4;
	constructor(options = {})
	{
		this.rootNodeId = options.rootNodeId;
		this.trackSrc = options.trackSrc;
		this.trackName = options.trackName;
		this.rootNode = document.getElementById(this.rootNodeId);
		this.currentTime = 0.0;
		this.render();
		this.initializeAudio();
		this.attachEvents();
	}

	updateSrc(src)
	{
		this.trackSrc = src;
	}

	updateName(name)
	{
		if (name.length > 78) {
			this.trackName = name.slice(0, 78) + '...';
		} else {
			this.trackName = name;
		}
	}

	initializeAudio() {
		this.volumeBar.value = 0.4;
		this.audidCtx = new AudioContext();

		this.track = this.audidCtx.createMediaElementSource(this.audio);
		this.gainNode = this.audidCtx.createGain();

		this.track.connect(this.gainNode).connect(this.audidCtx.destination);

		this.changeVolume();
	}

	attachEvents() {
		this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this), false);
		this.volumeBar.addEventListener('input', this.changeVolume.bind(this), false);
		this.progressBar.addEventListener('input', () => {
			this.seekTo(this.progressBar.value);
		}, false);

		this.audio.addEventListener('loadedmetadata', () => {
			this.duration = this.audio.duration;
			this.progressBar.max = this.duration;

			const secs = parseInt(`${this.duration % 60}`, 10);
			const mins = parseInt(`${(this.duration/60) % 60}`, 10);
			const formattedSecs = (secs < 10) ? `0${secs}` : secs;

			this.durationEl.textContent = `${mins}:${formattedSecs}`;
		})

		this.audio.addEventListener('timeupdate', () => {
			this.updateAudioTime(this.audio.currentTime);
		})

		this.audio.addEventListener('ended', () => {
			this.playing = false;
			this.playPauseBtn.textContent = 'play';
			this.playPauseBtn.classList.remove('playing');
		}, false);

		this.audio.addEventListener('play', () => {
			this.playing = true;
			this.playPauseBtn.textContent = 'pause';
			this.playPauseBtn.classList.add('playing');
		}, false);
	}

	async togglePlay() {
		if (this.audidCtx.state === 'suspended') {
			await this.audidCtx.resume();
		}

		if (this.playing) {
			await this.audio.pause();
			this.playing = false;
			this.playPauseBtn.textContent = 'play';
			this.playPauseBtn.classList.remove('playing');
		} else {
			await this.audio.play();
			this.playing = true;
			this.playPauseBtn.textContent = 'pause';
			this.playPauseBtn.classList.add('playing');
		}

		const audioCurrentTime = sessionStorage.getItem('audioCurrentTime');
		if (audioCurrentTime) {
			this.audio.currentTime = audioCurrentTime;
			sessionStorage.removeItem('audioCurrentTime');
		}
	}

	seekTo(value) {
		this.audio.currentTime = value;
	}

	updateAudioTime(time) {
		this.currentTime = time;
		this.progressBar.value = this.currentTime;
		const secs = `${parseInt(`${time % 60}`, 10)}`.padStart(2, '0');
		const mins = parseInt((time / 60) % 60, 10);
		this.currentTimeEl.textContent = `${mins}:${secs}`;
	}

	changeVolume() {
		this.volume = this.volumeBar.value;

		if (Number(this.volume) > 1) {
			this.volumeBar.parentNode.className = 'volume-bar over';
		} else if(Number(this.volume) > 0) {
			this.volumeBar.parentNode.className = 'volume-bar half';
		} else {
			this.volumeBar.parentNode.className = 'volume-bar';
		}

		this.gainNode.gain.value = this.volume;
	}

	render()
	{
		this.rootNode.innerHTML = `
            <figure class="audio-player">
            	<figcaption class="audio-name">${this.trackName}</figcaption>
            	<audio src="${this.trackSrc}" style="display:none"></audio>
            	<button class="play-btn" type="button">play</button>
            	<div class="progress-indicator">
                	<span class="current-time">0:00</span>
                	<input type="range" max="100" value="0" class="progress-bar">
                	<span class="duration">0:00</span>
            	</div>
            	<div class="volume-bar">
                	<input type="range" min="0" max="2" step="0.01" value="${this.volume}" class="volume-field">
            	</div>
            </figure>
            `;

		this.audio = this.rootNode.querySelector('audio');
		this.playPauseBtn = this.rootNode.querySelector('.play-btn');
		this.volumeBar = this.rootNode.querySelector('.volume-field');
		this.progressIndicator = this.rootNode.querySelector('.progress-indicator');
		this.currentTimeEl = this.progressIndicator.children[0];
		this.progressBar = this.progressIndicator.children[1];
		this.durationEl = this.progressIndicator.children[2];
	}
}