class Game {
    constructor() {
        this.grid = [
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null],
            [null, null, null, null]
        ];

        this.game_html = document.getElementById("grid");
        this.position = new Position(0, 0);

        this.tile = this.addTile(8);
        this.grid[this.position.x][this.position.y] = this.tile;
        this.setTilePosition(this.grid[this.position.x][this.position.y], this.position);
        console.log(this.grid);
    }

    addTile(value){
        var element = document.createElement("div");
        element.classList.add("tile");
        element.classList.add("tile-"+value);
        element.innerHTML = value;

        this.game_html.appendChild(element);
        return element;
    }

    setTilePosition(tile, position){
        tile.className = tile.className.replace(/position-.*/,'');
        tile.classList.add("position-" + position.x + "-" + position.y);
    }
}

var game = new Game();

document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        switch(keyName){
            case "ArrowUp":
                game.position.y -= 1;
                break;
            case "ArrowDown":
                game.position.y += 1;
                break;
            case "ArrowLeft":
                game.position.x -= 1;
                break;
            case "ArrowRight":
                game.position.x += 1;
                break;
        }
        game.setTilePosition(game.tile, game.position);
    },
    false,
);
