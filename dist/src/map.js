class Map {
    constructor(grid) {
        console.log("new map");
        this.grid = grid;
        this.width = grid[0].length;
        this.height = grid.length;

        // Retourne un Proxy qui intercepte les accès avec []
        return new Proxy(this, {
            get(target, prop) {
                if (typeof prop === "string" && !isNaN(prop)) {
                    return target.grid[prop]; // Redirige l'accès sur this.grid
                }
                return target[prop]; // Accès normal aux autres propriétés/méthodes
            }
        });
    }

    set(pos, c) {
        this.grid[pos.y][pos.x] = c;
    }

    get(pos) {
        return this.grid[pos.y][pos.x];
    }

    toString() {
        return this.grid.map(line => line.join('')).join('\n');
    }
}