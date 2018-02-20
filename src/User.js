module.exports = class {
    constructor(name) {
        this.name = name;
        this.scores = 0;
        this.wins = 0;
        this.pass = false;
    }

    reset() {
        this.pass = false;
        this.scores = 0;
    }
};