const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const dimension = 100;

ASSET_MANAGER.downloadAll(() => {
    const gameCanvas = document.getElementById("gameWorld");
    const gameContext = gameCanvas.getContext("2d");
    gameEngine.entities = [];
    let ecosystemAutomata = new Automata();
    gameEngine.addEntity(ecosystemAutomata);

    document.getElementById("plant").addEventListener("click", () => {
        ecosystemAutomata.addPlant();
    });

    document.getElementById("animat").addEventListener("click", () => {
        const randomX = randomInt(dimension);
        const randomY = randomInt(dimension);
        const randomHue = randomInt(360);
        gameEngine.addEntity(new Animat({x: randomX, y: randomY, hue: randomHue}, ecosystemAutomata));
    });

    document.getElementById("clear").addEventListener("click", () => {
        gameEngine.clearAnimats();
        ecosystemAutomata.clearPlants();
    });

    gameEngine.init(gameContext);
    gameEngine.start();
});
