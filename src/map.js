class Map {
    constructor(grid) {
        console.log("new map");
        this.grid = grid;
        this.width = grid[0].length;
        this.height = grid.length;
    }

    set(pos, c) {
        this.grid[pos.y][pos.x] = c;
    }

    get(pos) {
        return this.grid[pos.y][pos.x];
    }

    get_cell_asset(pos) {
        let cell = this.get(pos);
        if(cell === '#'){
            return 'assets/WallRound_Beige.png';
        }else if(cell === 'E'){
            return 'assets/EndPoint_Red.png';
        }else if(cell === 'C'){
            return 'assets/Crate_Brown.png';
        }else if(cell === 'H'){
            return 'assets/Character4.png';
        }else{
            return 'assets/Ground_Sand.png';
        }
    }

    toString() {
        return this.grid.map(line => line.join('')).join('\n');
    }
}