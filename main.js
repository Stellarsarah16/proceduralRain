import * as lib from '/src/lib.js';

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let msg1 = '';
    let msg2 = '';
    let lastTime = 0;
    let rand = Math.random();
    const pen = {
        x: 0,
        y: 0,
    }
    msg1 = `(${canvas.width}, ${canvas.height})`;
    msg2 = `${rand}, (${pen.x}, ${pen.y})`;
    let particlesArray = [];
    let numberOfParticles = 100;
    
    const titleElement = document.getElementById('title1');
    let titleMeasurements = titleElement.getBoundingClientRect();
    let title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 100
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 7 + 1;
            this.weight = Math.random() * this.size + 1;
            this.directionX = 1
        }
        update() {
            if (this.y > canvas.height) {
                this.y = 70;
                this.weight = Math.random() * 1 + 1;
                this.x = Math.random() * canvas.width * 1.3 - 100;
            }
            this.weight += 0.01;
            this.y += this.weight;
            this.x += this.directionX * Math.random();
            if (lib.checkCollision(this, title)) {
                this.y -= 3 ;
                this.weight *= -0.3;
            }
        }
        draw() {
            ctx.fillStyle = 'blue';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
    
        }
    }

function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    msg1 = lib.updateStatusText(canvas.width, title.width, '');
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    ctx.fillRect(0, 70, canvas.width, canvas.height);
   //ctx.clearRect(0, 0, canvas.width, canvas.height);
    lib.drawStatusText(ctx, msg1, msg2);
    lib.drawShape(ctx, pen);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    lib.writeTitleText(ctx, title);
    
    requestAnimationFrame(animate);
}

function init() {
    particlesArray = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    lib.updateTitle(title, titleElement, titleMeasurements);
    lib.writeTitleText(ctx, title);
    for (let i = 0; i <numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = 70 + (Math.random()*200);
        particlesArray.push(new Particle(x, y));
    }
    console.log(title, particlesArray, canvas.width);
}

function touched(event) {
    pen.x = event.touches[0].clientX;
    pen.y = event.touches[0].clientY;
    
    msg2 = lib.updateStatusText(event, pen.x, pen.y);
    rand = Math.random();
 }

window.onload = function(e) {
    canvas.addEventListener('touchstart', function(event) {
        touched(event);
    });
    canvas.addEventListener('resize', function(event) {
        init();
        alert(event);
    });

    //  canvas.addEventListener('touchend', alert('2'));
    //  canvas.addEventListener('touchcancel', alert('3'));
    //  canvas.addEventListener('touchmove', alert('4'));
    init();
    animate();
}