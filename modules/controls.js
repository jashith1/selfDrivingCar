class Controls {
	constructor() {
		this.forward = false;
		this.left = false;
		this.reverse = false;
		this.right = false;

		this.#addKeyboardListener();
	}

	#addKeyboardListener() {
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
				case 'w':
					this.forward = true;
					break;
				case 'a':
					this.left = true;
					break;
				case 's':
					this.reverse = true;
					break;
				case 'd':
					this.right = true;
					break;
			}
		});

		document.addEventListener('keyup', (event) => {
			switch (event.key) {
				case 'w':
					this.forward = false;
					break;
				case 'a':
					this.left = false;
					break;
				case 's':
					this.reverse = false;
					break;
				case 'd':
					this.right = false;
					break;
			}
		});
	}
}
