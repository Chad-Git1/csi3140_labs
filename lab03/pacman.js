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

    let maxScore = 50 + (n - 3)*10
    
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

function processGame(game,x){

    /*if (game[1][0] === game[1][1]){
        return("game over | eaten by ghost | score = " + game[2]);
    }
    else{*/
        game[0][x] = "";
        if (game[2] === game[3]){
            console.log("Level completed! score = " + game[2]);
            return newLevel(game);
        }
        else if (game[0][game[1][0]] === "."){
            game[0][game[1][0]] = "C";
            game[2] += 10;
            return game;
        }
        else if (game[0][game[1][0]] === "@"){
            game[0][game[1][0]] = "C";
            game[2] += 50;
            return game;
        }
        game[0][game[1][0]] = "C";
        return game;
    }
//}

function newLevel(game){
    let score = game[2];
    game = createGame(game[4]);
    game[3] += score;
    game[2] = score;
    return game;
}