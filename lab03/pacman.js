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

    array[pacman] = "C";
    array[fruit] = "@";
    array[ghost] = "^.";

    return array;
}
