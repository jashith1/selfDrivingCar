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
		this.damaged = false;

		this.sensor = new Sensor(this, 10, 150, Math.PI / 2);
		this.controls = new Controls();
	}

	update(roadBorders) {
		if (!this.damaged) {
			this.#move();
			this.polygon = this.#createPolygon();
			this.damaged = this.#assessDamage(roadBorders);
		}
		this.sensor.update(roadBorders);
	}

	#assessDamage(roadBorders) {
		for (let i = 0; i < roadBorders.length; i++) {
			if (polyIntersect(this.polygon, roadBorders[i])) return true;
		}
		return false;
	}

	#createPolygon() {
		const points = [];
		const rad = Math.hypot(this.width, this.height) / 2;
		const alpha = Math.atan2(this.width, this.height);
		points.push({
			x: this.x - Math.sin(this.angle - alpha) * rad,
			y: this.y - Math.cos(this.angle - alpha) * rad,
		});
		points.push({
			x: this.x - Math.sin(this.angle + alpha) * rad,
			y: this.y - Math.cos(this.angle + alpha) * rad,
		});
		points.push({
			x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
		});
		points.push({
			x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
			y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
		});
		return points;
	}

	draw(ctx) {
		if (this.damaged) ctx.fillStyle = 'gray';
		else ctx.fillStyle = 'black';
		ctx.beginPath();
		ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
		for (let i = 1; i < this.polygon.length; i++) {
			ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
		}
		ctx.fill();

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
