var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius =canvas.height /2;
ctx.translate(radius, radius);//making the 0,0 to cetre
radius = radius * 0.90;
setInterval(drawClock,1000);//draw the clock for every 1000ms

function drawClock(){
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}

function drawFace(ctx,radius){
    var grad;
    ctx.beginPath();
    ctx.arc(0,0,radius, 0, 2 * Math.PI) //instead math.pi we can give 360
    ctx.fillStyle="white";
    ctx.fill();

    grad=ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0,'grey');
    grad.addColorStop(0.5,'grey');
    grad.addColorStop(1,'black');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0,radius * 0.1, 0, 2 *Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();

}

function drawNumbers(ctx, radius){

    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++) {
        ang=num * Math.PI / 6; // 360/12 ==>1*180/6=30 deg, 2*180/6=60
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
function drawTime(ctx, radius){
var now = new Date();
var hour = now.getHours();
var minute = now.getMinutes();
var second = now.getSeconds();

hour = hour%12;
hour = (hour * Math.PI / 6) + //hour hand get affected in terms are min and second --- 1 hr 30 deg
(minute * Math.PI /(6*60)) + //1 min /6 deg * 60
(second * Math.PI/(360*60))  // 1 sec 6*60*60 becoz 1 sec =60mins

drawHand(ctx,hour,radius*0.5,radius*0.07); //height and thickness

minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));// influence by min and sec  --every min 6 deg 
drawHand(ctx,minute,radius*0.8,radius*0.07);

second=(second*Math.PI/30); //6 deg for seconds
drawHand(ctx,second,radius*0.9,radius*0.02);
}

function drawHand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth=width;
    ctx.lineCap="round";
    ctx.moveTo(0,0);
    ctx.rotate(pos); //ang rotated
    ctx.lineTo(0,-length); 
    ctx.stroke();
    ctx.rotate(-pos); //rotate back to normal 
} 