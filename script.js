document.addEventListener("DOMContentLoaded", function () {

    const message = document.getElementById("message");
    const ground = document.getElementById("ground");
    const trunkRect = document.getElementById("trunkRect");
    const branchesRect = document.getElementById("branchesRect");
    const hearts = document.querySelectorAll("#heartsGroup path");
    let trunkHeight = 0;
    const trunkMax = 1000;
    let branchWidth = 0;
    const branchMax = 600;

    function growTrunk() {

        trunkHeight += 6;

        trunkRect.setAttribute(
            "y",
            1000 - trunkHeight
        );

        trunkRect.setAttribute(
            "height",
            trunkHeight
        );

        let progress =
            trunkHeight / trunkMax;

        let branchStart = 0.6;

        if (progress > branchStart) {

            let branchProgress =
                (progress - branchStart) /
                (1 - branchStart);

            branchWidth =
                branchMax * branchProgress;

            branchesRect.setAttribute(
                "x",
                300 - branchWidth / 2
            );

            branchesRect.setAttribute(
                "width",
                branchWidth
            );
        }

        animateHearts(progress);

        if (progress >= 1) {
            showText();
        }

        if (trunkHeight < trunkMax) {
            requestAnimationFrame(growTrunk);
        }
    }

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

    let heartsStarted = false;

    function animateHearts(treeProgress) {

        if (treeProgress < 0.7 || heartsStarted) return;

        heartsStarted = true;

        hearts.forEach((heart) => {

            const delay =
                Math.random() * 2;

            heart.style.animation =
                `heartAppear 0.8s ease forwards ${delay}s`;
        });
    }

    const style =
        document.createElement("style");

    style.textContent = `
        @keyframes heartAppear{
            from{
                opacity:0;
                transform:scale(0);
            }
            to{
                opacity:1;
                transform:scale(1);
            }
        }
    `;

    document.head.appendChild(style);

    function fallingHearts(){

        const el = document.createElement("div");
        el.className = "fall";
        el.innerHTML = "❤";

        el.style.left =
            Math.random() * window.innerWidth + "px";

        el.style.animationDuration =
            4 + Math.random() * 4 + "s";

        document.body.appendChild(el);

        setTimeout(() => el.remove(), 4000);
    }

    setInterval(fallingHearts, 500);

    let typingStarted = false;

    function typeWriter(element, html, speed = 35) {

        if (typingStarted) return;
        typingStarted = true;

        const text =
            html.replace(/<br\s*\/?>/gi, "\n");

        element.textContent = "";
        element.style.whiteSpace = "pre-line";

        let i = 0;

        function typing() {

            if (i < text.length) {

                element.textContent =
                    text.slice(0, i + 1);

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

    growTrunk();

});
