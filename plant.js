class Plant {
    constructor(state, automata) {
        this.automata = automata;
        this.hue = state.hue;
        this.size = 10;  
        this.grid = 100; 
        this.x = state.x;
        this.y = state.y;
        this.growth = 0; 
    } 

	mutate() {
        const newX = (this.x - 1 + randomInt(3) + this.grid) % this.grid;
        const newY = (this.y - 1 + randomInt(3) + this.grid) % this.grid;
        const newHue = (this.hue - 10 + randomInt(21) + 360) % 360;

        return { hue: newHue, x: newX, y: newY };
    }

    update() {
        const growthrate = parseInt(document.getElementById("plantgrowth").value);
        if (growthrate <= 0) return; 
        const growthIncrement = growthrate * 0.5;  
        if (this.growth < 80) this.growth += growthIncrement;
        if (this.growth >= 80) {
            const other = this.mutate(); 
            if (!this.automata.plants[other.x][other.y]) {
                this.automata.plants[other.x][other.y] = new Plant(other, this.automata);
                this.growth -= 80;
            } 
        }
    }

    draw(ctx) {
        // Drawing the plant on the canvas with a specified color and size
        ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
        ctx.strokeRect(this.x * this.size, this.y * this.size, this.size, this.size);
    }
};