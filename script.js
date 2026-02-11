@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap');

body {
    margin: 0;
    font-family: "Caveat", cursive;
    min-height: 100vh;
    background: linear-gradient(180deg, #fbc2eb 0%, #fad0c4 100%);
    position: relative;
    overflow: hidden;
}


#ground {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 0;
    background: #6b3e26;
}


svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}


.branch {
    stroke: #5b2c2c;
    stroke-linecap: round;
    fill: none;
}


.heart {
    position: absolute;
    transform: rotate(45deg);
    pointer-events: none;
    animation: pulse 2s infinite ease-in-out;
}

.heart::before,
.heart::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--heartColor);
    border-radius: 50%;
}

.heart::before { top: -50%; left: 0; }
.heart::after { left: -50%; top: 0; }

@keyframes pulse {
    0%,100% { transform: rotate(45deg) scale(1); }
    50% { transform: rotate(45deg) scale(1.2); }
}


.fall {
    position: fixed;
    top: -20px;
    font-size: 20px;
    color: #7a1e3a;
    animation: fall linear forwards;
    pointer-events: none;
}

@keyframes fall {
    to {
        transform: translateY(100vh);
        opacity: 0;
    }
}


#message {
    position: absolute;
    top: 10%;
    width: 100%;
    text-align: center;
    font-size: clamp(35px,4vw,32px);
    color: #7a1e3a;
    opacity: 0;
    transition: opacity 2s ease;
}
