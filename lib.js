export function updateStatusText(var1, var2, var3) {
        var info = `${var1}, ${var2}, ${var3}`;  
        return info;
    }
export function drawStatusText(ctx, msg, msg2) {
    ctx.clearRect(0, 0, window.innerWidth, 70);
    let x = window.innerWidth - 10;
    
    ctx.font = '20px Helvetica';
    ctx.fillStyle = 'blue';
    ctx.fillText(msg, 10, 30);
    ctx.fillText(msg2, 10, 60);
    
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 70);
    ctx.lineTo(x, 70);
    ctx.stroke();
}
export function checkCollision(particle, title) {
    if (
        particle.x < title.x + title.width &&       //right
        particle.x + particle.size > title.x &&     //left
        particle.y < title.y + title.height &&      //bottom
        particle.y + particle.size > title.y        //top
    ) return true;
    else return false;
}
export function drawShape(ctx, pen) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.arc(pen.x, pen.y, 10, 0, Math.PI*2);
    //ctx.fill();
    ctx.stroke();
}
export function writeTitleText(ctx, title) {
   let f = title.width / 10;
    ctx.font = `${f}pt Helvetica`;
    ctx.fillStyle = 'black';
    ctx.fillText('Stellar Creations', title.x+5, title.y + 60);
    ctx.fillRect(title.x, title.y, title.width, 5);
}
export function updateTitle(title, titleElement, titleMeasurements) {
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
        y: titleMeasurements.top,
        width: titleMeasurements.width,
        height: 100
    }   
}