class Animat {
	constructor(state, automata) {
        this.automata = automata;
        this.hue = state.hue;
        this.x = state.x;
        this.y = state.y;
        this.energy = 50;
        this.dimension = 100;
        this.cellSize = 10;
    }


	move() {
        let bestX = this.x;
        let bestY = this.y;
        let minDifference = Infinity;
        let i = -1;

        while (i <= 1) {
            let j = -1;
            while (j <= 1) {
                const newX = (this.x + i + this.dimension) % this.dimension;
                const newY = (this.y + j + this.dimension) % this.dimension;
                const plant = this.automata.plants[newX][newY];

                if (!plant) {
                    if (Infinity < minDifference) {
                        minDifference = Infinity;
                        bestX = newX;
                        bestY = newY;
                    }
                } else {
                    const hueDiff = Math.abs(this.hue - plant.hue);
                    if (hueDiff < minDifference) {
                        minDifference = hueDiff;
                        bestX = newX;
                        bestY = newY;
                    }
                }
                j++;
            }
            i++;
        }

        this.x = bestX;
        this.y = bestY;
    }


	mutate() {
        const getRandomOffset = (range) => Math.floor(Math.random() * range) - Math.floor(range / 2);
        const newX = (this.x + getRandomOffset(3) + this.dimension) % this.dimension;
        const newY = (this.y + getRandomOffset(3) + this.dimension) % this.dimension;
        const newHue = (this.hue + getRandomOffset(21) + 360) % 360;
		
		return { hue: newHue, x: newX, y: newY };
    }

	update() {
		this.move();
		this.eat();
		this.reproduce();
		if(this.energy < 1 || Math.random() < 0.01) this.die();
	}


	reproduce() {
		if(this.energy > 80) {
			this.energy -= 80;

			gameEngine.addEntity(new Animat(this.mutate(),this.automata));
		}
	}
	die() {
		this.removeFromWorld = true;
	}
	
	
	eat() {
		const growthrate = parseInt(document.getElementById("animatgrowth").value);
		const selectivity = parseInt(document.getElementById("animatselection").value);
		const plant = this.automata.plants[this.x][this.y];
		const diff = this.hueDifference(plant);
	
		if(plant && diff >= selectivity) {
			this.automata.plants[this.x][this.y] = null;
			this.energy += 80 / growthrate * diff;
		}
	}

	hueDifference(plant) {
		let diff;
		if (plant) {
			diff = Math.abs(this.hue - plant.hue);
		} else {
			diff = 180;
		}
		if (diff > 180) {
			diff = 360 - diff; 
		}
		return (90 - diff) / 90;
	}


	draw(ctx) {
        const centerX = (this.x + 0.5) * this.cellSize;
        const centerY = (this.y + 0.5) * this.cellSize;
        const radius = this.cellSize / 2 - 1;  
		ctx.fillStyle = `hsl(${this.hue}, 75%, 50%)`; 
        ctx.strokeStyle = "light gray";  
		ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
	
};