const track = document.getElementById('race-track');
const startButton = document.getElementById('start-button');
const trackWidth = track.offsetWidth;
const trackPadding = parseFloat(window.getComputedStyle(track, null).getPropertyValue('padding-left')) * 2;
let numberOfRacers = 10;
const resetButton = document.getElementById('reset-button');

class Racer {
	constructor(name) {
		this.name = name + 1;
		this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		this.speed = Math.floor(Math.random() * 6);
		this.startSkill = Math.floor(Math.random() * 3);
		this.buildRacer();
		allRacers.push(this);
	}

	buildRacer() {
		const body = document.createElement('div');
		const logo = document.createElement('div');
		const frontWheels = document.createElement('div');
		const rearWheels = document.createElement('div');
		const windshield = document.createElement('div');

		body.id = this.name;
		body.className = 'racer';
		body.style.backgroundColor = this.color;
		body.style.borderLeftColor = this.color;

		logo.className = 'logo';
		logo.innerText = this.name;

		frontWheels.className = 'front-wheels';
		rearWheels.className = 'rear-wheels';

		windshield.className = 'windshield';
		windshield.style.borderColor = this.color;

		body.append(windshield);
		body.append(frontWheels);
		body.append(rearWheels);
		body.append(logo);
		track.append(body);
	}

	move() {
		const racer = document.getElementById(this.name);
		let position = this.startSkill;
		const interval = setInterval(frame, 5 + this.speed);
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
