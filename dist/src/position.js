
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    inMap(map) {
        return this.x >= 0 && this.y >= 0 && this.x < map.grid[0].length && this.y < map.grid.length;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    add(other) {
        return new Position(this.x + other.x, this.y + other.y);
    }

    subtract(other) {
        return new Position(this.x - other.x, this.y - other.y);
    }

    toArray() {
        return [this.x, this.y];
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    hash() {
        return `${this.x},${this.y}`;
    }

    eql(other) {
        return this.equals(other);
    }
}