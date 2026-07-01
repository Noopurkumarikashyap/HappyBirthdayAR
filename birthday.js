const giftBoxes = document.querySelectorAll(".gift-box");
const overlay = document.getElementById("modalOverlay");
const modalCard = document.getElementById("modalCard");
const modalClose = document.getElementById("modalClose");
const giftContents = document.querySelectorAll(".gift-content");

giftBoxes.forEach(box => {

    box.addEventListener("click", () => {

        // Prevent double-triggering mid-animation
        if (box.classList.contains("shake")) return;

        box.classList.add("shake");

        box.addEventListener("animationend", function handler(){
            box.classList.remove("shake");
            box.classList.add("opened");
            box.removeEventListener("animationend", handler);

            openGift(box.dataset.gift);
        });

    });

});

function openGift(giftNumber){

    giftContents.forEach(c => c.classList.remove("active"));

    const target = document.getElementById("content-" + giftNumber);
    if (target) target.classList.add("active");

    overlay.classList.add("active");
}

function closeModal(){
    overlay.classList.remove("active");

    // Pause the video if it's playing when the modal closes
    const video = document.getElementById("giftVideo");
    if (video && !video.paused){
        video.pause();
        const playBtn = document.getElementById("videoPlayBtn");
        if (playBtn) playBtn.classList.remove("hidden");
    }
}

modalClose.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

/* ===========================
   GIFT 3 : VIDEO PLAY / PAUSE
=========================== */

const giftVideo = document.getElementById("giftVideo");
const videoPlayBtn = document.getElementById("videoPlayBtn");

if (giftVideo && videoPlayBtn){

    videoPlayBtn.addEventListener("click", () => {
        giftVideo.play();
        videoPlayBtn.classList.add("hidden");
    });

    giftVideo.addEventListener("click", () => {
        if (giftVideo.paused){
            giftVideo.play();
            videoPlayBtn.classList.add("hidden");
        } else {
            giftVideo.pause();
            videoPlayBtn.classList.remove("hidden");
        }
    });

    giftVideo.addEventListener("pause", () => {
        videoPlayBtn.classList.remove("hidden");
    });

    giftVideo.addEventListener("ended", () => {
        videoPlayBtn.classList.remove("hidden");
    });
}

/* ===========================
   MUSIC BUTTON (page 2)
=========================== */

const music2 = document.getElementById("bgMusic2");
const musicBtn2 = document.getElementById("musicBtn2");

music2.volume = 0.4;

music2.play().then(() => {
    musicBtn2.innerHTML = "🔊";
}).catch(() => {
    musicBtn2.innerHTML = "🔇";
});

musicBtn2.addEventListener("click", () => {
    if (music2.paused){
        music2.play();
        musicBtn2.innerHTML = "🔊";
        musicBtn2.title = "Music On";
    } else {
        music2.pause();
        musicBtn2.innerHTML = "🔇";
        musicBtn2.title = "Music Off";
    }
});
