const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

const COLORS = [
    "#00FFFF",
    "#54FF9F",
    "#C0FF3E",
    "#FFFFE0",
    "#FFC1C1",
    "#EE9A49",
    "#EE00EE",
    "#008080",
    "#C60000"
];

const MOUSE = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function Partcile(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.ttl = 200;

    this.draw = () => {
        CTX.beginPath();
        CTX.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        CTX.fillStyle = this.color;
        CTX.fill();
        CTX.closePath();
    };

    this.update = () => {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl--;
    };
}
let particile;
function init() {
    particile = [];
    for (var index = 0; index < 20; index++) {
        const RADIANS = Math.PI * 2 / 20;
        var velocity = {
            x: Math.cos(RADIANS * index),
            y: Math.sin(RADIANS * index)
        };
        var x = CANVAS.width / 2;
        var y = CANVAS.height / 2;
        particile.push(
            new Partcile(x,
                y,
                5,
                randomColor(),
                velocity
            )
        );
    }
}

init();

function animate() {
    requestAnimationFrame(animate);
    CTX.fillStyle = "rgba(0,0,0,0.05)";
    CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);
    particile.forEach((item, index) => {
        if (item.ttl == 0) {
            particile.splice(index, 1);
        }
        item.update();
    })
}

function generate() {
    setTimeout(generate, 500);
    for (var index = 0; index < 20; index++) {
        const RADIANS = Math.PI * 2 / 20;
        var velocity = {
            x: Math.cos(RADIANS * index),
            y: Math.sin(RADIANS * index)
        };
        var x = MOUSE.x;
        var y = MOUSE.y;
        particile.push(
            new Partcile(x,
                y,
                5,
                randomColor(),
                velocity
            )
        );
    }
}

animate();
generate();
window.addEventListener("mouseup", (e) => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
});


