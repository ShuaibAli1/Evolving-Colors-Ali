class Automata {
	constructor() {
		this.plants = [];
		this.length = 100;
        this.width = 100;
        this.plants = Array.from({length: this.length}, () => 
        Array.from({width: this.width}, () => null));
	}
	
	
	clearPlants() {
        let i = 0;
        while (i < this.width) {
            let j = 0;
            while (j < this.length) {
                this.plants[i][j] = null;
                j++;
            }
            i++;
        }
    }

	addPlant() {
		let i = randomInt(this.width);
		let j = randomInt(this.length);
		let color = randomInt(360);
		this.plants[i][j] = new Plant({hue: color, x: i, y: j}, this)
	}

	
	update() {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                plant?.update();
                if (Math.random() < 0.001) {
                    this.plants[x][y] = null;
                }
            });
        });
    }

	draw(ctx) {
        this.plants.forEach((row, x) => {
            row.forEach((plant, y) => {
                plant?.draw(ctx);
            });
        });
    }
	
};