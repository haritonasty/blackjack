const minimist = require('minimist');
const util = require('./util');
const User = require('./User');
const Game = require("./Game").Game;
const appendFileAsync = require("./util").appendFileAsync;

const params = minimist(process.argv.slice(2), {
    alias: {
        'help': 'h',
        'users': 'u',
        'games': 'g'
    },
    default: {
        games: 5,
        users: 2
    },
    unknown: (arg) => {
        console.error('Unknown option: ', arg);
        return false
    }
});

async function main() {
    if (!util.checkParams(params)) {
        console.error("Params are not valid");
        console.log("For example: node app.js --users 2 --games 10");
        return;
    }

    console.log("Welcome to BlackJack");
    console.log(`Amount of users: ${params.users}`);
    console.log(`Amount of games: ${params.games}\n`);

    let users = [];
    for (let i = 0; i < params.users; i++) {
        users.push(new User(`Player_${i + 1}`));
    }

    for (let i = 0; i < params.games; i++) {
        console.log(`/-/-/-/- Game № ${i + 1} /-/-/-/-\n`);
        await appendFileAsync('log.txt', `Game № ${i + 1}\n`);
        let game = new Game(users);
        await game.start();
    }

}

main().then(() => {
    console.log("Good bye");
}).catch(err => {
    console.error("Something went wrong!");
    console.error(err);
});
