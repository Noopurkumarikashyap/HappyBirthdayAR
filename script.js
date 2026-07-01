const PASSWORD = "02071997";

let input = "";

const boxes = document.querySelectorAll(".box");
const keypad = document.querySelector(".keypad");
const message = document.getElementById("message");
const displayEl = document.querySelector(".display");

function updateBoxes() {
    boxes.forEach((box, index) => {
        box.textContent = index < input.length ? input[index] : "";
    });
}

keypad.addEventListener("click", (e) => {

    if (!e.target.classList.contains("key")) return;

    const value = e.target.dataset.value;

    if (value === "delete") {
        input = input.slice(0, -1);
        updateBoxes();
        return;
    }

    if (value === "*" || value === "#") return;

    if (input.length < 8) {
        input += value;
        updateBoxes();
    }

});

document.getElementById("deleteBtn").onclick = () => {
    input = input.slice(0, -1);
    updateBoxes();
};

document.getElementById("nextBtn").onclick = () => {

    if (input === PASSWORD) {

        displayEl.classList.add("correct");
        message.style.color = "#3b83b9";
        message.innerText = "Yayy! Unlocking your surprise... 🎉";

        launchPopperBlast();

        setTimeout(() => {
            window.location.href = "birthday.html";
        }, 1600);

    } else {

        message.innerText = "Wrong Passcode ❤️";
        input = "";
        updateBoxes();

    }

};

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

music.volume = 0.4;

music.play().then(() => {

    musicBtn.innerHTML = "🔊";
    musicBtn.classList.add("playing");

}).catch(() => {

    musicBtn.innerHTML = "🔇";

});

musicBtn.addEventListener("click", () => {

    if(music.paused){

        music.play();

        musicBtn.innerHTML = "🔊";
        musicBtn.title = "Music On";
        musicBtn.classList.add("playing");

    }else{

        music.pause();

        musicBtn.innerHTML = "🔇";
        musicBtn.title = "Music Off";
        musicBtn.classList.remove("playing");

    }

});

/* ===========================
   POPPER / CONFETTI BLAST
   Pure canvas, no external libs
=========================== */

function launchPopperBlast(){

    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#3b83b9", "#e6668a", "#ffd166", "#ff9fb2", "#8ee3c8", "#ffffff"];

    const particles = [];

    // Two poppers, bottom-left and bottom-right, blasting upward/inward
    const origins = [
        { x: canvas.width * 0.08, y: canvas.height * 0.95, dir: 1 },
        { x: canvas.width * 0.92, y: canvas.height * 0.95, dir: -1 }
    ];

    origins.forEach(origin => {
        for (let i = 0; i < 90; i++){

            const angle = (-Math.PI / 2) + (Math.random() - 0.5) * (Math.PI * 0.9) * origin.dir;
            const speed = 6 + Math.random() * 10;

            particles.push({
                x: origin.x,
                y: origin.y,
                vx: Math.cos(angle) * speed * origin.dir,
                vy: Math.sin(angle) * speed,
                size: 4 + Math.random() * 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 12,
                shape: Math.random() > 0.5 ? "rect" : "circle",
                gravity: 0.18 + Math.random() * 0.08,
                drag: 0.985,
                life: 0
            });
        }
    });

    let frame = 0;
    const maxFrames = 130;

    function animate(){

        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {

            p.vx *= p.drag;
            p.vy = p.vy * p.drag + p.gravity;

            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;
            p.life++;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = Math.max(0, 1 - frame / maxFrames);
            ctx.fillStyle = p.color;

            if (p.shape === "rect"){
                ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });

        if (frame < maxFrames){
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}
