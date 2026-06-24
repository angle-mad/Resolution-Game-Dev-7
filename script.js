const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

// create a player object (looks like a python dictionary!!)
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    dx: 0
};

// store items to collect
const items = [];
const badItems = [];
let score = 0;

// draw your player
function drawPlayer() {
    ctx.fillStyle = '#e6c719';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    // draw a cuteee face
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x + 25, player.y + 15, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(player.x+5, player.y + 30, player.width -10, player.height - 45);
    ctx.fillStyle = '#e237c6';
    ctx.beginPath();
    ctx.arc(player.x + 20, player.y + 30, 6, 0, Math.PI * 1);
    ctx.fill();
}

// draw your score
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// update the player's position
function updatePlayer() {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

//Good and Bad Items stuff

// draw the items
function drawItems() {
    items.forEach((item, index) => {
        ctx.fillStyle = '#3acd3a';
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// update the items
function updateItems() {
    items.forEach((item, index) => {
        item.y += item.dy;
        // check if it collides with the player
        if (
            item.x > player.x &&
            item.x < player.x + player.width &&
            item.y > player.y &&
            item.y < player.y + player.height
        ) {
            items.splice(index, 1);
            score++;
        }
        
        // remove if it's off the screen
        if (item.y > canvas.height) {
            items.splice(index, 1);
        }
    });
}

// create items
function createItem() {
    const badItem = {
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 10,
        dy: Math.random() * 2 + 1
    };
    items.push(badItem);
}

// draw bad items
function drawBadItems() {
    badItems.forEach((item, index) => {
        ctx.fillStyle = '#cd3a3a';
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

// update the bad items
function updateBadItems() {
    badItems.forEach((item, index) => {
        item.y += item.dy;
        // check if it collides with the player
        if (
            item.x > player.x &&
            item.x < player.x + player.width &&
            item.y > player.y &&
            item.y < player.y + player.height
        ) {
            badItems.splice(index, 1);
            score-=5;
        }
        
        // remove if it's off the screen
        if (item.y > canvas.height) {
            badItems.splice(index, 1);
        }
    });
}

// create bad items
function createBadItem() {
    const item = {
        x: Math.random() * (canvas.width - 20),
        y: -20,
        radius: 15,
        dy: Math.random() * 2 + 1
    };
    badItems.push(item);
}




// your main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer();
    updateItems();
    updateBadItems();
    
    drawPlayer();
    drawItems();
    drawBadItems();
    drawScore();
    requestAnimationFrame(gameLoop);
}

// add some controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') player.dx = -5;
    if (e.key === 'ArrowRight') player.dx = 5;
});

document.addEventListener('keyup', () => {
    player.dx = 0;
});

// create items periodically
setInterval(createItem, 800);
setInterval(createBadItem, 10000);

// start the game!
gameLoop();