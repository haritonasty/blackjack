const readLine = require('readline');
const Card = require('./Card');
const fs = require('fs');

const rl = readLine.createInterface({
    input: process.stdin
});

const cards = [
    new Card("2", 2),
    new Card("3", 3),
    new Card("4", 4),
    new Card("5", 5),
    new Card("6", 6),
    new Card("7", 7),
    new Card("8", 8),
    new Card("9", 9),
    new Card("10", 10),
    new Card("jack", 10),
    new Card("lady", 10),
    new Card("king", 10),
    new Card("ace", 11)
];

module.exports.readLine = () => {
    return new Promise(resolve => {
        rl.once('line', line => {
            resolve(line);
        });
    });
};

module.exports.checkParams = params => !(!params || !params.users || !params.games);

module.exports.getCard = () => {
    return cards[Math.floor(Math.random() * (cards.length - 1))]
};

module.exports.appendFileAsync = (path, data) => {
    return new Promise((res, rej) => {
        fs.appendFile(path, data, 'utf8', err => {
            if (err)
                rej(err);
            res();
        })
    })
};