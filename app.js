const track = document.getElementById('track');
const startButton = document.getElementById('start-button');
const trackWidth = track.offsetWidth;
const trackPadding = parseFloat(window.getComputedStyle(track, null).getPropertyValue('padding-left')) * 2;
let numberOfRacers = 10;
const resetButton = document.getElementById('reset');

class Racer {
	constructor(name) {
		this.name = name;
		this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		this.speed = Math.floor(Math.random() * 6);
		this.buildRacer();
		allRacers.push(this);
	}

	buildRacer() {
		let body = document.createElement('div');
		body.className = 'racer';
		body.style.backgroundColor = this.color;
		body.style.borderLeftColor = this.color;
		body.id = this.name;
		track.append(body);
	}

	move() {
		const racer = document.getElementById(this.name);
		let position = 0;
		const interval = setInterval(frame, 3 + this.speed);
		function frame() {
			if (position === trackWidth - racer.offsetWidth - trackPadding) {
				clearInterval(interval);
			} else {
				position++;
				racer.style.left = position + 'px';
			}
		}
	}
}

const allRacers = [];

function createRacers(numberOfRacers) {
	for (let i = 0; i < numberOfRacers; i++) {
		new Racer(i);
	}
}

console.log(allRacers);

function startRace() {
	for (let i = 0; i < allRacers.length; i++) {
		allRacers[i].move();
	}
}

createRacers(numberOfRacers);

function reset() {
	while (track.firstChild) {
		track.removeChild(track.lastChild);
	}
	allRacers.splice(0, allRacers.length);
	createRacers(numberOfRacers);
}

startButton.addEventListener('click', startRace);
resetButton.addEventListener('click', reset);
