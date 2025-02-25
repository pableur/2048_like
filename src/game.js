class Game {
    constructor() {
        console.log("new game");
        this.grid = new Map([
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []],
            [[], [], [], []]
        ]);

        this.moved = false;
        this.game_html = document.getElementById("grid");

        this.addTile(this.randomEmptyPosition(), this.randomValue());
        this.addTile(this.randomEmptyPosition(), this.randomValue());

        // this.addTile(new Position(0, 0), 2);
        // this.addTile(new Position(1, 0), 2);

        // this.addTile(new Position(0, 1), 2);
        // this.addTile(new Position(3, 1), 2);

        // this.addTile(new Position(0, 2), 2);

        // this.addTile(new Position(0, 3), 2);
        // this.addTile(new Position(1, 3), 2);
        // this.addTile(new Position(2, 3), 2);
    }

    randomValue(){
        return Math.random() < 0.9 ? 2 : 4;
    }

    randomEmptyPosition(){
        var positions = this.emptyPositions();
        return positions[Math.floor(Math.random() * positions.length)];
    }

    emptyPositions(){
        var positions = [];
        for (let l = 0; l < 4; l++) {
            for (let c = 0; c < 4; c++) {
                if(this.grid.get(new Position(c, l)).length === 0){
                    positions.push(new Position(c, l));
                }
            }
        }
        return positions;
    }

    addTile(position, value) {
        console.log('add tile ' + position + ', value ' + value);
        var tile = this.createTile(value);
        this.grid.set(position, [tile]);
        this.setTilePosition(tile, position);
        return tile
    }

    createTile(value){
        var element = document.createElement("div");
        element.classList.add("tile");
        element.classList.add("tile-"+value);
        element.innerHTML = value;

        this.game_html.appendChild(element);
        return element;
    }

    setTilePosition(tile, position){
        console.log('update position '+position);
        tile.className = tile.className.replace(/position-.*/,'');
        tile.classList.add("position-" + position.x + "-" + position.y);
    }

    setTileValue(tile, value){
        console.log('update value '+value);
        tile.className = tile.className.replace(/title-.*/,'');
        tile.classList.add("tile-" + value);
        tile.innerHTML = value;
        return tile;
    }

    move(vecteur){
        this.moved = true;
        const directions = {
            "1,0": { start: [3, 0], end: [-1, 4], step: [-1, 1] },
            "-1,0": { start: [0, 0], end: [4, 4], step: [1, 1] },
            "0,1": { start: [0, 3], end: [4, -1], step: [1, -1] },
            "0,-1": { start: [0, 0], end: [4, 4], step: [1, 1] }
        };

        const key = `${vecteur.x},${vecteur.y}`;
        const { start, end, step } = directions[key];

        for (let l = start[1]; l !== end[1]; l += step[1]) {
            for (let c = start[0]; c !== end[0]; c += step[0]) {
                let current_position = new Position(c, l);
                let element = this.grid.get(current_position).shift();
                if (!element) continue;

                var current_value = element.innerHTML;
                let new_position = new Position(current_position.x + vecteur.x, current_position.y + vecteur.y);
                while (new_position.inMap(this.grid) && this.grid.get(new_position).length < 2 &&  (this.grid.get(new_position).length === 0 || this.grid.get(new_position)[0]?.innerHTML == current_value)) {
                    current_position = new_position;
                    new_position = new Position(current_position.x + vecteur.x, current_position.y + vecteur.y);
                }
                console.log('current_position ' + current_position);
                console.log(this.grid);
                this.grid[current_position.y][current_position.x].push(element);
                this.setTilePosition(element, current_position);
            }
        }
    }

    fusion(){
        for (let l = 0; l < 4; l++) {
            for (let c = 0; c < 4; c++) {
                let current_position = new Position(c, l);
                let elements = this.grid.get(current_position);

                if(elements.length > 1){
                    let value = parseInt(elements[0].innerHTML) * 2;
                    for(var element of elements){
                        element.remove();
                    }
                    this.addTile(current_position, value)
                }
            }
        }
    }

    create_random_tile(){
        if(this.moved == false) return;
        
        var tile = this.addTile(this.randomEmptyPosition(), this.randomValue());
        this.moved = false;

        console.log('create random tile ' + tile);
    }
}

var in_transition = false;
document.addEventListener("transitionend", (event) => {
    console.log(`Transition terminée sur ${event.target.tagName}`);
    in_transition = false;
    game.fusion();
    game.create_random_tile();
});

document.addEventListener("transitionstart", (event) => {
    if (event.propertyName === "transform") {
        console.log(`Une transition sur ${event.propertyName} a commencé sur`, event.target);
        in_transition = true;
    }
});

var game = new Game();

document.addEventListener(
    "keydown",
    (event) => {
        if (in_transition) return;

        const keyName = event.key;
        switch(keyName){
            case "ArrowUp":
                game.move(new Position(0, -1));
                break;
            case "ArrowDown":
                game.move(new Position(0, 1));
                break;
            case "ArrowLeft":
                game.move(new Position(-1, 0));
                break;
            case "ArrowRight":
                game.move(new Position(1, 0));
                break;
        }
    },
    false,
);
