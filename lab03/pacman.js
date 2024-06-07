const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createGame(n) {

    let array = Array(n).fill(".");

    let pacman = Math.floor(Math.random() * n);
    let fruit = Math.floor(Math.random() * n);

    while (pacman === fruit) {
        fruit = Math.floor(Math.random() * n);
    }

    let ghost = Math.floor(Math.random() * n);

    while (ghost === pacman || ghost === fruit) {
        ghost = Math.floor(Math.random() * n);
    }

    
    array[fruit] = "@";
    array[ghost] = "^."
    array[pacman] = "C"

    let maxScore = 50 + (n - 2)*10
    
    let game = [array,[pacman,ghost],0,maxScore,n];
    return game;
}

function moveLeft(game){

    let x = game[1][0];
    if (game[1][0] === 0) {
        game[1][0] = game[0].length - 1;
    } else {
        game[1][0] -= 1;
    }

    return processGame(game,x);
}

function moveRight(game){

    let x = game[1][0];
    if (game[1][0] === game[0].length - 1) {
        game[1][0] = 0;
    } else {
        game[1][0] += 1;
    }

    return processGame(game,x);  
}

function moveGhost(game){
    let r = Math.floor(Math.random() * 4);
    if(r === 1){
        if(game[0][game[1][1]] === "^."){
            game[0][game[1][1]] = ".";
        } else if(game[0][game[1][1]] === "^@"){
            game[0][game[1][1]] = "@";
        } else{
            game[0][game[1][1]] = "";
        }

        if (game[1][1] === 0) {
            game[1][1] = game[0].length - 1;
        } else {
            game[1][1] -= 1;
        }

        if(game[0][game[1][1]] === "."){
            game[0][game[1][1]] = "^.";
        } else if(game[0][game[1][1]] === "@"){
            game[0][game[1][1]] = "^@";
        } else{
            game[0][game[1][1]] = "^";
        }

    } else if (r === 2){

        if(game[0][game[1][1]] === "^."){
            game[0][game[1][1]] = ".";
        } else if(game[0][game[1][1]] === "^@"){
            game[0][game[1][1]] = "@";
        } else{
            game[0][game[1][1]] = "";
        }

        if (game[1][1] === game[0].length - 1) {
            game[1][1] = 0;
        } else {
            game[1][1] += 1;
        }

        if(game[0][game[1][1]] === "."){
            game[0][game[1][1]] = "^.";
        } else if(game[0][game[1][1]] === "@"){
            game[0][game[1][1]] = "^@";
        } else{
            game[0][game[1][1]] = "^";
        }
    }
    return game;
}

function processGame(game,x){

    game[0][x] = "";
    game = moveGhost(game);
    if (game[1][0] === game[1][1]){
        return("game over | eaten by ghost | score = " + game[2]);
    }
    else if (game[0][game[1][0]] === "."){
        game[0][game[1][0]] = "C";
        game[2] += 10;
        console.log(game[2])
        console.log(game[3])
        if (game[2] === game[3]){
            console.log("Level completed! score = " + game[2]);
            return newLevel(game);  
        }
        return game;
    }
    else if (game[0][game[1][0]] === "@"){
        game[0][game[1][0]] = "C";
        game[2] += 50;
        if (game[2] === game[3]){
            console.log("Level completed! score = " + game[2]);
            return newLevel(game);  
        }
        return game;
    }
    game[0][game[1][0]] = "C";
    return game;
}

function newLevel(game){
    let score = game[2];
    newGame = createGame(game[4]);
    newGame[3] = game[3] + score;
    newGame[2] = score;
    return newGame;
}

function main() {
    rl.question("Enter size of game: ", function(size) {
        let n = parseInt(size);
        let game = createGame(n);

        playGame(game);
    });
}

function playGame(game) {
    console.log("Current game:");
    console.log(game[0].join(' '));
    console.log("Score: " + game[2]);

    rl.question("Move Pacman left or right? (L/R): ", function(direction) {
        if (direction.toUpperCase() === "L") {
            game = moveLeft(game);
        } else if (direction.toUpperCase() === "R") {
            game = moveRight(game);
        } else {
            console.log("Invalid input. Please enter 'L' to move left or 'R' to move right.");
            playGame(game);
            return; 
        }

        if (typeof game === 'string') {
            console.log(game);
            rl.close();
        } else {
            playGame(game);
        }
    });
}


main();

