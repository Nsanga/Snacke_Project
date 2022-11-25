let snake = [{ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) }];
let food = randomFood();
let direction = { x: 0, y: 0 };
let touche;
var lastPaintTime = 0;
let SNAKE_SPEED = 2;
const zone = document.querySelector('.zone');
const scoreSpan = document.querySelector('#score1');
score = 0;

//Dessiner le serpent 
function drawSnake() {
    snake.forEach((item, index) => {
        let cellSnake = document.createElement('div');
        cellSnake.style.gridColumnStart = item.x;
        cellSnake.style.gridRowStart = item.y;
        if (index == 0) {
            cellSnake.classList.add("head");
        } else {
            cellSnake.classList.add("bodySnake");
        }
        zone.appendChild(cellSnake);
    });
}

//Placer la pomme à une position aléatoire de le zone de jeu
function randomFood() {
    return ({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
}

//Afficher la pomme
function showFood() {
    let cellFood = document.createElement("div");
    cellFood.style.gridColumnStart = food.x;
    cellFood.style.gridRowStart = food.y;
    cellFood.classList.add("pomme");
    zone.appendChild(cellFood);
}
//Configuration des touches directionnelles du clavier
function keyboardDirection() {
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "ArrowDown":
                if (touche == "ArrowUp") {
                    break;
                }
                direction.x = 0;
                direction.y = 1;
                touche = e.key;
                break;
            case "ArrowUp":
                if (touche == "ArrowDown") {
                    break;
                }
                direction.x = 0;
                direction.y = -1;
                touche = e.key;
                break;
            case "ArrowRight":
                if (touche == "ArrowLeft") {
                    break;
                }
                direction.x = 1;
                direction.y = 0;
                touche = e.key;
                break;
            case "ArrowLeft":
                if (touche == "ArrowRight") {
                    break;
                }
                direction.x = -1;
                direction.y = 0;
                touche = e.key;
                break;
            default:
                direction.x = 0;
                direction.y = 0;

        }
    })
    return direction;
}

//Déplacer le serpent
function move() {
    direction = keyboardDirection();
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x = snake[0].x + direction.x;
    snake[0].y = snake[0].y + direction.y;
    gameOver();
}

//Faire grandir le serpent
function growingUp() {
    snake.push(snake[snake.length - 1]);
}

//Nourrir le serpent
function eatFood() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        food = randomFood();
        growingUp();
        score += 1;
    }
    scoreSpan.textContent = score;
}

//appel des fonctions drawSnake, showFood et eatFood
function show() {
    zone.innerHTML = "";
    drawSnake();
    showFood();
    eatFood();
}

//Collision entre la tete du serpent et son corps
function collisionBody() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
}

//Collision entre la tete du serpent et les bordures de la zone de jeu
function collision() {
    if (snake[0].x < 0 || snake[0].x > 20 || snake[0].y < 0 || snake[0].y > 20) {
        return true;
    }
}

//Fin de la partie après collision
function gameOver() {
    if (collisionBody() || collision()) {
        location.reload();
        alert('Fin de la partie');
    }
}

//Mettre à jour une frame
function paint(currentTime) {
    var TimeSeconds = (currentTime - lastPaintTime) / 1000;
    requestAnimationFrame(paint);
    if (TimeSeconds < 1 / SNAKE_SPEED) return;
    lastPaintTime = currentTime;

    show();
    move();

}

paint();
window.requestAnimationFrame(paint); //Animer la frame paint
