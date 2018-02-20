const appendFileAsync = require("./util").appendFileAsync;
const getCard = require("./util").getCard;
const readLine = require("./util").readLine;

module.exports.Game = class Game {
    constructor(users) {
        this.users = users;
    }

    async start() {
        this.reset();

        let currUser = 0;
        let maxUser = this.users.length;
        let numberActiveUsers = this.users.length;

        while (numberActiveUsers > 0) {
            let user = this.users[currUser];

            if (!user.pass) {
                console.log(`${user.name} is playing now: [pass/pull]`);
                let action = await readLine();
                // let action = "pass";

                switch (action) {
                    case "pass":
                        Game.pass(user);
                        break;
                    case "pull":
                        Game.pull(user);
                        break;
                    default:
                        console.log("Action is invalid. Try again!");
                        currUser--;
                        break;
                }
            }

            numberActiveUsers = this.users.reduce((total, user) => total + !user.pass, 0);
            if (numberActiveUsers === 0) break;
            currUser++;
            if (currUser === maxUser) {
                currUser = 0;
            }
        }

        await this.results();
    }

    async results() {
        let maxScores = this.users.reduce((total, user) => user.scores > total && user.scores <= 21 ? user.scores : total, 0);
        let winners = this.users.filter(user => user.scores === maxScores);
        if (winners.length === 1) {
            console.log(`Winner is ${winners[0].name}`);
            await appendFileAsync('log.txt', `Winner is ${winners[0].name}\n`);
        }
        else if (winners.length > 1 && winners[0].scores !== 0) {
            console.log(`/-/-/-/- Winners are: /-/-/-\n`);
            await appendFileAsync('log.txt', `Winners are:\n`);
            winners.forEach(async winner => {
                console.log(`${winner.name}\n`);
                await appendFileAsync('log.txt', `${winner.name}\n`);
            });
        } else {
            console.log(' /-/-/-/ dead heat /-/-/-/-\n');
            await appendFileAsync('log.txt', `dead heat\n`);
        }
    }

    reset() {
        this.users.forEach(user => user.reset());
    }

    static pass(user) {
        user.pass = true;
    }

    static async pull(user) {
        user.scores += getCard().value;
        if (user.scores > 21) {
            console.log(`${user.name} scored more than 21 and out of the game!\n`);
            await appendFileAsync('log.txt', `${user.name} scored more than 21 and out of the game!\n`);
            this.pass(user);
        } else {
            console.log(`${user.name} scores: ${user.scores}\n`);
            await appendFileAsync('log.txt', `${user.name} scores: ${user.scores}\n`);
        }
    }
};