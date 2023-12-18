const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let Ts = 0;
let Tc = 0;
let pi = 0;
let bestpi = 0;
let skipsteps = 1;
let step;
let throwNum;
const dartBoardHeight = 500;
const dartBoardWidth = 500;
const dartBoardCenterx = canvas.clientWidth/4;
const dartBoardCentery = canvas.clientHeight/2;
let insideCircle;

function preload(){
    throwNum = document.getElementById("dartNum").value;
    bestpi = 0;
    pi = 0;
    Ts = 0;
    Tc = 0;
    skipsteps = Math.ceil(throwNum/2000);
    if(throwNum>=10000000) skipsteps *= 10;
    ctx.fillStyle = 'rgb(175,175,175)';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.clientWidth/4 - dartBoardWidth/2,canvas.clientHeight/2-dartBoardHeight/2,dartBoardWidth,dartBoardHeight);
    ctx.drawImage(document.getElementById("dartBoard"),canvas.clientWidth/4 - dartBoardWidth/2,canvas.clientHeight/2-250);
    ctx.drawImage(document.getElementById("pi"),dartBoardCenterx + dartBoardWidth/2 + 30,dartBoardCentery - 35);
    ctx.drawImage(document.getElementById("pi"),dartBoardCenterx + dartBoardWidth/2 + 30,dartBoardWidth - 35);
}

function draw(x,y){
    if(insideCircle == true) ctx.fillStyle = 'green';
    else ctx.fillStyle = 'red';
    ctx.fillRect(dartBoardCenterx - dartBoardWidth/2*x,dartBoardCentery + dartBoardHeight/2*y,3,3);
}

function outputPi(pi,posy,recy1,recy2){
    ctx.fillStyle = 'rgb(175,175,175)';
    ctx.fillRect(dartBoardCenterx + dartBoardWidth/2 + 100,recy1,canvas.clientWidth,recy2);
    let spi = pi.toString();
    let sPI = Math.PI.toString();
    let i = 0;
    for(; i<spi.length; i++){
        if(sPI.length>=i && spi[i] != sPI[i]) break;
    }
    let firsts = spi.substring(0,i);
    let secs = spi.substring(i);
    ctx.fillStyle = 'green';
    ctx.font = "bold 60px Consolas";
    ctx.fillText(firsts,dartBoardCenterx + dartBoardWidth/2 + 175, posy);
    let strlength = ctx.measureText(firsts).width;
    ctx.fillStyle = 'red';
    ctx.fillText(secs,dartBoardCenterx + dartBoardWidth/2 + 175 + strlength, posy);
}

function outputThrow(throws,x,y){
    ctx.fillStyle = 'rgb(175,175,175)';
    ctx.fillRect(x-20,y-30,canvas.clientWidth,40);
    ctx.fillStyle = 'black';
    ctx.font = "bold 32px Consolas";
    ctx.fillText(throws.toString(),x,y);
}

function throwDart(throws){
    Ts++;
    let x = Math.random() * 2 - 1;
    let y = Math.random() * 2 - 1;    
    if( x*x + y*y <= 1) {
        Tc++;
        insideCircle = true;
    } else insideCircle = false;
    draw(x,y);
    pi = 4 * (Tc/Ts);
    if(Math.abs(Math.PI - pi) <= Math.abs(Math.PI - bestpi)) {
        bestpi = pi;
        outputPi(bestpi,dartBoardHeight + 15,dartBoardCentery + 50,canvas.clientHeight);
        outputThrow(throws,1050,450);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function reset(){
    preload();
    main();
}

function clears(){
    preload();
    step = throwNum + 1;
    outputPi(0,dartBoardCentery + 15,dartBoardCentery - dartBoardHeight/2,dartBoardCentery - 35);
    outputPi(0,dartBoardHeight + 15,dartBoardCentery + 50,canvas.clientHeight);
    document.getElementById("dartNum").value = 0;
}

async function main(){
    preload();
    outputPi(pi,dartBoardCentery + 15,dartBoardCentery - dartBoardHeight/2,dartBoardCentery - 35);
    outputPi(bestpi,dartBoardHeight + 15,dartBoardCentery + 50,canvas.clientHeight);
    for(step = 1; step<=throwNum; step++) {
        throwDart(step);
        if(step%(skipsteps*8) == 0 || step<8) outputPi(pi,dartBoardCentery + 15,dartBoardCentery - dartBoardHeight/2,dartBoardCentery - 35);
        if(step%skipsteps == 0) {
            await sleep(1);
        }
    }
}

document.getElementById("dartNum").value = 0;
main();