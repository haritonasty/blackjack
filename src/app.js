const minimist = require('minimist');
const fs = require('fs');
const util = require('./util');

const params = minimist(process.argv.slice(2));


async function main() {
    if (!util.checkParams(params)) {
        console.log("Params are not valid");
        console.log("For example: node app.js --users 2 --games 10");
        return;
    }

    console.log("Welcome to BlackJack");
    console.log(`Amount of users: ${params.users}`);
    console.log(`Amount of games: ${params.games}`);
    console.log();

    for (let i = 0; i < params.games; i++) {

    }
}

main().then(() => {
    console.log("Good bye");
}).catch(err => {
    console.error("Something went wrong!");
    console.error(err);
});