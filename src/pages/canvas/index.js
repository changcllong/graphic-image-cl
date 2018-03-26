import 'babel-polyfill';
import './index.scss';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "rgb(200,0,0)";
ctx.fillRect(10, 10, 55, 50);

ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
ctx.fillRect(30, 30, 55, 50);

ctx.strokeRect(50, 50, 55, 50);

ctx.beginPath();
ctx.moveTo(110, 50);
ctx.lineTo(110, 100);
ctx.lineTo(145, 75);
ctx.fill();

// ctx.setLineDash([7, 4]);

ctx.beginPath();
ctx.arc(200, 55, 50, 0, Math.PI * 2, true); // 绘制
ctx.moveTo(235, 55);
ctx.arc(200, 55, 35, 0, Math.PI, false);   // 口(顺时针)
ctx.moveTo(185, 45);
ctx.arc(180, 45, 5, 0, Math.PI * 2, true);  // 左眼
ctx.moveTo(225, 45);
ctx.arc(220, 45, 5, 0, Math.PI * 2, true);  // 右眼
ctx.moveTo(300, 45);
ctx.arcTo(350, 45, 370, 145, 100);
ctx.moveTo(400, 50);
ctx.quadraticCurveTo(450, 30, 550, 100);
ctx.moveTo(600, 100);
ctx.bezierCurveTo(650, 200, 640, 30, 700, 50);
ctx.stroke();

var radgrad = ctx.createRadialGradient(45, 245, 10, 52, 250, 30);
radgrad.addColorStop(0, '#A7D30C');
radgrad.addColorStop(0.9, '#019F62');
radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

var radgrad2 = ctx.createRadialGradient(105, 305, 20, 112, 320, 50);
radgrad2.addColorStop(0, '#FF5F98');
radgrad2.addColorStop(0.75, '#FF0188');
radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

ctx.fillStyle = radgrad2;
ctx.fillRect(0, 200, 150, 150);
ctx.fillStyle = radgrad;
ctx.fillRect(0, 200, 150, 150);

const img = new Image();
img.src = '../images/star2.png';
img.onload = function() {
    ctx.save();
    // 创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(200, 200, 150, 150);
    ctx.restore();
};

function drawText() {
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(127, 127, 127, 0.5)';

    ctx.font = '40px Times New Roman';

    ctx.fillStyle = 'red';
    ctx.fillText('HELLO CANVAS', 400, 240);
    ctx.restore();
}

drawText();

const img2 = new Image();
img2.src = '../images/test.jpg';
img2.onload = () => {
    ctx.drawImage(img2, 200, 200, 200, 200, 0, 400, 200, 200);
    ctx.drawImage(img2, 0, 700, 200, 200);
    const imgData = ctx.getImageData(0, 700, 200, 200);
    invert(imgData);
    gray(imgData);
};

function invert(imgData) {
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imgData, 300, 700);
}

function gray(imgData) {
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
        // x = 0.299r + 0.587g + 0.114b;
        const avg = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    ctx.putImageData(imgData, 600, 700);
}

function drawCircle() {
    ctx.save();
    ctx.translate(500, 500);
    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = 'rgb(' + (51 * i) + ', ' + (255 - 51 * i) + ', 255)';
        for (let j = 0; j < i * 6; j++) {
            ctx.rotate(Math.PI * 2 / (i * 6));
            ctx.beginPath();
            ctx.arc(0, i * 12.5, 5, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
    ctx.restore();
}

drawCircle();

/**
 * 动画
 */
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

const ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: 'blue',
    draw: function() {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx2.closePath();
        ctx2.fillStyle = this.color;
        ctx2.fill();
    }
};

let raf;

function draw() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x + ball.vx > canvas2.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
    }
    if (ball.y + ball.vy > canvas2.height || ball.y + ball.vy < 0) {
        ball.y = canvas2.height;
        ball.vy = -ball.vy;
    }
    ball.draw();
    ball.vy *= .99;
    ball.vy += .25;
    raf = window.requestAnimationFrame(draw);
}

canvas2.addEventListener('mouseover', function(e){
    raf = window.requestAnimationFrame(draw);
});
  
canvas2.addEventListener('mouseout', function(e){
    window.cancelAnimationFrame(raf);
});

ball.draw();
