const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function main(){
    const dartNum = 10000000;
    const Ts = dartNum;
    let Tc = 0;
    for(let i = 0; i< dartNum; i++){
        let x = Math.random() * (1 + 1) - 1;
        let y = Math.random() * (1 + 1) - 1;
        if( x*x + y*y <= 1) Tc++;
    }
    let pi = 4 * (Tc/Ts);
    console.log(pi);
}

main();