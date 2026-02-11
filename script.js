const svg = document.getElementById("tree");
const message = document.getElementById("message");

const startX = window.innerWidth / 2;
const startY = window.innerHeight;
const trunkLength = 120;
const valentineColors = [
    "#ff1744",  
    "#ff4d6d",  
    "#ff6f91",  
    "#ff8fab",  
    "#d63384",  
    "#c9184a"   
];

let branchCount = 0;

function drawBranch(x1, y1, length, angle, depth, delay) {

    if (depth === 0) {
        if (Math.random() > 0.4) {
            createHeart(x1, y1, 14 + Math.random() * 6);
        }
        return;
    }

    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 - length * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x1);
    line.setAttribute("y2", y1);
    line.setAttribute("class", "branch");
    line.setAttribute("stroke-width", depth * 2);

    svg.appendChild(line);

    setTimeout(() => {
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
    }, delay);

    
    if (depth < 6 && depth > 1) {

        const heartsOnBranch = 2 + Math.floor(Math.random() * 2);

        for (let i = 1; i < heartsOnBranch; i++) {

            const t = i / heartsOnBranch;

            const hx = x1 + (x2 - x1) * t + (Math.random() * 6 - 3);
            const hy = y1 + (y2 - y1) * t + (Math.random() * 6 - 3);

            const size = 6 + Math.random() * 6;

            setTimeout(() => {
                createHeart(hx, hy, size);
            }, delay + 200);
        }
    }

    setTimeout(() => {
        drawBranch(x2, y2, length * 0.75, angle - 0.4 + Math.random() * 0.2, depth - 1, 100);
        drawBranch(x2, y2, length * 0.75, angle + 0.4 - Math.random() * 0.2, depth - 1, 100);
    }, delay + 300);

    if (depth === 1) {
        setTimeout(() => {
            message.style.opacity = 1;
        }, 2500);
    }
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



function fallingHearts() {
    const el = document.createElement("div");
    el.className = "fall";
    el.innerHTML = "❤";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.animationDuration = 4 + Math.random()*4 + "s";
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 8000);
}

setInterval(fallingHearts, 500);


drawBranch(startX, startY, trunkLength, Math.PI / 2, 8, 0);

