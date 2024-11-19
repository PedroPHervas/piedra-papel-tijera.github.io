let humanScore = 0;
let comptScore = 0;
let roundCount = 0;

const humanScoreEl = document.getElementById("humanScore");
const computerScoreEl = document.getElementById("computerScore");
const roundCountEl = document.getElementById("roundCount");
const messageEl = document.getElementById("message");
const optionsContainer = document.querySelector(".options");
const replayContainer = document.createElement("div");

function storageComputerChoice() {
    const choices = ["Piedra", "Papel", "Tijera"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(humanChoice) {
    if (roundCount >= 5) return;

    const computerChoice = storageComputerChoice();
    roundCount++;

    let result = "";

    if (humanChoice === computerChoice) {
        result = "Empate";
    } else if (
        (humanChoice === "Piedra" && computerChoice === "Tijera") ||
        (humanChoice === "Papel" && computerChoice === "Piedra") ||
        (humanChoice === "Tijera" && computerChoice === "Papel")
    ) {
        humanScore++;
        result = "¡Has ganado esta ronda!";
    } else {
        comptScore++;
        result = "¡La computadora gana esta ronda!";
    }

    humanScoreEl.textContent = humanScore;
    computerScoreEl.textContent = comptScore;
    roundCountEl.textContent = roundCount;
    messageEl.textContent = `Tú elegiste ${humanChoice}, la computadora eligió ${computerChoice}. ${result}`;

    if (roundCount >= 5) {
        endGame();
    }
}

function endGame() {
    optionsContainer.style.display = "none"; 

    let finalMessage = "";
    if (humanScore > comptScore) {
        finalMessage = `Titan, diplodocus, crack, cosechadora, tovarich, ¡has ganado a las máquinas!`;
    } else if (comptScore > humanScore) {
        finalMessage = `Gana la máquina. ¿Cómo es posible que te haya ganado una máquina? ¿De parte de quién vas a estar cuando se rebelen? No nos podemos fiar de ti.`;
    } else {
        finalMessage = `¿Un empate, en serio? no puedes vivir así, decidete, ve a muerte, o fracasa, pero no te quedes en medio, ve a fondo.`;
    }

    messageEl.textContent = `${finalMessage} ¿Quieres jugar otra vez?`;

    replayContainer.classList.add("replay-container");
    replayContainer.innerHTML = `
        <button id="replay-yes" class="replay-btn">Sí</button>
        <button id="replay-no" class="replay-btn">No</button>
    `;
    document.body.appendChild(replayContainer);

    document.getElementById("replay-yes").addEventListener("click", resetGame);
    document.getElementById("replay-no").addEventListener("click", endSession);
}

function resetGame() {
    humanScore = 0;
    comptScore = 0;
    roundCount = 0;

    humanScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    roundCountEl.textContent = 0;

    messageEl.textContent = "Haz tu elección para comenzar el juego.";
    optionsContainer.style.display = "flex";
    replayContainer.remove(); 
}

function endSession() {
    replayContainer.remove(); 
    messageEl.textContent = "Gracias por jugar, ¡¡¡MUERTE AL CAPITAL!!!.";
}

document.querySelectorAll(".option-btn").forEach(button => {
    button.addEventListener("click", () => {
        const choice = button.id.charAt(0).toUpperCase() + button.id.slice(1);
        playRound(choice);
    });
});






