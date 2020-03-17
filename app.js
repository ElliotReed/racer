const track = document.getElementById('race-track');
const startButton = document.getElementById('start-button');
const trackWidth = track.offsetWidth;
const trackPadding = parseFloat(window.getComputedStyle(track, null).getPropertyValue('padding-left')) * 2;
const resetButton = document.getElementById('reset-button');
const resultsList = document.getElementById('results');
const allRacers = [];
const finishedRacers = [];
let numberOfRacers = 7;
let winner = null;

class Racer {
	constructor(name) {
		this.name = name + 1;
		this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		this.speed = Math.floor(Math.random() * 6);
		this.startSkill = Math.floor(Math.random() * 3);
		this.buildRacer();
		allRacers.push(this);
		this.startTime;
		this.finishTime;
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
		const thisRacer = this;
		const interval = setInterval(frame, 5 + this.speed);
		function frame() {
			if (position === trackWidth - racer.offsetWidth - trackPadding) {
				clearInterval(interval);
				thisRacer.finishTime = Date.now();
				finishRace(thisRacer);
			} else {
				position++;
				racer.style.left = position + 'px';
			}
		}
	}
}

function createRacers(numberOfRacers) {
	for (let i = 0; i < numberOfRacers; i++) {
		new Racer(i);
	}
}

function startRace() {
	for (let i = 0; i < allRacers.length; i++) {
		allRacers[i].startTime = Date.now();
		allRacers[i].move();
	}
}

function finishRace(racer) {
	finishedRacers.push(racer);
	if (finishedRacers.length === allRacers.length) {
		finishedRacers.sort(function(a, b) {
			const raceTimeA = a.finishTime - a.startTime;
			const raceTimeB = b.finishTime - b.startTime;
			console.log(raceTimeA);
			return raceTimeA - raceTimeB;
		});
		displayRaceResults();
	}
}

function displayRaceResults() {
	for (let i = 0; i < finishedRacers.length; i++) {
		const resultItem = document.createElement('tr');
		const result = document.createElement('td');
		const place = document.createElement('td');
		const time = document.createElement('td');

		result.innerText = finishedRacers[i].name;
		place.innerText = i + 1;
		time.innerText = finishedRacers[i].finishTime - finishedRacers[i].startTime;
		resultItem.append(place);
		resultItem.append(result);
		resultItem.append(time);
		resultsList.append(resultItem);
	}
}

function reset() {
	while (track.firstChild) {
		track.removeChild(track.lastChild);
	}

	while (resultsList.firstChild) {
		resultsList.removeChild(resultsList.lastChild);
	}

	allRacers.splice(0, allRacers.length);
	finishedRacers.splice(0, finishedRacers.length);
	createRacers(numberOfRacers);
}

createRacers(numberOfRacers);

startButton.addEventListener('click', startRace);
resetButton.addEventListener('click', reset);
