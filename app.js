const track = document.getElementById('track');
const colors = ['crimson', 'green', 'blue', 'fuchsia']
class Racer {
	constructor(name) {
		this.name = name;
		this.color = colors[Math.floor(Math.random() * Math.floor(colors.length))];
    this.display()
	}

	display() {
		let body = document.createElement('div')
		body.classList.add('racer');
		body.style.backgroundColor = this.color;
		body.style.borderLeftColor = this.color;
		track.append(body);
		console.log(Math.floor(Math.random() * Math.floor(colors.length)))
  }

}

const racer1 = new Racer('1');
const racer2 = new Racer('2');
