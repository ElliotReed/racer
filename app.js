const track = document.getElementById('race-track');
const startButton = document.getElementById('start-button');
const trackWidth = track.offsetWidth;
const trackPadding = parseFloat(window.getComputedStyle(track, null).getPropertyValue('padding-left')) * 2;
const resultsList = document.getElementById('results');
const closeButton = document.getElementById('close-button');
const modal = document.querySelector('.modal');

const allRacers = [];
const finishedRacers = [];
let numberOfRacers = 7;
let winner = null;

class Racer {
	constructor(name) {
		this.name = name + 1;
		this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		this.speed = Math.floor(Math.random() * 5);
		this.startSkill = Math.floor(Math.random() * 3);
		this.engine = Math.floor(Math.random() * 2);
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
		const thisRacer = this;
		let position = this.startSkill;
		let timeoutID;
		let baseTime = 5;

		function timeoutCaller() {
			timeoutID = setTimeout(loop, Math.max(baseTime - parseInt(thisRacer.speed, 10), 0));
		}

		function callFinishers() {
			clearTimeout(timeoutID);
			thisRacer.finishTime = Date.now();
			finishRace(thisRacer);
		}

		function checkEngineStatus() {
			if (thisRacer.engine === 0) {
				if (Math.floor(Math.random() * 2) === 1) {
					thisRacer.engine = 1;
					thisRacer.speed = 0;
				}
				thisRacer.speed--;
			} else if (thisRacer.engine === 1) {
				if (Math.floor(Math.random() * 4) === 0) {
					thisRacer.engine = 0;
				}
				thisRacer.speed++;
				position++;
			}
		}

		function loop() {
			position++;
			racer.style.left = position + 'px';
			if (position === trackWidth - racer.offsetWidth - trackPadding) {
				callFinishers();
				return;
			} else {
				if (position % 63 === 0) {
					checkEngineStatus();
				}
			}
			timeoutCaller();
		}
		loop();
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
		const timeElement = document.createElement('td');
		const time = (finishedRacers[i].finishTime - finishedRacers[i].startTime) / 1000;
		result.innerText = finishedRacers[i].name;
		place.innerText = i + 1;
		timeElement.innerText = `${time} seconds`;
		resultItem.append(place);
		resultItem.append(result);
		resultItem.append(timeElement);
		resultsList.append(resultItem);
	}

	modal.classList.add('show-modal');
}

function reset() {
	modal.classList.remove('show-modal');

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
closeButton.addEventListener('click', reset);
