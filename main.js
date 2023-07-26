const canvas = document.getElementById('myCanvas');
canvas.width = 200;

const lanes = 3;

const ctx = canvas.getContext('2d');
const road = new Road(canvas.width / 2, canvas.width * 0.9, lanes);
const car = new Car(road.getLaneCenter(Math.floor(lanes / 2)), 100, 30, 50, 'player');
const traffic = [new Car(road.getLaneCenter(Math.floor(lanes / 2)), -100, 30, 50, 'trafficCar')];

animate();

function animate() {
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].update(road.borders, []);
	}
	car.update(road.borders, traffic);
	canvas.height = window.innerHeight;

	ctx.save();
	ctx.translate(0, -car.y + canvas.height * 0.7);

	road.draw(ctx);
	for (let i = 0; i < traffic.length; i++) {
		traffic[i].draw(ctx, 'red');
	}
	car.draw(ctx, 'blue');

	ctx.restore();
	requestAnimationFrame(animate);
}
