const svg = document.getElementById("tree");
const message = document.getElementById("message");
const ground = document.getElementById("ground");

const valentineColors=[
"#ff1744","#ff4d6d","#ff6f91",
"#ff8fab","#d63384","#c9184a"
];

const startX = window.innerWidth/2;
const startY = window.innerHeight*0.75;
const trunkLength = window.innerWidth<600?80:120;


function animateGround(){
    let width=0;
    const maxWidth=300;
    function grow(){
        if(width<maxWidth){
            width+=4;
            ground.style.width=width+"px";
            requestAnimationFrame(grow);
        } else {
            drawBranch(startX,startY,trunkLength,Math.PI/2,8);
        }
    }
    grow();
}
animateGround();


function drawBranch(x1,y1,length,angle,depth){
    if(depth===0){
        if(Math.random()>0.3){
            createHeart(x1,y1,12+Math.random()*6);
        }
        return;
    }

    const x2=x1+length*Math.cos(angle);
    const y2=y1-length*Math.sin(angle);

    const line=document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1",x1);
    line.setAttribute("y1",y1);
    line.setAttribute("x2",x1);
    line.setAttribute("y2",y1);
    line.setAttribute("class","branch");
    line.setAttribute("stroke-width",depth*1.5);

    svg.appendChild(line);

    let progress=0;
    function grow(){
        progress+=0.03;
        if(progress<=1){
            line.setAttribute("x2",x1+(x2-x1)*progress);
            line.setAttribute("y2",y1+(y2-y1)*progress);
            requestAnimationFrame(grow);
        }else{
            drawBranch(x2,y2,length*0.75,angle-0.4+Math.random()*0.2,depth-1);
            drawBranch(x2,y2,length*0.75,angle+0.4-Math.random()*0.2,depth-1);
            if(depth===1){
                setTimeout(showText,1000);
            }
        }
    }
    grow();
}

function createHeart(x, y, size = 16) {
    const heart = document.createElement("div");
    heart.className = "heart";

    const color = valentineColors[Math.floor(Math.random() * valentineColors.length)];

    heart.style.left = x + "px";
    heart.style.top = y + "px";
    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.background = color;
    heart.style.boxShadow = `0 0 15px ${color}`;

    heart.style.setProperty("--heartColor", color);

    document.body.appendChild(heart);
}


function fallingHearts(){
    const el=document.createElement("div");
    el.className="fall";
    el.innerHTML="❤";
    el.style.left=Math.random()*window.innerWidth+"px";
    el.style.animationDuration=4+Math.random()*4+"s";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),8000);
}
setInterval(fallingHearts,500);


let typingStarted = false;

function typeWriter(element, html, speed = 35) {

    if (typingStarted) return; 
    typingStarted = true;

    const text = html.replace(/<br\s*\/?>/gi, "\n");
    element.textContent = "";
    element.style.whiteSpace = "pre-line";

    let i = 0;

    function typing() {
        if (i < text.length) {
            element.textContent = text.slice(0, i + 1);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}



function showText(){
    message.style.opacity = 1;

    const text = `I wish that a little spark always burns in your heart ❤️.<br>
May love inspire you, lift you up, and give you the brightest experience`;

    typeWriter(message, text, 35);
}
