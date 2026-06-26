const PASSWORD = "18121996";

let input = "";

const boxes = document.querySelectorAll(".box");
const keypad = document.querySelector(".keypad");
const message = document.getElementById("message");

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

        window.location.href = "birthday.html";

    } else {

        message.innerText = "Wrong Passcode ❤️";
        input = "";
        updateBoxes();

    }

};
