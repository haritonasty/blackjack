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
                // let action = "pull";

                switch (action) {
                    case "pass":
                        Game.pass(user);
                        break;
                    case "pull":
                        Game.pull(user);
                        break;
                    default:
                        console.log("Action is invalid");
                        currUser--;
                        break;
                }
            }

            numberActiveUsers = this.users.reduce((total, user) => total + !user.pass, 0);
            currUser++;
            if (currUser === maxUser) {
                // console.log("-/-/inc-/-/");
                currUser = 0;
            }
        }

        let maxScores = this.users.reduce((total, user) => user.scores > total && user.scores <= 21 ? user.scores : total, 0);
        let winner = this.users.find(user => user.scores === maxScores);
        console.log(`Winner is ${winner.name}`);
        await appendFileAsync('log.txt', `Winner is ${winner.name}`);
        winner.wins++;
    }

    reset() {
        this.users.forEach(user => user.reset());
    }

    static pass(user) {
        user.pass = true;
    }

    static pull(user) {
        user.scores += getCard().value;
        if (user.scores > 21) {
            console.log(`${user.name} scored more than 21 and out of the game!`);
            this.pass(user);
        } else {
            console.log(`${user.name} scores: ${user.scores}`);
        }
    }
};