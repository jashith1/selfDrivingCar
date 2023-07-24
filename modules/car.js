class Car {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.speed = 0;
		this.acceleration = 0.2;
		this.reverseAcceleration = this.acceleration / 2;
		this.maxSpeed = 3;
		this.maxReverseSpeed = this.maxSpeed / 2;
		this.friction = 0.03;
		this.angle = 0;
		this.angularSpeed = 0.03;

		this.sensor = new Sensor(this, 10, 150, Math.PI / 2);
		this.controls = new Controls();
	}

	update(roadBorders) {
		this.#move();
		this.sensor.update(roadBorders);
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.angle);

		ctx.beginPath();
		ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
		ctx.fill();

		ctx.restore();

		this.sensor.draw(ctx);
	}

	#move() {
		if (this.controls.forward) {
			this.speed += this.acceleration;
		}
		if (this.controls.reverse) {
			this.speed -= this.reverseAcceleration;
		}
		if (this.speed > this.maxSpeed) {
			this.speed = this.maxSpeed;
		}
		if (this.speed < -this.maxReverseSpeed) {
			this.speed = -this.maxReverseSpeed;
		}
		if (Math.abs(this.speed) < this.friction) {
			this.speed = 0;
		}
		if (this.speed != 0) {
			this.speed -= this.friction * Math.sign(this.speed);
			const flip = this.speed > 0 ? 1 : -1;
			if (this.controls.left) {
				this.angle += this.angularSpeed * flip;
			}
			if (this.controls.right) {
				this.angle -= this.angularSpeed * flip;
			}
		}
		this.x -= this.speed * Math.sin(this.angle);
		this.y -= this.speed * Math.cos(this.angle);
	}
}
